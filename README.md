# Markdown AI Document Workspace

## Project Vision

Create a web application that allows users to take Markdown-based content (especially AI-generated content), transform it into a personalized visual document, edit it, organize it, save it, and share it.

The goal is to separate:

* **Content**
* **Structure**
* **Design**
* **User preferences**

so users can customize documents without touching code.

---

# Core Architecture

```text
User
 |
 v
Web Application
 |
 +----------------+
 |                |
 v                v
Frontend        Backend
HTML/CSS/JS     Python
 |
 v
Markdown → HTML → Personalized Display
 |
 v
Database
```

---

# Frontend

## Technologies

```text
HTML
CSS
JavaScript
```

## Responsibilities

The browser handles:

* displaying documents,
* converting Markdown output into HTML,
* applying themes,
* modifying the interface dynamically,
* handling user interactions.

---

# Markdown Rendering System

The application converts:

```text
Markdown
    ↓
HTML DOM
    ↓
Styled Document
```

Example:

```html
<article id="markdownOutput"
class="Color_Theme_1 font_12 indent_4">

    <h1>Title</h1>
    <p>Content</p>

</article>
```

The HTML structure stays stable.

The classes control the appearance.

---

# CSS Modular Theme System

The CSS is divided into independent modules.

## Base CSS

Responsible for the permanent Markdown structure.

Example:

```text
main.css
```

Controls:

* h1
* h2
* p
* links
* lists
* quotes
* code blocks

---

## Style Modules

Every module is a real, self-contained CSS file. All selectors follow the same fixed pattern:

```text
#markdownOutput.<ModuleClass> <element>
```

The ID (`#markdownOutput`) never changes. The module class changes. This is what keeps every module isolated and swappable without collisions.

Every module — theme, font, indent — targets the same fixed set of elements:

```text
h1, h2, h3, p, a, blockquote, pre, code (+ ul/ol/li for spacing modules)
```

### Example root element

```html
<article id="markdownOutput" class="Color_Theme_1 font_12 indent_4">
    <h1>Title</h1>
    <h2>Subtitle</h2>
    <p>My markdown text with <a href="#">a link</a>.</p>
    <blockquote>A quote</blockquote>
    <ul>
        <li>Item</li>
    </ul>
    <pre><code>const example = true;</code></pre>
</article>
```

### Base CSS — main.css (structural reset, no color/size/spacing opinions)

```css
#markdownOutput {
    display: block;
    width: 100%;
    box-sizing: border-box;
}

#markdownOutput h1 {
    margin: 0;
    padding: 0;
    font-weight: bold;
}

#markdownOutput h2 {
    margin: 0;
    padding: 0;
    font-weight: bold;
}

#markdownOutput h3 {
    margin: 0;
    padding: 0;
    font-weight: bold;
}

#markdownOutput p {
    margin: 0;
    padding: 0;
}

#markdownOutput a {
    text-decoration: none;
}

#markdownOutput ul,
#markdownOutput ol {
    margin: 0;
    padding: 0;
}

#markdownOutput li {
    margin: 0;
    padding: 0;
}

#markdownOutput blockquote {
    margin: 0;
    padding: 0;
}

#markdownOutput pre {
    margin: 0;
    padding: 0;
}

#markdownOutput code {
    font-family: monospace;
}

#markdownOutput img {
    max-width: 100%;
    height: auto;
}
```

### Theme module — Color_Theme_1.css

Color follows a hierarchy-based darkness scale: more important elements (h1) are darkest, body text lighter.

```css
#markdownOutput.Color_Theme_1 {
    background-color: #ffffff;
    color: #222222;
}

#markdownOutput.Color_Theme_1 h1 {
    color: #111111;
}

#markdownOutput.Color_Theme_1 h2 {
    color: #222222;
}

#markdownOutput.Color_Theme_1 h3 {
    color: #333333;
}

#markdownOutput.Color_Theme_1 p {
    color: #444444;
}

#markdownOutput.Color_Theme_1 a {
    color: #0066cc;
}

#markdownOutput.Color_Theme_1 blockquote {
    color: #666666;
    border-left: 4px solid #cccccc;
}

#markdownOutput.Color_Theme_1 pre {
    background-color: #f5f5f5;
}

#markdownOutput.Color_Theme_1 code {
    color: #cc0000;
}
```

