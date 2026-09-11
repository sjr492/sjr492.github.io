# Sebastian Rivas

Personal portfolio website for Sebastian Rivas, a Computer Science student at the University of Miami.

**Live site:** [sebastianjrivas.page](https://sebastianjrivas.page/)

## Overview

This responsive, single-page portfolio presents professional experience, education, selected projects, campus involvement, and contact information.

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

## Run locally

This project has no build step or package dependencies.

```bash
git clone https://github.com/sjr492/sjr492.github.io.git
cd sjr492.github.io
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser.

## Project structure

```text
.
├── index.html       # Site content, styles, and behavior
├── sebastian-rivas.jpg   # Hero image
├── SR.ico           # Site favicon
└── CNAME            # Custom domain configuration
```

## Updating the site

- Edit content, styles, and client-side behavior in `index.html`.
- Replace `sebastian-rivas.jpg` to update the hero image while keeping the same filename.
- Push changes to the branch configured in GitHub Pages to publish the update.

## Featured source code

- [Connect Four Game](https://github.com/sjr492/Connect-Four-Game): Java coursework with local multiplayer and a rule-based computer opponent.
- [Student Record & Games Application](https://github.com/sjr492/Student-Record-and-Games-Application): Python final project with credit-weighted GPAs, transcript export, and additional console activities.
- [Roman Numerals & Population Calculator](https://github.com/sjr492/Roman-Numerals-Population-Calculator): Python coursework with setup instructions and examples.
- [Portfolio website](https://github.com/sjr492/sjr492.github.io): this repository.

## Console demos

The project cards link to console demos in `demos/`. These are JavaScript adaptations of the original coursework and run in the browser without a backend. Each prompt accepts typed input with Enter; Restart begins a new session.

- `demos/connect-four.html`: Connect Four with the original console board and opponent levels.
- `demos/calculator.html`: Roman numeral/binary conversion and population projections.
- `demos/student-record.html`: the final project's four menu activities. Student transcripts appear in the console and can be downloaded as text files. Entries are held only for the current page session.

The final-project demo preserves the original grade list and course-validation behavior, including skipped invalid course entries. Browser-specific differences are transcript downloads, safe download filenames, and a safe-integer limit on numeric inputs. GPA display uses JavaScript's fixed-decimal rounding, which can differ from Python on exact halfway values.

## Accessibility and verification

The site uses semantic section headings, a skip link, visible keyboard focus, a mobile menu with focus containment and restoration, reduced-motion support, and a separate clipboard status announcement. Content and mobile navigation remain available without JavaScript.

For updates, check desktop and narrow mobile widths, keyboard navigation through the menu, Escape and anchor selection, clipboard success and failure, reduced motion, and JavaScript-disabled rendering. Check that anchor destinations and asset paths resolve before publishing.

Keep project descriptions grounded in completed work. Add a résumé link only when a current PDF is available. Add membership dates or contributions only after verifying them.

## License

No license has been specified for this repository.
