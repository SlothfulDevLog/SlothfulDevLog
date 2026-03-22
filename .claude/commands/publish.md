# publish — 記事を作成してslothfuldevlog.comに公開する

ユーザーから記事のテーマ・素材・下書きを受け取り、整形してサイトに公開する。

## やること

1. **記事を整形する**
   - タイトル、説明文、カテゴリ、タグを決める
   - Markdownで本文を書く（ユーザーの素材・メモをベースに）
   - frontmatterを正しく書く

2. **サムネイルを生成する**
   - 初回のみ: `cd scripts && npm install && cd ..`
   - 以下のコマンドで生成する:
     ```
     node scripts/generate-thumbnail.js "<タイトル>" "<説明>" "<カテゴリ>" "<slug>"
     ```
   - 生成された画像は `site/public/images/posts/<slug>.png` に保存される
   - frontmatter の `image` フィールドに `/images/posts/<slug>.png` を設定する

3. **ファイルを作成する**
   - ファイル名: `YYYY-MM-DD-slug.md`（slugは英小文字・ハイフン区切り）
   - 保存先: `site/src/content/posts/`

4. **git push する**
   ```
   git add site/src/content/posts/<ファイル名>
   git commit -m "記事追加: <タイトル>"
   git push
   ```

5. **公開URLを伝える**
   - `https://slothfuldevlog.com/posts/<slug>`

6. **X投稿文を生成する**
   - 公開した記事の内容をもとに、X投稿案を3つ生成する
   - 各案は280文字以内
   - 記事URLとカテゴリ別ハッシュタグ（2〜3個）を含める
   - ブランドボイス（力まない・本音・一緒に考える）で書く
   - 案1: シンプル告知型 / 案2: 問いかけ型 / 案3: 発見・気づき共有型
   - 3案を提示した後、「案1・案2・案3のどれを投稿しますか？（スキップする場合は「なし」）」と聞く
   - 選ばれた案を以下のコマンドでXに投稿する（※初回のみ `cd scripts && npm install && cd ..` が必要）:
     ```
     node scripts/post-to-x.js "[投稿テキスト全文]"
     ```
   - 投稿成功後、ツイートURLを表示する

   **カテゴリ別ハッシュタグ**:
   - `devlog`: `#Vibecoding` `#ClaudeCode` `#個人開発`
   - `body-mind`: `#パーソナルトレーナー` `#トレーニング` `#機能解剖学`
   - `culture`: `#読書` `#美術` `#印象派`
   - `essays`: `#エッセイ` `#気づき`
   - `projects`: `#個人開発` `#プロジェクト`

## frontmatterの形式

```yaml
---
title: "タイトル"
description: "120文字以内の説明"
date: YYYY-MM-DD
category: devlog | body-mind | culture | essays | projects
tags: [タグ1, タグ2]
image: "/images/posts/<slug>.png"
draft: false
---
```

## カテゴリの判断基準

- `devlog` — Vibecoding・アプリ・ゲーム開発・Claude Code・技術
- `body-mind` — パーソナルトレーナー・解剖学・トレーニング・健康
- `culture` — 読書・美術・印象派・博物館・生物・映画
- `essays` — エッセイ・人生の気づき・考えたこと・日記的なもの
- `projects` — 進行中・完成したプロジェクト紹介

## 文体のルール

- 日本語で書く（指定がなければ）
- 「力まない、リアルなプロセス」を大事にする
- 完璧な文章より、本音や発見が伝わる文章
- 一人称は「私」または省略
- 硬すぎず、崩しすぎず

## 使い方の例

```
/publish

ClaudeとVibecodingでAstroサイトを作った記録を書いて
```

```
/publish

[Obsidianのメモをペースト]
これを記事にして
```
