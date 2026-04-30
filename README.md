
<div align="center">
<br />

# Static Assets Index Generator

[![Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

**English | [中文](README.zh-CN.md)**

A lightweight, blazingly fast static site built with [Astro](https://astro.build/) that automatically generates beautiful, styled directory listings (similar to Nginx `autoindex`) for your local files.

Instead of relying on server-side modules to display directory structures, this project scans your asset folders at **build time** and generates static `index.html` files for every single directory and subdirectory.


## ✨ Features

- **Zero JS by Default:** Outputs pure, fast static HTML and CSS with minimal JavaScript.
- **Recursive Scanning:** Automatically discovers all subdirectories and generates indexes for them at build time.
- **Smart Sorting:** Folders are always listed first, followed by files. Both are sorted alphabetically with full locale/Unicode support for Chinese, French, and other languages.
- **Breadcrumb Navigation:** Easily trace back to parent directories or the root with intuitive navigation.
- **File Type Indicators:** Clear Material Design icons to distinguish between directories and files.
- **Material Design 3 Theme:** Modern dark theme with consistent design language.
- **Static & Fast:** Pre-rendered pages ensure lightning-fast load times and can be hosted anywhere.


## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) - The web framework for content-driven websites
- **Runtime:** pnpm / Node.js
- **Build Logic:** Node.js `fs` and `path` modules via `getStaticPaths`
- **Styling:** Custom CSS with Material Design 3 design tokens


## 🚀 Getting Started


### Prerequisites

- [Node.js](https://nodejs.org/) 24+ (LTS recommended)
- [pnpm](https://pnpm.sh/) (recommended) or npm/yarn


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yonzilch/saig.git
   cd saig
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```


## 📦 Development & Build


### Development Server

Run the development server for live preview with hot reloading:

```bash
pnpm dev
```

*Note: The dev server will dynamically generate pages on the fly, which is great for previewing your styling and layout changes.*


### Adding Your Files

**Important:** All files you want to index must be placed inside the `public/` directory. Astro treats files in `public/` as static assets and copies them directly to the build output without processing them.

Simply move your folders (e.g. `audio/`, `image/`, `video/`, `css/`, `js/` and so on) into the `public/` folder:

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


### Production Build

Build the static site for production:

```bash
pnpm run build
```

This command will:
1. Scan the `public/` directory recursively.
2. Generate `index.html` files for the root and every subdirectory (e.g., `dist/image/index.html`).
3. Copy all your actual assets into the `dist/` folder.

The built site will be available in the `dist/` directory.


## 🌐 Deployment

Once built, the `dist/` folder contains your complete static website. You can serve it using any static file server:

- **Nginx:** Point your `root` directive to the `dist/` directory.
- **Caddy:** Run `caddy file-server --root dist`
- **GitHub Pages / Cloudflare Pages / Netlify:** Set the build output directory to `dist`.
- **Any Static Host:** Upload the contents of `dist/` to any static hosting service.


## 📁 Project Structure

```text
saig/
├── public/                  # Your static assets (images, videos, etc.)
│   ├── audio/
│   ├── image/
│   └── video/
├── src/
│   ├── pages/
│   │   ├── [...path].astro  # Dynamic route for directory listings
│   │   └── index.astro      # Root page
│   └── styles/
│       └── global.css       # Global styles with Material Design 3
├── astro.config.mjs         # Astro configuration
├── package.json
├── README.md
└── ...
```


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- [Astro](https://astro.build/) - For the amazing web framework
- [Material Design](https://material.io/) - For the design system inspiration
- [Nginx autoindex](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html) - For the original concept
