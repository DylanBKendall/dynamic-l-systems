# Dynamic L-Systems (p5.js)

An interactive, real-time visualization of **L-systems (Lindenmayer systems)** built with **p5.js**. This project supports dynamic changes to parameters (rules, angle, step length, iterations), producing evolving procedural structures rather than a single static generation.

## Features

* Real-time L-system generation and rendering
* Dynamic parameter changes (rules, angle, length, iteration depth)
* Smooth visual updates using p5.js
* Clean separation between grammar logic and rendering logic
* Designed for experimentation and extension

## Tech Stack

* JavaScript
* p5.js
* HTML / CSS

Libraries are loaded via CDN in `index.html`. 

## Project Structure

```
.
├── index.html        # Entry point
├── css/
│   └── style.css     # Minimal page & canvas styling
├── js/
│   └── sketch.js     # L-system logic + rendering
└── README.md
```

> Note: `index.html` expects `css/style.css` and `js/sketch.js`. 

## How It Works

An **L-system** consists of:

* **Axiom**: starting string
* **Production rules**: rewrite rules applied each iteration
* **Iterations**: how many times rewriting occurs
* **Turtle interpretation**: how symbols map to drawing (turn, draw forward, push/pop)

Rendering uses turtle-graphics ideas:

* Move forward to draw segments
* Rotate by a fixed angle
* Push/pop state to create branching

## Running Locally

No build step required.

### Option 1: Open Directly

Open `index.html` in your browser.

### Option 2: Local Server (Recommended)

Some browsers restrict file access (especially for assets). Run a simple local server:

```bash
python3 -m http.server
```

Then visit:

```
http://localhost:8000
```

## Controls

Controls and interaction (keyboard/mouse/dynamic behavior) are defined in `js/sketch.js`. If you want, paste your control section here once you confirm what inputs you implemented.

## Future Improvements

* UI sliders for live parameter control
* Preset saving/loading
* Color rules tied to grammar symbols
* Export to SVG or image sequence
* Performance optimizations for high iteration counts
