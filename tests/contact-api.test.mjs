import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../pages/api/validate_recaptcha.js', import.meta.url), 'utf8');
const { default: handler } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const valid = { token: 'test-token', data: { name: 'Test Sender', email: 'test@example.com', message: 'A test message with no external delivery.' } };
async function request(body) {
  const result = {};
  const response = { status(code) { result.code = code; return this; }, json(body) { result.body = body; return this; }, send(body) { result.body = body; return this; } };
  await handler({ method: 'POST', body }, response);
  return result;
}
test('invalid input stops before verification or delivery', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Network must not be called'); };
  try {
    for (const body of ['{', null, {}, { ...valid, token: '' }, { ...valid, token: 'x'.repeat(4097) }, { ...valid, data: { ...valid.data, name: ['Invalid'] } }]) assert.equal((await request(body)).code, 400);
  } finally { globalThis.fetch = original; }
});
test('delivery must succeed before reporting success', async () => {
  const original = globalThis.fetch;
  const previousSecret = process.env.RECAPTCHA_SECRET_KEY;
  const previousWebhook = process.env.DISCORD_WEBHOOK_URL;
  process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
  process.env.DISCORD_WEBHOOK_URL = 'https://example.com/test-webhook';
  try {
    for (const delivered of [true, false]) {
      let calls = 0;
      globalThis.fetch = async (url, options) => { if (calls === 1) assert.deepEqual(JSON.parse(options.body).allowed_mentions, { parse: [] }); return ++calls === 1 ? { ok: true, json: async () => ({ success: true, score: 0.9, action: 'form_submit', hostname: 'www.nedlane.com' }) } : { ok: delivered }; };
      assert.equal((await request(valid)).code, delivered ? 200 : 502);
      assert.equal(calls, 2);
    }
  } finally {
    globalThis.fetch = original;
    if (previousSecret === undefined) delete process.env.RECAPTCHA_SECRET_KEY; else process.env.RECAPTCHA_SECRET_KEY = previousSecret;
    if (previousWebhook === undefined) delete process.env.DISCORD_WEBHOOK_URL; else process.env.DISCORD_WEBHOOK_URL = previousWebhook;
  }
});

test('tokens for other actions or hosts cannot trigger delivery', async () => {
  const original = globalThis.fetch;
  const env = { ...process.env };
  process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
  process.env.DISCORD_WEBHOOK_URL = 'https://example.com/test-webhook';
  try {
    for (const validity of [
      { success: true, score: 0.9, action: 'login', hostname: 'www.nedlane.com' },
      { success: true, score: 0.9, action: 'form_submit', hostname: 'attacker.example' },
      { success: true, score: 0.1, action: 'form_submit', hostname: 'www.nedlane.com' },
    ]) {
      let calls = 0;
      globalThis.fetch = async () => { calls++; return { ok: true, json: async () => validity }; };
      assert.equal((await request(valid)).code, 401);
      assert.equal(calls, 1);
    }
  } finally {
    globalThis.fetch = original;
    for (const key of ['RECAPTCHA_SECRET_KEY', 'DISCORD_WEBHOOK_URL']) {
      if (env[key] === undefined) delete process.env[key]; else process.env[key] = env[key];
    }
  }
});