A `Color_Theme_2`, `Color_Theme_3`, etc. follows the exact same structure — same elements, same darkness-hierarchy rule, different color values. This is the template anyone (including future contributors) copies to create a new theme.

### Font module — font_12.css

The number in the filename equals the base pixel value used inside it. `font_18.css` is the identical file with every `12px` replaced by `18px` — meaning these modules can be generated from a template rather than hand-written one by one.

```css
#markdownOutput.font_12 {
    font-size: 12px;
}

#markdownOutput.font_12 h1 {
    font-size: 2em;
}

#markdownOutput.font_12 h2 {
    font-size: 1.5em;
}

#markdownOutput.font_12 h3 {
    font-size: 1.25em;
}

#markdownOutput.font_12 p {
    font-size: 12px;
}

#markdownOutput.font_12 a {
    font-size: 12px;
}

#markdownOutput.font_12 blockquote {
    font-size: 12px;
}

#markdownOutput.font_12 code {
    font-size: 12px;
}
```

### Spacing module — indent_4.css

Same principle: the number in the filename equals the `rem` value used throughout.

```css
#markdownOutput.indent_4 ul {
    padding-left: 4rem;
}

#markdownOutput.indent_4 ol {
    padding-left: 4rem;
}

#markdownOutput.indent_4 blockquote {
    margin-left: 4rem;
}

#markdownOutput.indent_4 p {
    text-indent: 4rem;
}
```

Other modules (e.g. `code_style_terminal.css`) follow the same `#markdownOutput.<ModuleClass> <element>` pattern, scoped only to the elements relevant to that module's concern.

The user changes appearance by changing classes:

Before:

```html
class="Color_Theme_1 font_12"
```

After:

```html
class="Color_Theme_3 font_18"
```

The content does not change.

Only the presentation changes.

---

# User Experience

The user can:

## 1. Import AI content

Example:

* ChatGPT output
* Markdown documents
* notes
* technical documents

---

## 2. Customize appearance

Buttons/sliders:

```text
Theme   ◀ ▶
Font    ◀ ▶
Spacing ◀ ▶
Code    ◀ ▶
```

JavaScript changes the selected classes.

---

## 3. Edit document structure

Users can add/remove blocks:

```text
Title
Paragraph
Quote
Code
Image
Table
Callout
```

---

## 4. Save documents

Documents contain:

```text
Content
+
Style configuration
+
User settings
```

Example:

```json
{
 "theme":"Color_Theme_3",
 "font":"font_18",
 "indent":"indent_4"
}
```

---

# Sharing System

Two possible exports:

## Clean version

```text
Markdown only
```

Universal format.

---

## Designed version

```text
Markdown
+
Style configuration
```

When another user opens it:

* the content loads,
* the classes load,
* the application applies the design.

The receiver can replace the design with their own theme.

---

# Backend

## Technology

```text
Python + Flask
```

## Responsibilities

Python (via Flask, a lightweight web toolkit built on top of Python) handles:

* communication between browser and database,
* user accounts,
* saving documents,
* loading documents,
* permissions,
* synchronization.

The backend should stay simple.

Main logic:

```text
Receive
↓
Check
↓
Store
↓
Return
```

Flask is not a separate language — it is a small, free, open-source Python library that turns Python code into a working web server. It is installed with a single command (`pip install flask`) and adds no extra learning curve beyond Python itself.

---

# Database

## Decision: PostgreSQL

A single database handles everything: users, documents, preferences, sharing information, and versions.

**Why PostgreSQL:**

* **Structured data** (users, permissions, sharing relationships) is handled cleanly with normal relational tables.
* **Flexible data** (Markdown content + style configuration) is stored using PostgreSQL's built-in `JSONB` column type — no second database needed for this.
* **Python integration** is straightforward via `psycopg2` or `SQLAlchemy`.
* **Docker** offers an official, ready-to-use PostgreSQL image for deployment.
* Free, fully open-source, actively developed since 1986, with no company able to restrict or monetize the core product.

In practice: a `documents` table holds normal columns (title, author, date) plus one `JSONB` column containing the content and style configuration. One database to host, back up, and learn.

*(For local prototyping before deployment, SQLite — a free, public-domain, file-based database built into Python — can optionally be used as a temporary stand-in, then swapped for PostgreSQL with minimal syntax changes.)*

---

# Security

Not part of the original plan, added as a required layer for any application handling user accounts and personal documents.

