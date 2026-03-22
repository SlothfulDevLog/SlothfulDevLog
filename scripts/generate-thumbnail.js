#!/usr/bin/env node
/**
 * generate-thumbnail.js
 * GPT Image 1 Mini でブログサムネイルを生成する
 *
 * 使い方:
 *   node scripts/generate-thumbnail.js "<タイトル>" "<説明>" "<カテゴリ>" "<slug>"
 *
 * 必要な環境変数（ルートの .env に記載）:
 *   OPENAI_API_KEY
 *
 * 出力先: site/public/images/posts/<slug>.png
 * frontmatter に書く値: /images/posts/<slug>.png
 */

import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env を手動読み込み
const envPath = resolve(__dirname, "../.env");
try {
  const envContent = await import("fs").then((fs) =>
    fs.readFileSync(envPath, "utf-8")
  );
  for (const line of envContent.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
  }
} catch {
  // .env がなくても環境変数が設定されていれば動く
}

const [title, description, category, slug] = process.argv.slice(2);

if (!title || !slug) {
  console.error("Usage: node generate-thumbnail.js <title> <description> <category> <slug>");
  process.exit(1);
}

// カテゴリ別のビジュアルスタイル指示
const categoryStyle = {
  devlog: "tech aesthetic, code editor, dark terminal, minimal flat illustration",
  "body-mind": "clean minimal, human anatomy sketch, warm tones, wellness",
  culture: "impressionist painting style, museum atmosphere, warm golden light",
  essays: "handwritten notes, coffee cup, thoughtful mood, warm paper texture",
  projects: "product mockup, clean UI, modern design, gradient background",
};

const style = categoryStyle[category] || "clean minimal, modern blog thumbnail";

const prompt = `Blog thumbnail image for a Japanese personal blog called "SlothfulDevLog".
Title: ${title}
Style: ${style}, no text in image, 16:9 aspect ratio, high quality, visually appealing.
Brand concept: "slothful" = relaxed, not trying too hard, authentic process.`;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log(`サムネイルを生成中: "${title}"`);

const response = await client.images.generate({
  model: "gpt-image-1-mini",
  prompt,
  size: "1536x1024",
  output_format: "png",
});

const imageData = response.data[0].b64_json;
if (!imageData) {
  console.error("画像データの取得に失敗しました");
  process.exit(1);
}

const outputDir = resolve(__dirname, "../site/public/images/posts");
mkdirSync(outputDir, { recursive: true });

const outputPath = resolve(outputDir, `${slug}.png`);
writeFileSync(outputPath, Buffer.from(imageData, "base64"));

console.log(`✓ 生成完了: site/public/images/posts/${slug}.png`);
console.log(`frontmatter に追加: image: "/images/posts/${slug}.png"`);
