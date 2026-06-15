# ACB Brand Assets

The ACB logo: a gray open **C** ring enclosing a bold black **A**, with a blue
**B** nested at the lower-left — the three initials stacked into one mark.

These files are the shared source of truth for the ACB logo across all of
Charlie Becquet's projects (acb-landing, Rapid Reader / acb-apps.com, the mods
and tech sites). Copy what you need into each project.

## Colors

| Element | Hex |
| --- | --- |
| A (ink / black) | `#0b0c0f` |
| C ring (gray) | `#9aa0ad` |
| B (accent / blue) | `#3a5bff` |
| Background | `#ffffff` |

## Files

| File | Use |
| --- | --- |
| `acb-logo-large.png` | High-resolution master (transparent margin trimmed) — print, slides, editing |
| `acb-logo-square-2048.png` | 2048×2048 logo centered on white — general purpose |
| `acb-logo-original-nanobanana.png` | The original generated reference the mark was built from |
| `favicon.ico` | Multi-size favicon (16 / 32 / 48 px) for browser tabs |
| `apple-touch-icon.png` | 180×180 iOS / home-screen icon |
| `og-image-1200x630.png` | Social / link-preview card |
| `icons/icon-<size>.png` | Square PNG icons at 16–512 px (PWA manifest, app stores, etc.) |

## Favicon usage

```html
<link rel="icon" href="/brand/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
```

> Note: because the mark has generous open space, it gets faint below ~24 px.
> For very small favicons a tighter crop reads better.
