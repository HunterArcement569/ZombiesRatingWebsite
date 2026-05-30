# FOLLOWUP_3_POLISH_AND_USABILITY.md — ZombiesRatingWebsite UI Polish Fixes

## Purpose

This follow-up contains targeted polish and usability fixes found after the latest test pass.

Use this file together with:

```txt
STAGES.md
FOLLOWUP_AFTER_TESTING.md
FOLLOWUP_2_REQUESTED_CHANGES.md
```

This is not a full architecture rewrite. These are focused UI/UX corrections.

---

# 1. Game Selection Checkboxes Need Better Alignment

## Problem

On the game selection screen, the checkboxes are vertically offset from the game labels.

This makes it harder to visually trace which checkbox belongs to which game.

## Required Fix

Each checkbox and its game label should be horizontally aligned in the same row.

The checkbox should be vertically centered beside the label text.

## Required CSS

```css
.game-selection-list {
    display: flex;
    flex-direction: column;
    gap: var(--sp-sm);
}

.game-selection-row,
.checkbox-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--sp-sm);
    width: 100%;
    line-height: 1.3;
}

.game-selection-row input[type="checkbox"],
.checkbox-row input[type="checkbox"] {
    margin: 0;
    flex: 0 0 auto;
    transform: scale(1.15);
}

.game-selection-row span,
.checkbox-row span {
    display: inline-block;
}
```

## Required HTML/DOM Structure

Do not place the checkbox above the text.

Preferred generated structure:

```js
const label = document.createElement("label");
label.className = "game-selection-row";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";

const text = document.createElement("span");
text.textContent = getGameDisplayName(game);

label.appendChild(checkbox);
label.appendChild(text);
```

Avoid this structure:

```html
<label>
    Game Name
    <input type="checkbox">
</label>
```

because it can visually misalign depending on inherited form styling.

---

# 2. Back To Maps Button On Tier List Page Needs Styling

## Problem

The `Back to Maps` button on the tier list/results page works, but it does not visually match the rest of the page and is not centered well.

## Required Fix

The button should use the same red/black page style as the other major action buttons and should be centered.

## Required CSS

```css
.results-action-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--sp-md);
    margin: var(--sp-lg) auto;
    width: 100%;
}

.results-action-row button,
.page-action-button {
    background-color: #bb2222;
    color: white;
    border: none;
    border-radius: var(--rd-sm);
    padding: var(--sp-sm) var(--sp-lg);
    font-family: cursive;
    font-size: var(--fs-md);
    cursor: pointer;
    transition: background-color 0.25s, transform 0.25s;
}

.results-action-row button:hover,
.page-action-button:hover {
    background-color: #992222;
    transform: skewX(-15deg) scale(110%);
}
```

## Required DOM Structure

On the results/tier page:

```js
const actionRow = document.createElement("div");
actionRow.className = "results-action-row";

const backBtn = document.createElement("button");
backBtn.className = "page-action-button";
backBtn.textContent = "Back to Maps";

actionRow.appendChild(backBtn);
container.appendChild(actionRow);
```

---

# 3. RatingPage Footer Should More Closely Match Home Page Footer

## Problem

The RatingPage footer was updated, but it still does not feel close enough to the Home Page footer.

## Required Fix

Make the RatingPage footer visually and structurally closer to the Home Page footer.

It should include the same core links/assets:

```txt
Return to Top
YouTube logo link
LinkedIn logo link
Channel/website logo link
Copyright text
```

## Required Notes

Use the same image paths already used by the Home Page footer:

```txt
../StaticFiles/Images/YouTube Logo.jpg
../StaticFiles/Images/LinkedIn Logo.jpg
../StaticFiles/Images/ChannelLogo.png
```

Adjust paths if the project structure differs.

The footer should use the same red/black/white visual language as the Home Page.

## Suggested CSS

