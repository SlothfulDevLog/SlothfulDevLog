---
title: "記事を公開したら自動でサムネイルも生成される仕組みを作った"
description: "GPT Image 1 MiniをpublishワークフローにAIサムネイル自動生成を組み込んだ記録。$0.005/枚の現実と、見えてきた課題。"
date: 2026-03-23
category: devlog
tags: [ClaudeCode, Vibecoding, 画像生成, AI, ブログ自動化]
image: "/images/posts/2026-03-23-ai-thumbnail-auto-generation.png"
draft: false
---

[前回の記事](/posts/2026-03-22-obsidian-to-blog-to-x-pipeline)で、記事を書いたらXへの投稿文まで自動生成される仕組みができた。

今回はさらにその前工程、**サムネイル画像の自動生成**を組み込んでみた。

## きっかけ：サムネイルが面倒だった

ブログに画像がないのが気になっていた。OGP画像もサムネイルも、毎回 Canva で作るのが億劫で後回しにしていた。

「どうせ AI で自動化できるのでは」と思って調べ始めたのが今回の話。

## まずコストを調査した

最初は **Nano Banana Pro**（Google の Gemini 画像生成）が候補に上がった。ところが調べてみると 1 枚 $0.134 と意外と高い。

比較した結果、**GPT Image 1 Mini** が最もコスパがよいと判断した。

| モデル | 単価 |
|---|---|
| Nano Banana Pro | $0.134 / 枚 |
| Imagen 4 Fast | $0.020 / 枚 |
| GPT Image 1 Mini | **$0.005 / 枚** |

月に 20 枚生成しても $0.10。ほぼタダ。迷う理由がなかった。

## 作ったもの

`scripts/generate-thumbnail.js` というスクリプトを作り、publish スキルのステップに組み込んだ。

やっていることはシンプルで、

1. タイトル・説明・カテゴリ・slug を受け取る
2. カテゴリに合わせたスタイルのプロンプトを組み立てる
3. OpenAI API に投げる
4. 返ってきた画像を `site/public/images/posts/<slug>.png` に保存する

カテゴリ別のスタイル設計はこんな感じ。

```js
const categoryStyle = {
  devlog: "tech aesthetic, code editor, dark terminal, minimal flat illustration",
  "body-mind": "clean minimal, human anatomy sketch, warm tones, wellness",
  culture: "impressionist painting style, museum atmosphere, warm golden light",
  essays: "handwritten notes, coffee cup, thoughtful mood, warm paper texture",
  projects: "product mockup, clean UI, modern design, gradient background",
};
```

これで `/publish` を実行するだけで、記事ファイルの作成・サムネイル生成・git push まで一気に走るようになった。

## 実際に生成してみた感想

前回の記事用にサムネイルを 1 枚生成して公開してみた。

**よかったところ**
- 見た目はちゃんとそれっぽい
- devlog カテゴリらしいダークなテック系の雰囲気が出ていた
- 生成から保存・デプロイまで全自動で動いた

**気になったところ**
- テキストが入っていない。ブログ名もタイトルも何も書いてない画像
- 「SlothfulDevLog らしさ」がない。どこのブログの画像でも通用してしまう
- 1 枚しか生成しないので、気に入らなくても選択肢がない

サムネイルとしての機能は果たせているが、「このブログのサムネイルだ」と一目でわかる感じにはなっていない。

## 次にやりたいこと

課題を踏まえて、3 つの方向性を考えている。

**① 4 枚生成して選択式にする**

1 枚だけ生成して終わりではなく、4 パターン同時生成して「どれにする？」と選ばせる。ただし 4 枚が似たような画像では意味がないので、構図・スタイル・雰囲気を意図的に変えて生成したい。

**② テキストを画像に入れる**

タイトルやブログ名を画像内に描画できれば、サムネイルとしての情報量が上がる。GPT Image 1.5 はテキスト描写が得意らしいので、Mini から切り替えるのもあり。

**③ デザインテンプレートを維持する**

「このレイアウト・配色・フォント感」という軸を固定して、その上でコンテンツだけ変わるサムネイルを量産できたら理想。Image Generation の参照画像機能を使えばできそう。

---

今の段階では「動く」ところまで来た。次は「SlothfulDevLog らしい」に近づけていく。完璧より完了、の精神で。
