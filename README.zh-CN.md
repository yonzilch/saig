<div align="center">
<br />

# 静态资源索引生成器 (Static Assets Index Generator)

[![Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

**[![README](https://img.shields.io/badge/README-white)](https://github.com/yonzilch/saig) | [![English](https://img.shields.io/badge/English-blue)](https://github.com/yonzilch/saig/blob/main/README.md) | [![中文](https://img.shields.io/badge/Chinese-red)](https://github.com/yonzilch/saig/blob/main/README.zh-CN.md)**

一个轻量级、极速的静态站点，基于 [Astro](https://astro.build/) 构建，能够在**构建时**自动为你的本地文件生成美观、样式化的目录列表（类似于 Nginx 的 `autoindex` 功能）。

本项目不依赖服务器端模块来显示目录结构，而是在**构建时**扫描你的资源文件夹，并为每个目录和子目录生成静态的 `index.html` 文件。


## ✨ 特性

- **默认零 JavaScript：** 输出纯静态的 HTML 和 CSS，包含最少的 JavaScript。
- **递归扫描：** 自动发现所有子目录，并在构建时为它们生成索引。
- **智能排序：** 文件夹始终排在文件前面，两者均按字母顺序排序，完整支持区域设置/Unicode（包括中文、法语等语言）。
- **面包屑导航：** 通过直观的导航轻松回溯到父目录或根目录。
- **文件类型指示器：** 清晰的 Material Design 图标，用于区分目录和文件。
- **Material Design 3 主题：** 采用现代深色主题，保持统一的设计语言。
- **静态且快速：** 预渲染页面确保闪电般的加载速度，可部署在任何地方。
- **README 渲染：** 自动检测并渲染目录中的 README 文件，且能对其手动折叠。


## 🛠️ 技术栈

- **框架：** [Astro](https://astro.build/) - 面向内容驱动网站的 Web 框架
- **运行时：** pnpm / Node.js
- **构建逻辑：** 通过 `getStaticPaths` 使用 Node.js 的 `fs` 和 `path` 模块
- **样式：** 使用 Material Design 3 设计令牌的自定义 CSS


## 🚀 快速开始


### 前置要求

- [Node.js](https://nodejs.org/) 24+（推荐使用 LTS 版本）
- [pnpm](https://pnpm.sh/)（推荐）或 npm/yarn


### 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/yonzilch/saig.git
   cd saig
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```


## 📦 开发与构建


### 开发服务器

启动开发服务器，实现带有热重载的实时预览：

```bash
pnpm dev
```

*注意：开发服务器会动态生成页面，非常适合预览样式和布局更改。*


### 添加你的文件

**重要提示：** 所有需要索引的文件必须放置在 `public/` 目录中。Astro 将 `public/` 中的文件视为静态资源，会直接复制到构建输出中而不进行处理。

只需将你的文件夹（例如 `audio/`、`image/`、`video/`、`css/`、`js/` 等）移动到 `public/` 文件夹中：

```text
saig/
├── public/
│   ├── audio/
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   ├── image/
│   │   ├── avatar.avif
│   │   ├── avatar.jpg
│   │   └── avatar.webp
│   ├── video/
│   └── ...
└── src/
    └── ...
```


### 生产构建

为生产环境构建静态网站：

```bash
pnpm run build
```

此命令将：
1. 递归扫描 `public/` 目录。
2. 为根目录和每个子目录生成 `index.html` 文件（例如 `dist/image/index.html`）。
3. 将所有实际资源复制到 `dist/` 文件夹中。

构建好的网站将位于 `dist/` 目录中。


## 🌐 部署

构建完成后，`dist/` 文件夹包含完整的静态网站。你可以使用任何静态文件服务器来部署它：

- **Nginx：** 将 `root` 指令指向 `dist/` 目录。
- **Caddy：** 运行 `caddy file-server --root dist`
- **GitHub Pages / Cloudflare Pages / Netlify：** 将构建输出目录设置为 `dist`。
- **任何静态托管服务：** 将 `dist/` 的内容上传到任何静态托管服务。


## 📁 项目结构

```text
saig/
├── public/                  # 你的静态资源（图片、视频等）
│   ├── audio/
│   ├── image/
│   └── video/
├── src/
│   ├── pages/
│   │   ├── [...path].astro  # 目录列表的动态路由
│   │   └── index.astro      # 根页面
│   └── styles/
│       └── global.css       # 使用 Material Design 3 的全局样式
├── astro.config.mjs         # Astro 配置
├── package.json
├── README.md
└── ...
```


## 📄 许可证

本项目采用 **MIT 许可证** - 详情请参阅 [LICENSE](LICENSE) 文件。


## 🙏 致谢

- [Astro](https://astro.build/) - 出色的 Web 框架
- [Material Design](https://material.io/) - 设计系统的灵感来源
- [Nginx autoindex](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html) - 原始概念的启发
