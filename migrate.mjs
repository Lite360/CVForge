import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const schema = `
CREATE TABLE IF NOT EXISTS "user" (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL,
  image text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  theme text
);

CREATE TABLE IF NOT EXISTS "session" (
  id text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"(id),
  "expiresAt" timestamp NOT NULL,
  token text NOT NULL UNIQUE,
  "ipAddress" text,
  "userAgent" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "account" (
  id text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"(id),
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "accessToken" text,
  "refreshToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  scope text,
  "idToken" text,
  password text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification" (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "idToken" text;
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "password" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "theme" text;
`;

async function run() {
  try {
    await pool.query(schema);
    console.log('Database migrated successfully');
  } catch (error) {
    console.error('Error migrating database:', error);
  } finally {
    await pool.end();
  }
}

run();
