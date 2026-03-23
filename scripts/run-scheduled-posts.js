#!/usr/bin/env node
// run-scheduled-posts.js
// scheduled-posts.json を読み込み、時間が来た未投稿ツイートを投稿する
//
// crontab から5分ごとに呼び出される想定:
// [*]/5 [*] [*] [*] [*] cd /Users/harukichi/SlothfulDevLog && node scripts/run-scheduled-posts.js >> /tmp/scheduled-posts.log 2>&1

import { TwitterApi } from "twitter-api-v2";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env を読み込む
const envPath = resolve(__dirname, "../.env");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
  }
} catch {
  // 環境変数が直接設定されている場合はスキップ
}

const schedulePath = resolve(__dirname, "scheduled-posts.json");
const posts = JSON.parse(readFileSync(schedulePath, "utf-8"));

const now = new Date();
let updated = false;

for (const post of posts) {
  if (post.posted) continue;

  const scheduledAt = new Date(post.scheduledAt);
  if (now < scheduledAt) continue;

  // 時間が来ている → 投稿する
  console.log(`[${now.toISOString()}] 投稿します: ${post.id}`);

  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
  });

  try {
    const result = await client.v2.tweet(post.text);
    console.log(`✓ 投稿完了: https://x.com/Slothfuldevlog/status/${result.data.id}`);
    post.posted = true;
    post.postedAt = now.toISOString();
    updated = true;
  } catch (err) {
    console.error(`✗ 投稿失敗: ${err.message}`);
  }
}

if (updated) {
  writeFileSync(schedulePath, JSON.stringify(posts, null, 2));
  console.log("scheduled-posts.json を更新しました");
}
