# External Markdown Test

This content comes from a separate **Markdown file**.

## The flow

1. JavaScript fetches the `.md` URL.
2. The response becomes a JavaScript string.
3. `marked` converts that Markdown string into HTML.
4. JavaScript inserts the HTML into the page.
5. CSS styles the displayed result.

### Formatting test

**Bold text**

*Italic text*

- Item one
- Item two
- Item three

[Example link](https://example.com)

```js
console.log("Markdown loaded from an external URL");
```
