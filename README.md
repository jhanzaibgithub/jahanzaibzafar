# Jahanzaib Zafar Portfolio

Premium Vue 3 + Vite single-page portfolio with a custom canvas galaxy background, GSAP scroll animations, bento project grid, skills, experience timeline, and static GitHub Pages deployment.

## Local Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deploy

The Vite base path is set to `/` in `vite.config.js`, so the app runs from the domain root.

Manual deploy:

```bash
npm run deploy
```

Automatic deploy:

1. Push this repository to GitHub.
2. Go to repository `Settings > Pages`.
3. Set source to `GitHub Actions`.
4. Push to `main`; `.github/workflows/deploy.yml` builds and publishes the `dist` output.
