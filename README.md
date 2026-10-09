# ValentinoWang.github.io

王思尧（Siyao Wang）的个人网站：教育背景、产品与技术、学术、体育、自媒体和奖项。

在线访问：https://valentinowang.github.io/

纯静态页面（`index.html`、`style.css`、`main.js`），不依赖构建工具和外部字体，直接由 GitHub Pages 发布。

改了 `style.css` 或 `main.js` 后，把 `index.html` 里两处 `?v=` 换成新值（例如 `cat style.css main.js | shasum | cut -c1-8`），否则浏览器会继续用缓存的旧文件，GitHub Pages 缓存 10 分钟。
