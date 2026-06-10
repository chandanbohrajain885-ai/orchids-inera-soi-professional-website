-- ============================================================
-- INERA SOFTWARE PRIVATE LIMITED — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. Site configuration (all admin settings in one row) ──
CREATE TABLE IF NOT EXISTS site_config (
  id          INTEGER PRIMARY KEY DEFAULT 1,          -- always row 1
  data        JSONB    NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed one empty row so upserts always work
INSERT INTO site_config (id, data)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Trigger: auto-update updated_at on every change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_config_updated_at ON site_config;
CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ── 2. Gallery items ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_items (
  id           TEXT        PRIMARY KEY,               -- uuid generated on client
  title        TEXT        NOT NULL DEFAULT '',
  category     TEXT        NOT NULL DEFAULT 'Company Activities',
  storage_path TEXT        NOT NULL DEFAULT '',       -- Supabase Storage path
  public_url   TEXT        NOT NULL DEFAULT '',       -- public CDN URL
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ── 3. Gallery categories ─────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL UNIQUE
);

INSERT INTO gallery_categories (name) VALUES
  ('Company Activities'),
  ('Technology Events'),
  ('Workshops'),
  ('Team Collaborations'),
  ('Office Environment')
ON CONFLICT (name) DO NOTHING;


-- ── Row-Level Security (RLS) ───────────────────────────────
-- Enable RLS on all tables
ALTER TABLE site_config      ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;

-- PUBLIC: anyone can read
CREATE POLICY "public_read_site_config"
  ON site_config FOR SELECT USING (true);

CREATE POLICY "public_read_gallery_items"
  ON gallery_items FOR SELECT USING (true);

CREATE POLICY "public_read_gallery_categories"
  ON gallery_categories FOR SELECT USING (true);

-- ANON: allow all writes (admin panel uses anon key — no auth required)
-- If you later add Supabase Auth, replace these with auth.uid() checks.
CREATE POLICY "anon_write_site_config"
  ON site_config FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "anon_write_gallery_items"
  ON gallery_items FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "anon_write_gallery_categories"
  ON gallery_categories FOR ALL USING (true) WITH CHECK (true);


-- ── 4. Certificates table (for future dedicated storage) ──
-- Note: Certificates are currently stored inside site_config JSONB.
-- This table is ready for when you want to migrate to dedicated storage.
CREATE TABLE IF NOT EXISTS certificates (
  id                 TEXT PRIMARY KEY,
  candidate_name     TEXT NOT NULL DEFAULT '',
  certificate_number TEXT NOT NULL DEFAULT '',
  specialization     TEXT NOT NULL DEFAULT '',
  date_of_issue      TEXT NOT NULL DEFAULT '',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (certificate_number)
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_certificates"
  ON certificates FOR SELECT USING (true);

CREATE POLICY "anon_write_certificates"
  ON certificates FOR ALL USING (true) WITH CHECK (true);


-- ── 5. Supabase Storage bucket for gallery images ─────────
-- Run this AFTER creating the schema:
--   Dashboard → Storage → New bucket
--   Name: gallery-images
--   Public: YES  (so images are accessible without auth)
--
-- Or run via API / dashboard SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload/read gallery images
CREATE POLICY "public_gallery_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "public_gallery_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "public_gallery_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery-images');
