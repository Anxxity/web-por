# web-por

Personal portfolio site (FiveM systems, UI, robotics).

## Structure

```
css/
  main.css              # Entry — imports all core styles
  tokens/               # Reset, theme variables (light/dark)
  base/                 # Document defaults
  layout/               # Containers
  components/           # UI pieces (nav, hero, cards, modals, …)
  utilities/            # Motion / reveal
  responsive/           # Breakpoints
  pages/
    tutorials.css       # Tutorial listing & detail only

js/
  script.js             # Site behavior
  project-loader.js     # Projects & modals
  projects-data.js      # Project/tutorial data
  hero-3d.js            # Hero canvas
  tutorials-script.js
  tutorial-detail-script.js
```

## Pages

- `index.html` — portfolio home (`css/main.css`)
- `tutorials.html`, `tutorial-detail.html` — also load `css/pages/tutorials.css`
