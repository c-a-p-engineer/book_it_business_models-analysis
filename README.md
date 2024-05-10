# 技術書典16

エンジニアが知るべき<br>～IT業界の収益モデル～

## 前提条件

- Dockerがインストールされている
- VSCodeがインストールされている
- Remote-Containers 拡張機能がVSCodeにインストールされている

## セットアップ

1. リポジトリをクローン

```
git clone [your-repository-url]
```

2. VSCodeでプロジェクトを開く

3. 左下の「Reopen in Container」をクリック

## 使用方法

### 新規プロジェクト作成

```bash
npm create book new-book
cd new-book
```

### ビルド
`package.json` を書き換え

```package.json
  "scripts": {
    "build": "vivliostyle build --no-sandbox",
    "preview": "vivliostyle preview --no-sandbox",
    "press-ready": "vivliostyle build --press-ready --no-sandbox",
    // 対象のディレクトリは要修正
    "build:sass": "sass themes/theme-techbook:themes/theme-techbook --no-source-map ",
    "watch:sass": "sass themes/theme-techbook:themes/theme-techbook --no-source-map --watch"
  },
```

PDFビルド
```bash
vivliostyle build --no-sandbox
```

### ファイルの追加

新たにマークダウンファイルを追加する場合
1. `book/vivliostyle.config.js` を開きます
2. `entry` に

### テーマの作成

```bash
npm create vivliostyle-theme <your-theme-name>
```

テーマのscssをビルド
```bash
npm build:sass
```

テーマのscssを監視
```bash
npm run watch:scss
```

### 目次の自動生成
目次の自動生成

```bash
node scripts/head2toc.js
```

### 表紙をつける
`./scripts/cover.png` を `output.pdf` の表紙に設定する。

```bash
node ./scripts/cover.js
```

# 一括ビルド

```bash
node ./scripts/head2toc.js && npm run build:sass && vivliostyle build --no-sandbox && node ./scripts/cover.js
```

## 記法
[VFM: Vivliostyle Flavored Markdown](https://vivliostyle.github.io/vfm/#/ja/vfm)

## その他

- カスタマイズが必要な場合は、`.devcontainer/devcontainer.json` または `.devcontainer/Dockerfile` を編集してください。
- [Mermaid Live Editor](https://mermaid.live/)
