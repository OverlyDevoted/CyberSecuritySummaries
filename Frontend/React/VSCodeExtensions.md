## Extensions

These are personal, but I've noticed they increase productivity, less time in menus, faster text selection, greps

### Visuals
- Color highlight
- escook-theme
- Material icon theme

### QoL
- Auto rename tag
- Bookmarks (meh could help)
- Code spell checker
- Command palette NPM
    - Bind to CTRL + ALT + .
- EOF mark
- Gitlens
- Live server
- Prettier
- Prettier ESLint
- Select by indent
    - Bind to SHIFT + ALT + arrow left or right (based on expand or shrink)
- Stopwatch
    - Bind to SHIFT + CTRL + ALT + (END for stop stopwatch, HOME for reset, R for resume)   
- SVG preview

### React
- HTML CSS support
- i18n ally
- ESlint
- JS and TS nightly (add remove missing imports)
- ES7 + React/Redux

## Binds

1. No need for the package but bind `Git: Checkout to` (no detached) to CTRL + ALT + /  

## Options

1. Visual Studio Code, and Click Settings at the bottom left. Click Settings. Click Tab size. Type in Tab size of your choice.
2. Convert indentation to spaces
3. SHIFT + CTRL + P, type user settings json and add:
```json
"editor.codeActionsOnSave": {
    "source.organizeImports": "always",
    "source.addMissingImports": "always"
}
```