* **HTTPS** — encrypts all traffic between browser and server. Obtained for free via Let's Encrypt. Required for anything involving logins or passwords.
* **Password hashing** — passwords are never stored as plain text. Handled via `werkzeug.security`, which ships with Flask at no extra cost.
* **Secrets management** — database passwords and secret keys are kept out of the source code, stored instead in a `.env` file via the `python-dotenv` library.
* **Session/login handling** — managed with `Flask-Login`, a small Flask extension for tracking authenticated users safely.

All of the above are either already built into Flask or are small, free, standard, open-source add-ons — no new language or major architecture change required.

---

# Offline Capability

The application should work offline.

Browser storage:

```text
IndexedDB
```

IndexedDB is a database built into the web browser itself — it lives on the user's device, not on the server, and stores data locally so the app keeps working without an internet connection.

When internet returns:

```text
Local changes (IndexedDB)
        ↓
Synchronization
        ↓
Server (PostgreSQL)
        ↓
Other users
```

---

# Deployment

Server:

```text
Linux
```

Example:

```text
Ubuntu Server
```

Containerization:

```text
Docker
```

Docker contains:

```text
Python + Flask application
PostgreSQL database
Configuration
Dependencies
```

Docker is optional during early development/testing — Python, Flask, and PostgreSQL can run directly on a local machine without containerization until deployment to a real, multi-user server is needed.

---

# Development Steps

## Step 1 — Create the Markdown engine

Goal:

```text
Markdown → HTML
```

---

## Step 2 — Create the stable DOM structure

Example:

```html
article
 ├── h1
 ├── h2
 ├── p
 ├── ul
 ├── code
 └── blockquote
```

---

## Step 3 — Create main CSS

Build the permanent Markdown appearance rules.

---

## Step 4 — Create CSS modules

Create:

* themes,
* fonts,
* spacing,
* code styles.

---

## Step 5 — Create JavaScript controls

Buttons modify:

```text
class="..."
```

---

## Step 6 — Create document editing

Allow:

* adding blocks,
* removing blocks,
* moving sections.

---

## Step 7 — Add local storage

Make the application work offline (IndexedDB).

---

## Step 8 — Create Python + Flask backend

Add:

* API (Flask routes),
* user accounts,
* saving,
* loading.

---

## Step 9 — Add PostgreSQL database

Store:

* documents (with `JSONB` for content + style),
* users,
* preferences.

---

## Step 10 — Add synchronization and sharing

Allow:

* multi-device access,
* sharing,
* collaboration.

---

# Final Architecture

```text
                USER

                 |
                 v

        HTML + CSS + JavaScript

                 |
                 v

       Python + Flask Backend

                 |
                 v

         PostgreSQL Database


Offline:
Browser Storage (IndexedDB)

Deployment:
Linux + Docker (optional early on)
```

The main principle:

**Keep the content stable. Keep the design modular. Keep the backend simple. Let the user control the final presentation.**

---

# Cross-Platform & Open Source Notes

## Open source and free

Every technology in this stack — HTML, CSS, JavaScript, Python, Flask, PostgreSQL — is free and open-source:

* **HTML/CSS/JavaScript** are open web standards maintained by W3C/WHATWG, not owned by any single company.
* **Python** is free and open-source, managed by the non-profit Python Software Foundation.
* **Flask** is a free, open-source Python library.
* **PostgreSQL** is fully open-source with no paid tier, developed since 1986, owned by no single company.

## Runs on Linux, Windows, and macOS

This is a **web application**, which is why it runs everywhere without modification:

* It runs inside a browser (Chrome, Firefox, Safari, Edge) — browsers exist on all major operating systems.
* The Python + Flask + PostgreSQL backend runs on a server — Python runs identically on Linux, Windows, or macOS.
* Users never install an OS-specific app; they open a link, on any device.

One single codebase — no need to build separate versions per operating system.

## App Store / Google Play (optional, later)

The same HTML/CSS/JavaScript code can later be submitted to the App Store or Google Play **without rewriting it**:

* A thin, free, open-source wrapper — such as **Capacitor** or **Cordova** — packages the existing web code into a native app shell.
* Core application logic (Markdown engine, theming, document editing) does not change.
* The only cost involved is Apple's standard $99/year developer program fee — a business requirement from Apple, not a coding or licensing cost from this stack.

As a plain web app (accessed via browser), there is no Apple fee and no app store submission required at all — that path is entirely optional.