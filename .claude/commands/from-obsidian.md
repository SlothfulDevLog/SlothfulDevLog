# from-obsidian — Obsidianのメモから記事を作成して公開する

ObsidianのVault（iCloud同期）から素材を読み込み、記事に整形してslothfuldevlog.comに公開する。

## Obsidian Vaultのパス

```
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/PKM/
```

### フォルダ構造
- `20_Journal/` — 日記（YYYY-MM-DD.md形式）
- `00_Inbox (未処理、書き殴り)/` — アイデア・メモ・設計書
- `10_Atlas (概念、アイデア、MOC、完成した思考)/` — 整理された概念メモ
- `30_Kindle highlights/` — 読書ハイライト

## やること

1. **素材を読み込む**
   - ユーザーが指定したファイル名またはキーワードでVaultを検索
   - 指定がなければ最近のJournalを確認してネタを提案する

2. **記事に整形する**（/publish と同じルールで）

3. **git push して公開する**

## 使い方の例

```
/from-obsidian

最近のJournalから記事にできそうなネタを探して
```

```
/from-obsidian

印象派のメモを記事にして
```

```
/from-obsidian

2026-03-18の日記を記事にして
```
