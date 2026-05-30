import { GAME_LIST, GAME_RATING_FIELDS, getGameDisplayName } from "./GameData.js";
import { MAP_LIST, MAP_RATING_FIELDS } from "./MapData.js";
import { createNewRatingData, migrateRatingData } from "./RatingData.js";

const MODES = {
    CREATE: "create",
    EDIT: "edit",
    VIEW: "view"
};

const STATES = {
    SETUP: "setup",
    RATE_GAMES: "rateGames",
    RATE_MAPS: "rateMaps",
    RESULTS: "results"
};

const appState = {
    mode: MODES.CREATE,
    state: STATES.SETUP,
    ratingData: createNewRatingData(),
    lastImportedRaw: null
};

function resetRatingScroll() {
    const main = document.getElementById("RatingMainContainer");

    if (main) {
        main.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }

    window.scrollTo(0, 0);
}

function getModeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const modeToken = params.get("Function");

    if (modeToken === "A" || modeToken === "create") {
        return MODES.CREATE;
    }

    if (modeToken === "B" || modeToken === "edit") {
        return MODES.EDIT;
    }

    if (modeToken === "C" || modeToken === "view") {
        return MODES.VIEW;
    }

    return MODES.CREATE;
}

function getContainer() {
    return document.getElementById("DynamicContent");
}

function setNavButtons({ showExport, showImport }) {
    const exportBtn = document.getElementById("ExportRatingBtn");
    const importBtn = document.getElementById("ImportRatingBtn");

    if (exportBtn) {
        exportBtn.style.display = showExport ? "inline-block" : "none";
    }

    if (importBtn) {
        importBtn.style.display = showImport ? "inline-block" : "none";
    }
}

function clearContainer() {
    const container = getContainer();
    if (container) {
        container.innerHTML = "";
    }

    return container;
}

function getApplicableFields(fields, item) {
    return fields.filter(field => {
        if (!field.requires) {
            return true;
        }

        if (field.requires.key === "hasHiddenSong") {
            return item?.hasHiddenSong !== false;
        }

        return item?.[field.requires.key] === field.requires.value;
    });
}

function createSectionHeader(text, subtitle) {
    const wrapper = document.createElement("div");
    if (text) {
        const title = document.createElement("h2");
        title.textContent = text;
        wrapper.appendChild(title);
    }

    if (subtitle) {
        const meta = document.createElement("p");
        meta.textContent = subtitle;
        wrapper.appendChild(meta);
    }

    return wrapper;
}

function createStepHeader(text) {
    const header = document.createElement("h2");
    header.textContent = text;
    header.className = "step-header";
    return header;
}

function renderIncludedCountInfo(container) {
    const info = document.createElement("div");
    info.className = "included-count-info";
    info.id = "IncludedCountInfo";

    container.appendChild(info);
    updateIncludedCountInfo();

    return info;
}

function updateIncludedCountInfo() {
    const info = document.getElementById("IncludedCountInfo");
    if (!info) return;

    const { games, maps } = applyFilters(appState.ratingData);
    info.textContent = `This rating includes ${games.length} games and ${maps.length} maps.`;
}

function createActionRow(buttons) {
    const row = document.createElement("div");
    row.className = "rating-action-row";

    buttons.forEach(({ label, onClick, variant }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.className = variant === "primary" ? "primary-action" : "secondary-action";
        button.addEventListener("click", onClick);
        row.appendChild(button);
    });

    return row;
}

function applyFilters(ratingData) {
    const selectedGameIds = Array.isArray(ratingData.selectedGameIds)
        ? ratingData.selectedGameIds
        : [];
    const selected = new Set(selectedGameIds);

    const filteredGames = GAME_LIST.filter(game => selected.has(game.id));
    const allowedGameIds = new Set(filteredGames.map(game => game.id));
    const filteredMaps = MAP_LIST.filter(map => allowedGameIds.has(map.gameId));

    return { games: filteredGames, maps: filteredMaps };
}

