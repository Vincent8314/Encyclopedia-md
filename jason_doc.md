Yes — if you want **all the comment-related properties in one place**, here’s a complete practical setup for VSCodium:

```json id="7q2km"
{
  "editor.tokenColorCustomizations": {
    "comments": {
      "foreground": "#6A9955",
      "fontStyle": ""
    }
  },

  "workbench.colorCustomizations": {
    "editor.selectionBackground": "#264F78",
    "editor.selectionForeground": "#FFFFFF",
    "editor.inactiveSelectionBackground": "#3A3D41",
    "editor.wordHighlightBackground": "#3A3D41",
    "editor.wordHighlightStrongBackground": "#4A4D51"
  }
}
```

### What each one does

| Property                               | Controls                                  |
| -------------------------------------- | ----------------------------------------- |
| `comments.foreground`                  | Normal comment color                      |
| `comments.fontStyle`                   | Bold / italic / underline / strikethrough |
| `editor.selectionBackground`           | Background when text is selected          |
| `editor.selectionForeground`           | Text color when selected                  |
| `editor.inactiveSelectionBackground`   | Selection when editor isn't focused       |
| `editor.wordHighlightBackground`       | Background of highlighted occurrences     |
| `editor.wordHighlightStrongBackground` | Stronger occurrence highlight             |

**Important:** VSCodium doesn't have a separate property for **“comment when selected.”** Once a comment is selected, `editor.selectionForeground` and `editor.selectionBackground` take over.

If you want, I can also give you a **complete list of every `editor.*` color customization property** (cursor, line highlight, brackets, selection, errors, warnings, comments, etc.) in one big `settings.json`.
