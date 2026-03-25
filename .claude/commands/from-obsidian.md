# from-obsidian — Obsidianのメモから記事を作成して公開する

ObsidianのVault（iCloud同期）からMCPツールを使って素材を読み込み、記事に整形してslothfuldevlog.comに公開する。

## 使用するMCPツール（obsidianサーバー）

| ツール | 使いどころ |
|---|---|
| `list_directory` | フォルダ内のファイル一覧を取得 |
| `read_file` | 特定ノートの本文を取得 |
| `search_files` | ファイル名でノートを検索 |
| `read_multiple_files` | 複数ノートを一括取得 |

## Vault構造

```
PKM/
├── 20_Journal/          — 日記（YYYY-MM-DD.md形式）
├── 00_Inbox (未処理、書き殴り)/  — アイデア・メモ・設計書
├── 10_Atlas (概念、アイデア、MOC、完成した思考)/  — 整理された概念メモ
└── 30_Kindle highlights/  — 読書ハイライト
```

## やること

### 1. 素材を探す

**ユーザーがキーワード・テーマを指定した場合**
→ `search_files` でファイル名検索し候補を絞る
→ 候補ファイルを `read_multiple_files` でまとめて取得し、最も記事に使えそうな内容を選ぶ

**ユーザーがファイル名・日付を指定した場合**
→ `read_file` でそのノートを直接取得する
（例: `20_Journal/2026-03-18.md`）

**指定なし・「ネタを探して」の場合**
→ `list_directory` で `20_Journal/` を確認し、直近7日分のファイルを `read_multiple_files` で取得
→ 記事化できそうなネタを3〜5件提案し、ユーザーに選んでもらってから記事化する

### 2. 素材の深掘り

`read_multiple_files` を使って関連ノートをまとめて収集する。
例：Journal に「印象派」の記述があれば `search_files` で `10_Atlas/` も検索し、関連概念メモも合わせて記事の素材にする。

### 3. 記事に整形する（/publish と同じルールで）

- カテゴリを判定する
- frontmatterを作成する
- 本文を書く（ユーザーの言葉・発見・気づきを活かす）
- サムネイルを生成する（`node scripts/generate-thumbnail.js`）

### 4. git push して公開する

## 使い方の例

```
/from-obsidian
最近のJournalから記事にできそうなネタを探して
```

```
/from-obsidian
印象派のメモをまとめて記事にして
```

```
/from-obsidian
2026-03-18の日記を記事にして
```

```
/from-obsidian
Kindleハイライトから読書記録を記事にして
```
