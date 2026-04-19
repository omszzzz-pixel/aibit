-- AI-BIT Supabase Schema
-- Supabase Dashboard > SQL Editor 에서 실행하세요

-- 1. 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT      NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  nickname    TEXT      NOT NULL,
  phone       TEXT      DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. AscendEX API 키 (암호화 저장)
CREATE TABLE IF NOT EXISTS api_keys (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT    NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  api_key_enc     TEXT      NOT NULL,
  api_secret_enc  TEXT      NOT NULL,
  account_group   TEXT      DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. 인덱스
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 4. RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- 5. service_role만 접근 가능 (서버에서만 호출)
CREATE POLICY "Service role full access on users"
  ON users FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on api_keys"
  ON api_keys FOR ALL
  USING (true)
  WITH CHECK (true);
