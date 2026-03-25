# from-obsidian — Obsidianのメモから記事を作成して公開する

ObsidianのVault（iCloud同期）からMCPツールを使って素材を読み込み、記事に整形してslothfuldevlog.comに公開する。

## 使用するMCPツール（obsidianサーバー）

| ツール | 使いどころ |
|---|---|
| `search_notes` | キーワード・テーマで横断検索 |
| `read_note` | 特定ノートの本文を取得 |
| `read_multiple_notes` | 関連ノートをまとめて取得 |
| `get_frontmatter` | タグ・日付などのメタ情報だけ確認 |
| `list_all_tags` | Vault全体のタグ一覧を確認 |

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
→ `search_notes` でVault全体を横断検索し、関連ノートを洗い出す
→ 複数ヒットした場合は `read_multiple_notes` でまとめて取得し、最も記事に使えそうな内容を選ぶ

**ユーザーがファイル名・日付を指定した場合**
→ `read_note` でそのノートを直接取得する
（例: `20_Journal/2026-03-18.md`）

**指定なし・「ネタを探して」の場合**
→ `search_notes` で最近のJournalを検索（直近7日分）し、記事化できそうなネタを3〜5件提案する
→ ユーザーに選んでもらってから記事化する

### 2. 素材の深掘り

`read_multiple_notes` を使って関連ノートを芋づる式に収集する。
例：「印象派」で検索 → ヒットしたノートのリンク先も `read_note` で取得 → まとまった素材を構成する

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

```
/from-obsidian
#Vibecoding タグのついたメモから記事ネタを探して
```
