# SlothfulDevLog

## このプロジェクトについて

SlothfulDevLogは、非エンジニアのVibecoderであるharukichiの学び・実験・発見を記録し発信するための母艦プロジェクト。
「Slothful = 怠惰・力まない」をブランドコンセプトに、完璧を求めず、リアルなプロセスを残していく。

## オーナーについて

- パーソナルトレーナーとして働いている
- 非エンジニア。Vibecoding（AI駆使のコーディング）でアプリ・ゲーム開発にチャレンジ中
- 興味の幅が広い：印象派美術、生物、読書、機能解剖学、投資、エッセイ・小説
- Obsidianで日記・メモを管理（iCloud同期）
- MCPや自動化を積極的に活用したい
- 日本語メインで発信。将来的に英語も

## フォルダ構造

```
SlothfulDevLog/
├── CLAUDE.md          ← この設定ファイル
├── site/              ← Astroサイト本体（slothfuldevlog.com）
├── projects/          ← 個別プロジェクト（収益化含む）
├── docs/              ← 設計・戦略ドキュメント
└── .claude/commands/  ← カスタムスキル
```

## Obsidian Vault の場所

`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/PKM/`

### Obsidian フォルダ構造
- `00_Inbox (未処理、書き殴り)/` — 生のメモ・アイデア・設計書
- `10_Atlas (概念、アイデア、MOC、完成した思考)/` — 整理された概念
- `20_Journal/` — 日記（YYYY-MM-DD.md形式）
- `30_Kindle highlights/` — 読書ハイライト
- `90_添付ファイル/` — 画像などの添付
- `91_テンプレート/` — テンプレート

## サイト構成（slothfuldevlog.com）

コンテンツカテゴリ：
- **Dev Log** — Vibecoding・アプリ・ゲーム開発の記録
- **Body & Mind** — パーソナルトレーナーとしての学び・気づき
- **Culture** — 読書記録・美術館・博物館・印象派・生物
- **Essays** — エッセイ・人生の学び・発見
- **Projects** — 個別プロジェクトページ

## ワークフロー：Obsidian → 記事

1. ObsidianのJournal / Inboxから素材を読み取る
2. カテゴリを判定し、記事として整形する
3. site/src/content/ 配下に配置
4. Vercelへ自動デプロイ
5. 必要に応じてX / noteに拡散

## コミュニケーションスタイル

- 日本語で会話する
- 簡潔で実用的なアウトプットを好む
- 「完璧より完了」を大事にする
- 非エンジニアなので、技術的な説明は平易に

## 外部アカウント

- ドメイン: slothfuldevlog.com（Cloudflareで取得）
- X: @Slothfuldevlog
- Instagram: @Slothfuldevlog
- デプロイ先: Vercel or Cloudflare Pages（検討中）
