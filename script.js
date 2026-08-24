const markdownUrlInput = document.getElementById("markdownUrl");
const loadButton = document.getElementById("loadButton");
const status = document.getElementById("status");
const output = document.getElementById("markdownOutput");

// After uploading your .md file to GitHub,
// replace this with its RAW content URL if you want automatic loading.
// Example:
// const DEFAULT_MARKDOWN_URL =
//   "https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/content.md";
const DEFAULT_MARKDOWN_URL = "";

async function loadMarkdown(url) {
  if (!url) {
    status.textContent = "Please enter a Markdown URL.";
    return;
  }

  try {
    status.textContent = "Loading Markdown...";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // The fetched .md content arrives here as a normal JavaScript string.
    const markdownText = await response.text();

    // Convert Markdown text into HTML.
    const html = marked.parse(markdownText);

    // Display the generated HTML.
    output.innerHTML = html;

    status.textContent = "Markdown loaded successfully.";
  } catch (error) {
    console.error(error);
    status.textContent = `Could not load the Markdown: ${error.message}`;
    output.innerHTML = "";
  }
}

loadButton.addEventListener("click", () => {
  loadMarkdown(markdownUrlInput.value.trim());
});

markdownUrlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadMarkdown(markdownUrlInput.value.trim());
  }
});

if (DEFAULT_MARKDOWN_URL) {
  markdownUrlInput.value = DEFAULT_MARKDOWN_URL;
  loadMarkdown(DEFAULT_MARKDOWN_URL);
}
