## 概要
堀川イン様タスク管理システム

## バージョン

|名称|バージョン|
|:--:|:--:|
|MySQL|8.0|
|PHP|8.1|
|Laravel|9.x|
|Node.js|16.15|
|React|17.x|
|MUI|5.x|
|Composer|2.3.8|
|Vite|3.0.9|

### Laravel Sail
https://readouble.com/laravel/9.x/ja/sail.html

### .env作成
`.env.example`をコピーして`.env`を作成、各項目に値を定義する。

### Composerのパッケージのインストール
ターミナルで以下のコマンドをたたく
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```
### Sail起動方法
```
./vendor/bin/sail up -d
```

### Sail停止
```
./vendor/bin/sail stop
or
./vendor/bin/sail down
```

### コンテナ内で bashの起動方法
```
./vendor/bin/sail shell
```
### Laravel設定
```
./vendor/bin/sail shell
php artisan key:generate
php artisan migrate
php artisan db:seed
```
### npmパッケージのインストール
```
./vendor/bin/sail shell
npm install
```
### Vite起動
```
./vendor/bin/sail shell
npm run dev

//ビルド
npm run build
```

### URL

- トップページ：http://localhost
- API：http://localhost/api
- mailhog：http://localhost:8025/

### ER図
https://app.diagrams.net/#G1bUoP5ILj568NSyxWM-RVY5XzQHmHdRzL

## フロントエンドライブラリ


### 状態管理ライブラリ

Recoil：https://recoiljs.org/

### カレンダー機能に使用

FullCalendar：https://fullcalendar.io/

### UIライブラリ

MUI：https://mui.com/

### ページ遷移

react-router-dom v6：https://github.com/remix-run/react-router

### MUI専用のテーブルライブラリ

mui-datatables：https://github.com/gregnb/mui-datatables

### フォームバリデーションライブラリ

react-hook-form：https://github.com/react-hook-form/react-hook-form

### 無限スクロール

react-infinite-scroll-component：https://github.com/ankeetmaini/react-infinite-scroll-component

### スマホ時のスワイプに対応

react-swipeable：https://github.com/FormidableLabs/react-swipeable

### アラート機能

react-toastify：https://github.com/fkhadra/react-toastify

## React ディレクトリ構成

基本的にNuxt.jsを模倣した形でコンポーネントを構成

```
resources
│ 
├── ts
│   └── atoms (Recoil 状態管理)
│        ├── adminAtom.ts (管理者)
│        └── userAtom.ts (スタッフ)
├── components
│   ├── layouts (レイアウト層)
│   │
│   ├── pages (ページ層)
│   │
│   ├── parts (最小のコンポーネント)
│   │
│   ├── templates (再利用可能なコンポーネントグループ)
│   │
│   ├── hooks (React Hooksの関数コンポーネント)
│   │    ├── useAdminAuth.ts (管理者状態管理)
│   │    ├── useDataTable.ts (mui-datatablesの設定)
│   │    ├── useNotification.ts (react-toastifyの設定)
│   │    ├── useUserAuth.ts (スタッフの状態管理)
│   │    └── useWindowSize.ts (ウィンドウサイズを判定)
│   │
│   ├── lib (ライブラリ)
│   │    ├── axios.ts (axiosのインスタンス設定)
│   │    └── dateFormat.ts (日付ライブラリや日付の設定)
│   │
│   ├── route (ページのルートを定義)
│   │
│   └── types (型定義)
├── App.tsx
└── index.tsx

```

