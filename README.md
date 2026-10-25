# Worth It?
A mobile-friendly purchase reflection helper, ready to open in PyCharm.

## Run in PyCharm
1. Extract this ZIP and open the `worth-it` folder as a project in PyCharm.
2. Select a Python 3.10+ interpreter (Settings → Project → Python Interpreter).
3. Right-click `main.py` and choose **Run 'main'**.
4. Open http://127.0.0.1:8000 in your browser. The page is served locally by Python.
5. Stop the app with PyCharm's Stop button.

No pip packages are needed. You can also run `python main.py` in a terminal.
If port 8000 is occupied, stop the other process or change 8000 in main.py and use that port in the URL.

## Files
- `main.py`: standard-library Python server, bound only to your computer.
- `static/index.html`: accessible HTML shell and the decision-rule explanation.
- `static/style.css`: responsive styling, focus states, reduced-motion support.
- `static/app.js`: one-question-per-screen UI and in-memory session answers.
- `static/rules.js`: pure, ordered, explainable recommendation function.
- `tests/rules.test.js`: rule scenarios and exhaustive categorical/boundary checks.

Python serves the interface; standard HTML, CSS, and JavaScript provide the browser UI. All files can be edited in PyCharm. No accounts, APIs, bank connections, database, analytics, external fonts, or remote assets.

## Answers and privacy
Answers are held only in JavaScript memory for the current loaded page. Back/Next and revising preserve them. Reloading, closing the tab, or Start over clears them. No answers are sent to Python or written to disk. The Python server prints ordinary local HTTP access logs, without answers. No sessionStorage, localStorage, or cookies are used.

## Prototype rules (first match wins)
1. Essentials shortfall or uncertainty → Plan or find alternatives.
2. Unconfirmed full cost or seller claims/terms → Check first.
3. Borrowing → Plan or find alternatives, with repayment review.
4. Urgency plus an existing adequate alternative → Plan or find alternatives.
5. Without urgency: an existing adequate alternative, sale motivation, pressure ≥7, or desire ≤3 → Pause.
6. Otherwise → Consider buying, followed by a final cost and essentials check.

Emotional motivation alone never changes the outcome. Desire cannot override missing information or essentials. Urgency suppresses generic pause rules; when concerns remain, the next step includes immediate support, loaners, or assistance. Borrowing prompts review rather than automatic rejection. These thresholds are design choices, not scientifically validated cutoffs.

This is prototype guidance, not a validated financial assessment. Results rely on self-reported answers and do not independently verify affordability or seller claims.

## Verify
With Node.js installed (optional, only for tests): `node tests/rules.test.js`.
For a manual check, complete the flow, use Back to confirm selections remain, try both pause buttons, revise answers, and start over. Use Tab/Shift+Tab, arrow keys for radio groups and sliders, and Enter/Space for buttons. Resize to phone width and enable your operating system's reduced-motion setting to check the static pause illustration.
