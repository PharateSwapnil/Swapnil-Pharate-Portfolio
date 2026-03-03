# Swapnil Pharate — Portfolio

React + Vite portfolio. Run locally in 3 commands. Deploy to Netlify in 2 minutes.

---

## Project Structure

```
swapnil-portfolio/
├── index.html              ← HTML shell (don't touch)
├── vite.config.js          ← Vite config (don't touch)
├── package.json            ← Dependencies
├── netlify.toml            ← Netlify deploy config
├── .gitignore
├── public/
│   ├── favicon.svg
│   └── Swapnil_Pharate_resume.pdf   ← PUT YOUR RESUME HERE
└── src/
    ├── main.jsx            ← React entry (don't touch)
    └── Portfolio.jsx       ← ALL your portfolio code lives here
```

---

## Run Locally

**Requirements:** Node.js 18+ (check with `node -v`)

```bash
# 1. Go into the folder
cd swapnil-portfolio

# 2. Install dependencies (only needed once)
npm install

# 3. Start local dev server
npm run dev
```

Open **http://localhost:5173** in your browser.
The page hot-reloads instantly whenever you save any file.

---

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder — that's what gets deployed.

To preview the production build locally:
```bash
npm run preview
# Opens at http://localhost:4173
```

---

## Add Your Resume PDF

Place your resume file inside the `public/` folder:
```
public/Swapnil_Pharate_resume.pdf
```

Then in `Portfolio.jsx`, find the `meta` object near the top and update:
```js
resume: "/Swapnil_Pharate_resume.pdf",
```

---

## Deploy to Netlify

### Option A — Drag & Drop (easiest, no account needed for basics)

1. Run `npm run build` → this creates the `dist/` folder
2. Go to **https://app.netlify.com/drop**
3. Drag and drop your `dist/` folder onto the page
4. Done — you get a live URL instantly ✅

### Option B — Connect GitHub (recommended, auto-deploys on every push)

1. Push your project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/swapnil-portfolio.git
   git push -u origin main
   ```

2. Go to **https://app.netlify.com** → "Add new site" → "Import an existing project"

3. Connect GitHub → select your repo

4. Netlify auto-detects the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Click **Deploy site** → live in ~60 seconds ✅

6. Every time you `git push`, Netlify automatically rebuilds and redeploys.

### Custom Domain (optional)
In Netlify: Site settings → Domain management → Add custom domain

---

## Edit Content

All content is in the `DEFAULT_DATA` object at the top of `src/Portfolio.jsx`.

You can also edit content **live in the browser** using the built-in editor:
- Click **"✎ Edit"** in the top navigation
- Click **"⊞ Open Editor"**
- Edit any section, click **Save Changes**
- Changes persist in `localStorage` (survive page refresh)
- Download AWS icons https://www.awsicon.com/

To make edits permanent, copy the values back into `Portfolio.jsx`.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| WebGL (raw) | 3D particle animation in hero |
| CSS-in-JS | All styles (no extra library needed) |
| localStorage | Persists live edits across refreshes |
| netlify.toml | Zero-config Netlify deployment |
