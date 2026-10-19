import type { VercelRequest, VercelResponse } from '@vercel/node'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
})

// Ensure CVs and CV Versions tables exist if not already created
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cvs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id VARCHAR(255) NOT NULL,
      template_id VARCHAR(100) DEFAULT 'professional-ats',
      title VARCHAR(255) NOT NULL DEFAULT 'Untitled CV',
      content JSONB NOT NULL DEFAULT '{}'::jsonb,
      status VARCHAR(50) DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cv_versions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
      content JSONB NOT NULL,
      version_number INT NOT NULL,
      change_summary TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
  `)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method
  const action = (req.query.action as string) || ''
  const cvId = (req.query.id as string) || (req.body?.id as string)

  try {
    await ensureTables()

    // 1. GET /api/cvs?userId=xxx or /api/cvs?id=xxx
    if (method === 'GET') {
      if (cvId) {
        const result = await pool.query(`SELECT * FROM cvs WHERE id = $1`, [cvId])
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'CV not found' })
        }
        return res.status(200).json({ success: true, data: result.rows[0] })
      }

      const userId = (req.query.userId as string) || 'default-user'
      const result = await pool.query(
        `SELECT id, title, template_id, status, created_at, updated_at, content 
         FROM cvs 
         WHERE user_id = $1 
         ORDER BY updated_at DESC`,
        [userId]
      )
      return res.status(200).json({ success: true, data: result.rows })
    }

    // 2. POST /api/cvs - Create new CV
    if (method === 'POST' && (!action || action === 'create')) {
      const { userId = 'default-user', title = 'Untitled CV', templateId = 'professional-ats', content = {} } = req.body || {}

      const result = await pool.query(
        `INSERT INTO cvs (user_id, title, template_id, content, status)
         VALUES ($1, $2, $3, $4, 'draft')
         RETURNING *`,
        [userId, title, templateId, JSON.stringify(content)]
      )

      return res.status(201).json({ success: true, data: result.rows[0] })
    }

    // 3. PUT /api/cvs - Autosave or Update CV
    if (method === 'PUT' || (method === 'POST' && action === 'save')) {
      const { id, title, templateId, content, status } = req.body || {}

      if (!id) {
        return res.status(400).json({ error: 'CV ID is required for updating' })
      }

      const result = await pool.query(
        `UPDATE cvs
         SET title = COALESCE($1, title),
             template_id = COALESCE($2, template_id),
             content = COALESCE($3, content),
             status = COALESCE($4, status),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $5
         RETURNING *`,
        [title, templateId, content ? JSON.stringify(content) : null, status, id]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'CV not found' })
      }

      return res.status(200).json({ success: true, data: result.rows[0] })
    }

    // 4. POST /api/cvs?action=duplicate
    if (method === 'POST' && action === 'duplicate') {
      const { id } = req.body || {}
      if (!id) {
        return res.status(400).json({ error: 'CV ID is required to duplicate' })
      }

      const sourceRes = await pool.query(`SELECT * FROM cvs WHERE id = $1`, [id])
      if (sourceRes.rows.length === 0) {
        return res.status(404).json({ error: 'CV not found' })
      }

      const original = sourceRes.rows[0]
      const duplicateRes = await pool.query(
        `INSERT INTO cvs (user_id, title, template_id, content, status)
         VALUES ($1, $2, $3, $4, 'draft')
         RETURNING *`,
        [original.user_id, `${original.title} (Copy)`, original.template_id, original.content]
      )

      return res.status(201).json({ success: true, data: duplicateRes.rows[0] })
    }

    // 5. DELETE /api/cvs?id=xxx
    if (method === 'DELETE') {
      const targetId = cvId || (req.query.id as string)
      if (!targetId) {
        return res.status(400).json({ error: 'CV ID is required to delete' })
      }

      await pool.query(`DELETE FROM cvs WHERE id = $1`, [targetId])
      return res.status(200).json({ success: true, message: 'CV deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    console.error('CV API Handler Error:', error)
    return res.status(500).json({ error: 'Failed to process CV request', detail: error.message })
  }
}