```css
#RatingFooter {
    width: 100%;
    background-color: black;
    color: white;
    border-top: 4px solid #bb2222;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
    align-items: center;
    justify-items: center;
    gap: var(--sp-md);
    padding: var(--sp-sm) var(--sp-md);
}

#RatingFooter .footerHomeLink {
    color: white;
    text-decoration: none;
    transition: color 0.25s, transform 0.25s;
}

#RatingFooter .footerHomeLink:hover {
    color: #bb2222;
    transform: skewX(-15deg) scale(110%);
}

#RatingFooter .footer-logo-link {
    width: 3rem;
    height: 3rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 2px solid white;
    border-radius: 25%;
}
```

## Responsive Requirement

On small screens, the footer may wrap or use a compact two-row layout, but it should not overlap the scrollable content.

---

# 4. Black Ops 7 Must Be Explicit On Game Rating Page

## Problem

Black Ops 7 now displays correctly on map rating/grouping, but not on the game rating screen.

The game rating page still risks showing two entries that both look like:

```txt
Call of Duty: Black Ops 7
```

## Required Fix

The game rating page must use `getGameDisplayName(game)`.

Do not use:

```js
game.title
```

for game card headers.

Use:

```js
getGameDisplayName(game)
```

## Required Places To Check

Search `RatingPageLogic.js` for:

```txt
game.title
```

Any game-facing heading, card title, option label, or result label should use the helper.

The map title can still use:

```js
map.title
```

but the game name attached to it should use the helper.

---

# 5. Debug/Info Tab Should Only Show Included Counts

## Problem

The current debug tab was useful during development, but it should not expose internal mode/state details to users.

## Required Fix

Keep only user-safe count information.

Remove display of:

```txt
Mode
State
raw debug labels
developer-only wording
```

Keep display of:

```txt
Games Included: X
Maps Included: Y
```

## Suggested Copy

```txt
Games Included: 3
Maps Included: 24
```

or:

```txt
This rating includes 3 games and 24 maps.
```

## Suggested Function

```js
function renderIncludedCountInfo(ratingData) {
    const { games, maps } = applyFilters(ratingData);

    const info = document.createElement("div");
    info.className = "included-count-info";
    info.textContent = `This rating includes ${games.length} games and ${maps.length} maps.`;

    return info;
}
```

## Suggested CSS

```css
.included-count-info {
    width: 100%;
    text-align: center;
    background: #222222;
    color: white;
    border-left: 5px solid #bb2222;
    border-radius: var(--rd-sm);
    padding: var(--sp-sm) var(--sp-md);
    margin-bottom: var(--sp-md);
    font-size: var(--fs-sm);
}
```

This is allowed to remain visible for users.

---

# 6. Regression Test Checklist

After applying this follow-up, manually test:

## Game Selection

- Checkboxes line up with labels.
- Long game names still align cleanly.
- Black Ops 7 Standard and Cursed are readable and distinguishable.

## Game Rating

- Black Ops 7 Standard says `Call of Duty: Black Ops 7 — Standard Mode`.
- Black Ops 7 Cursed says `Call of Duty: Black Ops 7 — Cursed Mode`.
- No duplicate-looking Black Ops 7 cards remain.

## Results Page

- Back to Maps button is centered.
- Back to Maps button uses the red/black page style.
- Tier list is still readable.

## Footer

- RatingPage footer visually resembles Home Page footer.
- Footer includes logo links.
- Footer stays on screen without covering important content.
- Footer works on smaller widths.

## Info Tab

- It only shows included game/map counts.
- It does not show `mode`, `state`, or internal debug details.

---

# Files Most Likely Requiring Changes

```txt
StaticFiles/Js/RatingPageLogic.js
StaticFiles/Css/RatingPageStyles.css
Pages/RatingPage.html
```

Possibly:

```txt
StaticFiles/Js/GameData.js
```

only if `getGameDisplayName` is missing or incomplete.

---

# Acceptance Criteria

This follow-up is complete when:

- game selection checkboxes are visually aligned with their labels
- the results page Back to Maps button is centered and styled consistently
- RatingPage footer closely resembles the Home Page footer
- Black Ops 7 Standard/Cursed is explicit on the game rating page
- the former debug tab only shows included game/map counts
- no development-only state/mode text remains visible
