require('dotenv').config();
const { Client } = require('pg');

async function seed() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  const res = await client.query('SELECT count(*) FROM templates');
  console.log('Current template count:', res.rows[0].count);
  
  if (parseInt(res.rows[0].count) === 0) {
    await client.query(`
      INSERT INTO templates (slug, name, description, is_premium, sort_order) 
      VALUES 
        ('professional-ats', 'Professional ATS', 'Clean single-column layout optimized for ATS parsers.', false, 1),
        ('modern-executive', 'Modern Executive', 'Two-column layout with sidebar and prominent headers.', true, 2),
        ('minimalist-tech', 'Minimalist Tech', 'Sleek dark accent minimalist template for developers.', false, 3)
    `);
    console.log('Seeded initial templates!');
  }

  const plansRes = await client.query('SELECT count(*) FROM plans');
  if (parseInt(plansRes.rows[0].count) === 0) {
    await client.query(`
      INSERT INTO plans (slug, name, price, currency, billing_interval, ai_allowance_monthly, features)
      VALUES 
        ('free', 'Free Tier', 0.00, 'USD', 'monthly', 5, '["Basic Templates", "5 AI Optimizations", "PDF Export"]'::jsonb),
        ('premium-monthly', 'Premium Monthly', 9.99, 'USD', 'monthly', 100, '["All Templates", "Unlimited AI", "DOCX Export", "ATS Score Checker", "Job Matcher"]'::jsonb),
        ('premium-yearly', 'Premium Yearly', 79.99, 'USD', 'yearly', 1200, '["All Templates", "Unlimited AI", "DOCX Export", "Priority Support"]'::jsonb)
    `);
    console.log('Seeded initial plans!');
  }

  await client.end();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
