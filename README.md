# ValentinoWang.github.io

王思尧（Siyao Wang）的个人网站：教育背景、产品与技术、学术、体育、传播和奖项。

在线访问：https://valentinowang.github.io/

纯静态页面（`index.html`、`style.css`、`main.js`），不依赖构建工具和外部字体，推到 `main` 后由 GitHub Pages 自动发布，一般一分钟内生效。

## 页面结构

`index.html` 是一整页长卷，按 `section id` 分栏，顶部导航跟着滚动高亮：

| 栏目 | id | 内容 |
|---|---|---|
| 首屏 | `top` | 标语、简介、四个数字、挑战杯照片 |
| 01 教育 | `education` | 清华、兰大年表，本科成绩单节选 |
| 02 产品与技术 | `product` | 能力四栏、Cadenvo 规模与角色、手机截图、架构图、技术要点、多智能体研发、其他项目、五代迭代线 |
| 03 学术 | `research` | 论文版式：摘要、参考文献、研究项目 |
| 04 体育 | `sport` | 计分牌、比赛成绩表、照片墙 |
| 05 传播 | `media` | 自媒体账号、电视、广播、报道 |
| 06 奖项 | `awards` | 按年份的荣誉年表，可按类别筛选，右侧照片随滚动切换 |

「产品与技术」的样式类名都以 `t-` 开头。里面的数字（提交数、接口数、测试文件数等）来自各 Git 仓库的统计，页面底部写着统计日期，更新数字时一起改日期。

## 奖项怎么加

每一年是一个 `.year`，奖项是其中的 `li`：

```html
<li data-n="2" data-c="ty"><span class="lvl l-s">校级</span><span class="aw-text">🥇 兰州大学学生运动会 · 100 米、200 米冠军</span></li>
```

- `data-c`：筛选类别。`cx` 创新创业、`xs` 学术竞赛、`ty` 体育、`zh` 综合荣誉。
- `lvl` 的第二个类决定级别和颜色：`l-i` 国际、`l-n` 全国、`l-b` 北京市、`l-p` 省级、`l-s` 校级。
- `data-n`：一条里包含几个奖项，默认 1。顶部按级别的统计数字由 `main.js` 自动计算，不用手改。
- 奖牌用 🥇🥈🥉 写在文字开头。

## 奖项照片

在 `.year` 的 `ul` 后面放 `.year-shots`，竖图给 `figure` 加 `class="tall"`：

```html
<div class="year-shots"><figure class="tall"><img src="assets/xxx.jpg" alt="……" loading="lazy"><figcaption>……</figcaption></figure></div>
```

- 宽屏（1100px 以上）：`main.js` 把每年的照片复制到右侧固定的照片栏，滚到哪一年显示哪一年；一年照片多时，照片栏跟着这一年的滚动进度往下走。
- 窄屏和手机：照片留在各自年份下面，横向滑动。
- 带 `data-panel="2019–2023"` 的几年（2023 到本科）共用一组照片，照片按这几年的总滚动距离平均展开，说明前自动加上年份。新加的兰大时期年份也要带这个属性。

## 图片

- 都放在 `assets/`，按栏目加前缀命名：`app-`、`edu-`、`research-`、`sport-`、`media-`、`award-`。
- 发布前压缩：长边 1200–1600px，JPEG 质量 85 左右，手机照片先按 EXIF 转正。
- 成绩单、名次表、合影里有别人的姓名或信息时，只截自己那一行或只保留必要部分，不公开其他人的信息。
- 不再使用的图片直接删除，不留在仓库里。

## 改样式或脚本后

改了 `style.css` 或 `main.js`，把 `index.html` 里两处 `?v=` 换成新值：

```sh
cat style.css main.js | shasum | cut -c1-8
```

否则浏览器会继续用缓存的旧文件（GitHub Pages 缓存 10 分钟）。自己看新版时，电脑上 Cmd+Shift+R 强制刷新。

## 发布前检查

- 用浏览器分别看宽屏（1440px）和手机（390px），确认没有横向滚动条、文字没有被截断。
- 深色模式下也看一遍（系统切换深色即可）。
- 推送后在仓库的 Actions 里确认 Pages 部署成功，再打开线上页面核对。
