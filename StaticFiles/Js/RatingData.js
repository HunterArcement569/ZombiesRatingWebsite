import { GAME_LIST, GAME_RATING_FIELDS } from "./GameData.js";
import { MAP_LIST, MAP_RATING_FIELDS } from "./MapData.js";

export const SCHEMA_VERSION = 1;

const LEGACY_GAME_FIELD_MAP = {
    HealthSystemRating: "healthSystem",
    PerkSystemRating: "perkSystem",
    GunVarietyRating: "gunVariety",
    GraphicsRating: "graphics",
    HudRating: "hud",
    PerkVarietyRating: "perkVariety",
    ConsumableRating: "consumables",
    WeaponSystemRating: "weaponSystem",
    PointSystemRating: "pointSystem"
};

const LEGACY_MAP_FIELD_MAP = {
    HiddenSongRating: "hiddenSong",
    SoundDesignRating: "soundDesign",
    MainQuestRating: "mainQuest",
    SideQuestsRating: "sideQuests",
    AtmosphereRating: "atmosphere",
    MapFlowRating: "mapFlow",
    PlayerProgressionRating: "playerProgression",
    WonderWeaponsRating: "wonderWeapons",
    CastRating: "cast",
    MapLayoutRating: "visualAppeal",
    StorylineRating: "storyline",
    InnovationRating: "innovation",
    MiscellaneousRating: "miscellaneous"
};

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

function createDefaultRatings(fields, item) {
    const ratings = {};
    const applicable = getApplicableFields(fields, item);

    for (const field of applicable) {
        ratings[field.id] = null;
    }

    return ratings;
}

function getAllGameIds() {
    return GAME_LIST.map(game => game.id);
}

function mergeRatings(baseRatings, incomingRatings) {
    const merged = {};

    for (const [itemId, defaultFields] of Object.entries(baseRatings)) {
        const incoming = incomingRatings?.[itemId];
        merged[itemId] = { ...defaultFields };

        if (incoming && typeof incoming === "object") {
            for (const [fieldId, value] of Object.entries(defaultFields)) {
                if (Number.isFinite(incoming[fieldId])) {
                    merged[itemId][fieldId] = Math.max(0, Math.min(100, incoming[fieldId]));
                } else if (incoming[fieldId] === null) {
                    merged[itemId][fieldId] = null;
                }
            }
        }
    }

    return merged;
}

export function createNewRatingData() {
    const gameRatings = {};
    const mapRatings = {};

    for (const game of GAME_LIST) {
        gameRatings[game.id] = createDefaultRatings(GAME_RATING_FIELDS, game);
    }

    for (const map of MAP_LIST) {
        mapRatings[map.id] = createDefaultRatings(MAP_RATING_FIELDS, map);
    }

    return {
        schemaVersion: SCHEMA_VERSION,
        ratingName: "",
        author: "",
        selectedGameIds: [],
        gameRatings,
        mapRatings,
        created: Date.now(),
        lastEdited: Date.now()
    };
}

export function normalizeRatingData(rawData) {
    const base = createNewRatingData();
    if (!rawData || typeof rawData !== "object") {
        return base;
    }

    const incomingSelected = Array.isArray(rawData.selectedGameIds) ? rawData.selectedGameIds : null;
    const legacySelected = Array.isArray(rawData.filters?.game) ? rawData.filters.game : null;
    const selectedGameIds = incomingSelected !== null
        ? [...incomingSelected]
        : (legacySelected !== null ? [...legacySelected] : getAllGameIds());

    const normalized = {
        ...base,
        schemaVersion: SCHEMA_VERSION,
        ratingName: typeof rawData.ratingName === "string" ? rawData.ratingName : (rawData.RatingName || base.ratingName),
        author: typeof rawData.author === "string" ? rawData.author : (rawData.Author || base.author),
        created: Number.isFinite(rawData.created) ? rawData.created : (Number.isFinite(rawData.Created) ? rawData.Created : base.created),
        lastEdited: Number.isFinite(rawData.lastEdited) ? rawData.lastEdited : (Number.isFinite(rawData.LastEdited) ? rawData.LastEdited : base.lastEdited),
        selectedGameIds: selectedGameIds.length ? selectedGameIds : getAllGameIds(),
        gameRatings: mergeRatings(base.gameRatings, rawData.gameRatings || rawData.GameRatings),
        mapRatings: mergeRatings(base.mapRatings, rawData.mapRatings || rawData.MapRatings)
    };

    return normalized;
}

function migrateLegacyRatingData(rawData) {
    const base = createNewRatingData();
    const gameKeyToId = new Map(GAME_LIST.map(game => [`${game.title}__${game.gameCategory}`, game.id]));
    const mapKeyToId = new Map(MAP_LIST.map(map => [`${map.title}__${map.gameId}`, map.id]));

    if (!Array.isArray(rawData.GameRatings) || !Array.isArray(rawData.MapRatings)) {
        return base;
    }

    for (const legacyGame of rawData.GameRatings) {
        const key = `${legacyGame.Name}__${legacyGame.Category}`;
        const gameId = gameKeyToId.get(key);
        if (!gameId) {
            continue;
        }

        const target = base.gameRatings[gameId];
        for (const [legacyKey, fieldId] of Object.entries(LEGACY_GAME_FIELD_MAP)) {
            if (Number.isFinite(legacyGame[legacyKey])) {
                target[fieldId] = Math.max(0, Math.min(100, legacyGame[legacyKey]));
            }
        }
    }

    for (const legacyMap of rawData.MapRatings) {
        const gameKey = `${legacyMap.GameName}__${legacyMap.GameCategory}`;
        const gameId = gameKeyToId.get(gameKey);
        if (!gameId) {
            continue;
        }

        const mapKey = `${legacyMap.Name}__${gameId}`;
        const mapId = mapKeyToId.get(mapKey);
        if (!mapId) {
            continue;
        }

        const target = base.mapRatings[mapId];
        for (const [legacyKey, fieldId] of Object.entries(LEGACY_MAP_FIELD_MAP)) {
            if (Number.isFinite(legacyMap[legacyKey])) {
                target[fieldId] = Math.max(0, Math.min(100, legacyMap[legacyKey]));
            }
        }
    }

    return {
        ...base,
        ratingName: rawData.RatingName || base.ratingName,
        author: rawData.Author || base.author,
        selectedGameIds: getAllGameIds(),
        created: Number.isFinite(rawData.Created) ? rawData.Created : base.created,
        lastEdited: Number.isFinite(rawData.LastEdited) ? rawData.LastEdited : base.lastEdited
    };
}

export function migrateRatingData(rawData) {
    if (!rawData || typeof rawData !== "object") {
        return { ok: false, error: "Rating data is not a valid object." };
    }

    if (rawData.schemaVersion === SCHEMA_VERSION && rawData.gameRatings && rawData.mapRatings) {
        return { ok: true, data: normalizeRatingData(rawData) };
    }

    if (Array.isArray(rawData.GameRatings) && Array.isArray(rawData.MapRatings)) {
        return { ok: true, data: migrateLegacyRatingData(rawData) };
    }

    return { ok: false, error: "Unrecognized rating data format." };
}
