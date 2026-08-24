TEST PROJECT

1. Put these files in a GitHub repository.
2. Push them.
3. Open content.md on GitHub.
4. Use GitHub's Raw view to get the URL that returns only the Markdown content.
5. Paste that raw URL into the page input, or put it in DEFAULT_MARKDOWN_URL in script.js.
6. Open the webpage through a web server or GitHub Pages.

FILES
- index.html: page structure and converter library
- style.css: page styling
- script.js: fetches the external Markdown and converts it
- content.md: separate Markdown content for testing

NOTE
The URL must allow browser fetch requests. A GitHub raw content URL is intended
to return the actual file text rather than GitHub's file-view HTML.
