# Design Engineering Portfolio — Interactive 3D Gallery (flat version)

This is a flat-folder version of the site — every file sits at the top
level (no subfolders), which is what you want if you're uploading via
GitHub's drag-and-drop web uploader (it doesn't preserve folder structure).

## Deploying on GitHub Pages

1. Upload every file in this folder directly into your repo root — same
   level as this README, not inside a subfolder.
2. Go to **Settings → Pages**, set Source to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
3. Visit `https://yourusername.github.io/your-repo-name/`.

**Note:** the 3D viewer loads Three.js from a CDN at runtime, so visitors
need an internet connection to see the rotating models — this works fine
once deployed online. If it can't load, or a project has no `model` set,
that project's overlay falls back to its static cover image automatically.

## Editing content

Open **`data.js`** for your name, bio, experience, and projects.

### Adding your own 3D model

```js
model: "my-part.stl",       // path to an STL file next to index.html
modelColor: 0xc9a76b        // optional hex color
```

Export STL directly from your CAD tool (SolidWorks, Fusion 360, Onshape,
Blender...). Leave `model: ""` to just show a static cover image instead.

The six `.stl` files included are placeholder shapes — swap them for
your own parts.

## Editing style

Colors, radii, and fonts are CSS variables at the top of **`style.css`**.
