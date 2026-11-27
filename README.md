# HCM/MIS 4030: Healthcare Information Systems

Student-facing course site (Iowa State cardinal and gold), hosted with GitHub Pages at https://bradtrinkle.github.io/hcm4030-course/. **Everything in this repository is public.**

**Never commit here:** grader instructions, answer keys, student work, or grades. Those live in the private `hcm4030-grading` repository.

## How the site works

- Plain HTML, CSS, and JavaScript. No build step; GitHub Pages serves it as is (`.nojekyll`).
- Each module is one page with an eight-step walkthrough. Steps unlock in order; answers and progress are saved only in the student's own browser (plus an optional save file on their computer).
- The page builds the Word submission from what students typed, in fixed lettered sections that match the rubric. Students upload it in Canvas.
- All AI work happens in Microsoft Copilot (Microsoft 365 Personal, student offer). Students write their own prompts; no copy-ready prompts.

## Layout

| Path | Contents |
| --- | --- |
| `index.html` | Course home and journey |
| `start-here.html` | Week 1 setup: welcome video, syllabus and Canvas, Microsoft 365 plan, AI coach, automatic saving |
| `module-1.html` to `module-12.html` | Module walkthroughs (Modules 1 to 11 built so far) |
| `assets/config.js` | **Edit this:** video links and Canvas submission links per module (the Canvas integration) |
| `assets/common.js` | Shared behavior: quick-check hashing, auto-save, backup, copy buttons, reviewer mode |
| `assets/module.js` | Shared module engine: steps, gating, saving, and the Word submission builder |
| `assets/style.css` | Iowa State colors and layout |
| `downloads/` | Rubrics and the AI coach instructions |
| `data/module-N/` | Simulated data (all fictional) |

Reviewer mode: add `?review=1` to a module address (or `?review=all` on any page) and enter the reviewer password. It is a speed bump, not security.

All people, organizations, and data are fictional. Character videos use AI-generated avatars.