function updateLastEdited() {
    appState.ratingData.lastEdited = Date.now();
}

function downloadRating(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${data.ratingName || "ZombiesRating"}.json`;
    anchor.click();
}

function handleImport(onSuccess) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = () => {
        const file = input.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const raw = JSON.parse(event.target.result);
                const migrated = migrateRatingData(raw);
                if (!migrated.ok) {
                    alert(migrated.error || "Unable to import rating data.");
                    return;
                }

                appState.ratingData = migrated.data;
                appState.lastImportedRaw = raw;
                onSuccess();
            } catch (error) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

function renderSetupScreen() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 1 of 4 — Rating Setup"));

    container.appendChild(createSectionHeader("Rating Setup", "Select the games you want to include."));

    const metaWrapper = document.createElement("div");
    metaWrapper.className = "form-column";
    metaWrapper.innerHTML = `
        <label>Rating Name: <input id="ratingNameInput" value="${appState.ratingData.ratingName}"></label>
        <label>Author: <input id="ratingAuthorInput" value="${appState.ratingData.author}"></label>
    `;
    container.appendChild(metaWrapper);

    const gameSelection = document.createElement("div");
    gameSelection.appendChild(createSectionHeader("Game Selection", "Choose at least one game."));

    const list = document.createElement("div");
    list.className = "game-selection-list";

    const selectedIds = new Set(appState.ratingData.selectedGameIds || []);
    GAME_LIST.forEach(game => {
        const label = document.createElement("label");
        label.className = "game-selection-row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = selectedIds.has(game.id);
        checkbox.value = game.id;
        checkbox.addEventListener("change", () => {
            const current = new Set(appState.ratingData.selectedGameIds || []);

            if (checkbox.checked) {
                current.add(game.id);
            } else {
                current.delete(game.id);
            }

            appState.ratingData.selectedGameIds = Array.from(current);
            updateLastEdited();
            updateIncludedCountInfo();
        });

        const text = document.createElement("span");
        text.textContent = getGameDisplayName(game);

        label.appendChild(checkbox);
        label.appendChild(text);
        list.appendChild(label);
    });

    gameSelection.appendChild(list);
    container.appendChild(gameSelection);

    const error = document.createElement("div");
    error.className = "inline-error";
    container.appendChild(error);

    const nav = createActionRow([
        {
            label: "Continue to Game Ratings",
            variant: "primary",
            onClick: () => {
                appState.ratingData.ratingName = document.getElementById("ratingNameInput").value.trim();
                appState.ratingData.author = document.getElementById("ratingAuthorInput").value.trim();
                updateLastEdited();

                if (!appState.ratingData.selectedGameIds || appState.ratingData.selectedGameIds.length === 0) {
                    error.textContent = "Select at least one game before continuing.";
                    return;
                }

                const filtered = applyFilters(appState.ratingData);
                if (filtered.maps.length === 0) {
                    error.textContent = "The selected games do not include any maps.";
                    return;
                }

                error.textContent = "";
                appState.state = STATES.RATE_GAMES;
                renderCurrentState();
            }
        },
        {
            label: "Reset Selection",
            variant: "secondary",
            onClick: () => {
                appState.ratingData.selectedGameIds = [];
                updateLastEdited();
                error.textContent = "";
                renderCurrentState();
            }
        }
    ]);

    container.appendChild(nav);
}

function renderRatingList({ title, subtitle, items, fields, ratings, onChange, groupByGame }) {
    const section = document.createElement("div");
    section.appendChild(createSectionHeader(title, subtitle));

    if (groupByGame) {
        const games = items.reduce((acc, map) => {
            acc[map.gameId] = acc[map.gameId] || [];
            acc[map.gameId].push(map);
            return acc;
        }, {});

        for (const [gameId, maps] of Object.entries(games)) {
            const game = GAME_LIST.find(item => item.id === gameId);
            const groupTitle = document.createElement("h3");
            groupTitle.textContent = getGameDisplayName(game);
            section.appendChild(groupTitle);

            maps.forEach(map => {
                section.appendChild(renderRatingCard(map, fields, ratings[map.id], onChange));
            });
        }
    } else {
        items.forEach(item => {
            section.appendChild(renderRatingCard(item, fields, ratings[item.id], onChange));
        });
    }

    return section;
}

function renderRatingCard(item, fields, ratingValues, onChange) {
    const card = document.createElement("div");
    card.className = "rating-card";
    const header = document.createElement("h4");
    header.textContent = item.gameId ? item.title : getGameDisplayName(item);
    card.appendChild(header);

    const fieldList = document.createElement("div");
    fieldList.className = "rating-field-list";
    const applicable = getApplicableFields(fields, item);

    applicable.forEach(field => {
        const label = document.createElement("label");
        label.textContent = `${field.label}: `;

        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "100";
        input.value = Number.isFinite(ratingValues[field.id]) ? ratingValues[field.id] : "";
        input.addEventListener("input", () => {
            if (input.value.trim() === "") {
                ratingValues[field.id] = null;
                updateLastEdited();
                onChange();
                return;
            }

            const value = Math.max(0, Math.min(100, Number(input.value)));
            ratingValues[field.id] = Number.isFinite(value) ? value : null;
            input.value = Number.isFinite(ratingValues[field.id]) ? ratingValues[field.id] : "";
            updateLastEdited();
            onChange();
        });

        label.appendChild(input);
        fieldList.appendChild(label);
    });

    card.appendChild(fieldList);

    return card;
}

function renderGameRatings() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 2 of 4 — Rate Games"));

    const { games } = applyFilters(appState.ratingData);
    container.appendChild(createSectionHeader("Rate Games", `${games.length} games`));

    const topNav = createActionRow([
        {
            label: "Back to Setup",
            variant: "secondary",
            onClick: () => {
                appState.state = STATES.SETUP;
                renderCurrentState();
            }
        },
        {
            label: "Continue to Map Ratings",
            variant: "primary",
            onClick: () => {
                appState.state = STATES.RATE_MAPS;
                renderCurrentState();
            }
        }
    ]);
    container.appendChild(topNav);

    const section = renderRatingList({
        title: "",
        subtitle: "",
        items: games,
        fields: GAME_RATING_FIELDS,
        ratings: appState.ratingData.gameRatings,
        onChange: () => {},
        groupByGame: false
    });

    container.appendChild(section);

    const bottomNav = createActionRow([
        {
            label: "Back to Setup",
            variant: "secondary",
            onClick: () => {
                appState.state = STATES.SETUP;
                renderCurrentState();
            }
        },
        {
            label: "Continue to Map Ratings",
            variant: "primary",
            onClick: () => {
                appState.state = STATES.RATE_MAPS;
                renderCurrentState();
            }
        }
    ]);
    container.appendChild(bottomNav);
}

function renderMapRatings() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 3 of 4 — Rate Maps"));

    const { maps } = applyFilters(appState.ratingData);
    container.appendChild(createSectionHeader("Rate Maps", `${maps.length} maps`));

    const topNav = createActionRow([
        {
            label: "Back to Game Ratings",
            variant: "secondary",
            onClick: () => {
                appState.state = STATES.RATE_GAMES;
                renderCurrentState();
            }
        },
        {
            label: "View Results",
            variant: "primary",
            onClick: () => {
                appState.state = STATES.RESULTS;
                renderCurrentState();
            }
        }
    ]);
    container.appendChild(topNav);

    const section = renderRatingList({
        title: "",
        subtitle: "",
        items: maps,
        fields: MAP_RATING_FIELDS,
        ratings: appState.ratingData.mapRatings,
        onChange: () => {},
        groupByGame: true
    });

    container.appendChild(section);

    const bottomNav = createActionRow([
        {
            label: "Back to Game Ratings",
            variant: "secondary",
            onClick: () => {
                appState.state = STATES.RATE_GAMES;
                renderCurrentState();
            }
        },
        {
            label: "View Results",
            variant: "primary",
            onClick: () => {
                appState.state = STATES.RESULTS;
                renderCurrentState();
            }
        }
    ]);
    container.appendChild(bottomNav);
}

function isFullyRated(fields, item, ratingValues) {
    return getApplicableFields(fields, item).every(field =>
        Number.isFinite(ratingValues?.[field.id])
    );
}

function calculateFinalScores(ratingData) {
    const results = [];
    const gameScoreCache = new Map();

    for (const game of GAME_LIST) {
        const fields = getApplicableFields(GAME_RATING_FIELDS, game);
        const ratings = ratingData.gameRatings[game.id];
        if (!isFullyRated(GAME_RATING_FIELDS, game, ratings)) {
            gameScoreCache.set(game.id, null);
            continue;
        }

        const total = fields.reduce((sum, field) => sum + (ratings[field.id] || 0), 0);
        const max = fields.length * 100;
        const percent = max ? total / max : 0;
        gameScoreCache.set(game.id, percent);
    }

    for (const map of MAP_LIST) {
        const fields = getApplicableFields(MAP_RATING_FIELDS, map);
        const ratings = ratingData.mapRatings[map.id];
        const gamePercent = gameScoreCache.get(map.gameId);
        let finalScore = null;

        if (gamePercent !== null && isFullyRated(MAP_RATING_FIELDS, map, ratings)) {
            const total = fields.reduce((sum, field) => sum + (ratings[field.id] || 0), 0);
            const max = fields.length * 100;
            const mapPercent = max ? total / max : 0;
            finalScore = mapPercent * gamePercent * 100;
        }

        results.push({
            mapId: map.id,
            mapName: map.title,
            gameId: map.gameId,
            score: finalScore
        });
    }

    return results;
}

function getTier(score) {
    if (!Number.isFinite(score)) return "Unrated";
    if (score >= 90) return "S";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
}

function renderResults() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 4 of 4 — Results"));

    const { games, maps } = applyFilters(appState.ratingData);
    const allowedGameIds = new Set(games.map(game => game.id));
    const allowedMapIds = new Set(maps.map(map => map.id));

    const scores = calculateFinalScores(appState.ratingData)
        .filter(entry => allowedGameIds.has(entry.gameId) && allowedMapIds.has(entry.mapId))
        .map(entry => {
            const game = GAME_LIST.find(item => item.id === entry.gameId);
            return {
                ...entry,
                gameName: getGameDisplayName(game),
                tier: getTier(entry.score)
            };
        });

    const tiers = { S: [], A: [], B: [], C: [], D: [], F: [], Unrated: [] };
    scores.forEach(entry => tiers[entry.tier].push(entry));

    container.appendChild(createSectionHeader("Results", `${scores.length} maps rated`));

    const tierList = document.createElement("div");
    tierList.className = "tier-list";

    const tierOrder = ["S", "A", "B", "C", "D", "F", "Unrated"];
    tierOrder.forEach(tier => {
        const entries = tiers[tier];
        if (!entries.length) {
            return;
        }

        const section = document.createElement("div");
        section.className = `tier-section tier-${tier}`;

        const header = document.createElement("div");
        header.className = "tier-header";

        const label = document.createElement("div");
        label.className = "tier-label";
        label.textContent = tier === "Unrated" ? "Unrated" : `Tier ${tier}`;

        const count = document.createElement("div");
        count.className = "tier-count";
        count.textContent = `${entries.length} maps`;

        header.appendChild(label);
        header.appendChild(count);
        section.appendChild(header);

        const items = document.createElement("div");
        items.className = "tier-items";

        entries
            .sort((a, b) => {
                const scoreDiff = (b.score ?? -1) - (a.score ?? -1);
                return scoreDiff || a.mapName.localeCompare(b.mapName);
            })
            .forEach(entry => {
                const item = document.createElement("div");
                item.className = "tier-item";

                const name = document.createElement("div");
                name.textContent = `${entry.mapName} (${entry.gameName})`;

                const score = document.createElement("div");
                score.className = "tier-score";
                score.textContent = Number.isFinite(entry.score) ? entry.score.toFixed(1) : "Unrated";

                item.appendChild(name);
                item.appendChild(score);
                items.appendChild(item);
            });

        section.appendChild(items);
        tierList.appendChild(section);
    });

    container.appendChild(tierList);

    if (appState.mode !== MODES.VIEW) {
        const nav = document.createElement("div");
        nav.className = "results-action-row";
        const backBtn = document.createElement("button");
        backBtn.className = "page-action-button";
        backBtn.textContent = "Back to Maps";
        backBtn.addEventListener("click", () => {
            appState.state = STATES.RATE_MAPS;
            renderCurrentState();
        });

        nav.appendChild(backBtn);
        container.appendChild(nav);
    }
}

function renderViewPrompt() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 4 of 4 — Results"));

    const message = document.createElement("div");
    message.innerHTML = "<h2>Import a rating JSON file to view the tier list.</h2>";
    container.appendChild(message);
}

function renderEditPrompt() {
    const container = clearContainer();
    if (!container) {
        return;
    }

    renderIncludedCountInfo(container);
    container.appendChild(createStepHeader("Step 1 of 4 — Rating Setup"));

    const message = document.createElement("div");
    message.innerHTML = "<h2>Import a rating JSON file to edit.</h2>";
    container.appendChild(message);
}

function renderCurrentState()
{
    if (appState.state === STATES.SETUP)
    {
        renderSetupScreen();
    }
    else if (appState.state === STATES.RATE_GAMES)
    {
        renderGameRatings();
    }
    else if (appState.state === STATES.RATE_MAPS)
    {
        renderMapRatings();
    }
    else if (appState.state === STATES.RESULTS)
    {
        renderResults();
    }

    requestAnimationFrame(resetRatingScroll);
}

function initCreateMode() {
    setNavButtons({ showExport: true, showImport: false });

    const exportBtn = document.getElementById("ExportRatingBtn");
    if (exportBtn) {
        exportBtn.onclick = () => downloadRating(appState.ratingData);
    }

    renderSetupScreen();
}

function initEditMode() {
    setNavButtons({ showExport: true, showImport: true });

    const exportBtn = document.getElementById("ExportRatingBtn");
    if (exportBtn) {
        exportBtn.onclick = () => downloadRating(appState.ratingData);
    }

    const importBtn = document.getElementById("ImportRatingBtn");
    if (importBtn) {
        importBtn.onclick = () => handleImport(() => {
            appState.state = STATES.SETUP;
            renderCurrentState();
        });
    }

    renderEditPrompt();
}

function initViewMode() {
    setNavButtons({ showExport: true, showImport: true });

    const exportBtn = document.getElementById("ExportRatingBtn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            if (appState.lastImportedRaw) {
                downloadRating(appState.lastImportedRaw);
                return;
            }

            alert("No rating data loaded to export. Please import a rating JSON file first.");
        };
    }

    const importBtn = document.getElementById("ImportRatingBtn");
    if (importBtn) {
        importBtn.onclick = () => handleImport(() => {
            appState.state = STATES.RESULTS;
            renderCurrentState();
        });
    }

    renderViewPrompt();
}

document.addEventListener("DOMContentLoaded", () => {
    appState.mode = getModeFromQuery();

    if (appState.mode === MODES.EDIT) {
        initEditMode();
        return;
    }

    if (appState.mode === MODES.VIEW) {
        initViewMode();
        return;
    }

    initCreateMode();
});
