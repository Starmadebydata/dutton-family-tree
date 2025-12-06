# Dutton Family Tree - Deployment Instructions

## GitHub Pages Setup

This project is configured to be published on GitHub Pages using the `index.html` file in the root directory.

### Quick Start

1. **Ensure your repository settings are correct**:
   - Go to your GitHub repository: https://github.com/Starmadebydata/dutton-family-tree
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose branch: **main**
   - Choose folder: **/ (root)**
   - Click **Save**

2. **Your site will be live at**:
   ```
   https://starmadebydata.github.io/dutton-family-tree/
   ```

### File Structure

```
dutton-family-tree/
├── index.html              # Landing page (main entry point)
├── styles.css              # Main stylesheet
├── script.js               # JavaScript for interactivity
├── _config.yml             # Jekyll configuration (optional)
├── README.md               # Project documentation
├── EPISODES_GUIDE.md       # Episode guides
├── YELLOWSTONE_RESEARCH.md # Research document
├── DUTTON_FAMILY_GENEALOGY.md # Family tree
└── INDEX.md                # Navigation index
```

### Features

✅ **Responsive Design**: Works on desktop, tablet, and mobile
✅ **Bilingual Support**: English and Chinese language toggle
✅ **Dark Theme**: Professional dark interface inspired by Yellowstone
✅ **Fast Loading**: Static HTML, CSS, and JavaScript (no build required)
✅ **SEO Optimized**: Meta tags and semantic HTML
✅ **Accessible**: WCAG 2.1 compliant navigation and contrast

### How It Works

1. **index.html**: Main landing page that displays the Yellowstone universe content
2. **styles.css**: All styling with CSS variables for easy customization
3. **script.js**: 
   - Language switching (EN/ZH)
   - Navigation active state highlighting
   - Smooth scrolling
   - Scroll effects and animations
   - Local storage for language preference

4. **Markdown files** (README.md, EPISODES_GUIDE.md, etc.):
   - Linked from landing page
   - GitHub will render them automatically
   - Accessible at their respective URLs

### Customization

#### Change Color Scheme

Edit `styles.css` CSS variables at the top:

```css
:root {
    --primary-color: #d4af37;      /* Gold */
    --accent: #8b0000;              /* Dark Red */
    --background: #0f1419;          /* Dark Background */
}
```

#### Add More Languages

1. Update `index.html`: Add `data-lang` attributes (e.g., `data-fr`, `data-es`)
2. Update `script.js`: Modify `updateLanguage()` function to handle new languages
3. Update language button logic in `initLanguageToggle()`

#### Modify Navigation

Edit the navbar in `index.html`:
- Add/remove nav items in the `<ul class="nav-links">`
- Update corresponding section IDs

### Performance Tips

- All assets are minified and optimized
- CSS and JavaScript are inline where performance-critical
- Use browser caching via GitHub Pages defaults
- Images are minimal (only Unicode emoji used)

### Analytics (Optional)

To add Google Analytics or another tracker:

1. Update `_config.yml` with your tracking ID
2. Or add directly to `index.html` before closing `</head>` tag

### Troubleshooting

**Site not showing up?**
- Wait 1-2 minutes for GitHub Pages to build
- Check Settings → Pages to ensure correct source is selected
- Clear browser cache (Ctrl+Shift+Del)

**Styling looks wrong?**
- Check browser console for CSS errors (F12)
- Verify `styles.css` is in root directory
- Try different browser

**JavaScript not working?**
- Check browser console for errors
- Verify `script.js` is in root directory
- Ensure JavaScript is enabled in browser

### Local Testing

To test locally before pushing:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

### Deployment Checklist

- [ ] All files in correct locations (root directory)
- [ ] index.html exists and is named exactly
- [ ] styles.css and script.js linked correctly in index.html
- [ ] GitHub Pages enabled in repository settings
- [ ] Repository is public (required for free GitHub Pages)
- [ ] Changes pushed to main branch
- [ ] Site accessible at `https://starmadebydata.github.io/dutton-family-tree/`

### Support & Contribution

For issues, suggestions, or contributions:
1. Open an issue on GitHub
2. Submit a pull request with improvements
3. Check CONTRIBUTING.md (if exists) for guidelines

### License & Credits

- Project: Dutton Family Tree
- Repository: https://github.com/Starmadebydata/dutton-family-tree
- Yellowstone is a trademark of Paramount Television
- This is a fan-made, independent wiki/reference site

---

**Last Updated**: December 6, 2025
