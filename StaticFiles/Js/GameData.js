export const GAME_RATING_FIELDS = [
    { id: "healthSystem", label: "Health System" },
    { id: "perkSystem", label: "Perk System" },
    { id: "perkVariety", label: "Perk Variety" },
    { id: "gunVariety", label: "Gun Variety" },
    { id: "graphics", label: "Graphics" },
    { id: "hud", label: "HUD" },
    { id: "consumables", label: "Consumables", requires: { key: "hasConsumables", value: true } },
    { id: "weaponSystem", label: "Weapon System" },
    { id: "pointSystem", label: "Point System" }
];

export const GAME_LIST = [
    {
        id: "waw",
        title: "Call of Duty: World at War",
        studio: "Treyarch",
        releaseYear: 2008,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Classic"
    },
    {
        id: "bo1",
        title: "Call of Duty: Black Ops",
        studio: "Treyarch",
        releaseYear: 2010,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Classic"
    },
    {
        id: "bo2",
        title: "Call of Duty: Black Ops II",
        studio: "Treyarch",
        releaseYear: 2012,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Classic"
    },
    {
        id: "aw",
        title: "Call of Duty: Advanced Warfare",
        studio: "Sledgehammer Games",
        releaseYear: 2014,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Advanced"
    },
    {
        id: "bo3",
        title: "Call of Duty: Black Ops III",
        studio: "Treyarch",
        releaseYear: 2015,
        hasConsumables: true,
        gameCategory: "Standard",
        era: "Advanced"
    },
    {
        id: "iw",
        title: "Call of Duty: Infinite Warfare",
        studio: "Infinity Ward",
        releaseYear: 2016,
        hasConsumables: true,
        gameCategory: "Standard",
        era: "Advanced"
    },
    {
        id: "ww2",
        title: "Call of Duty: WWII",
        studio: "Sledgehammer Games",
        releaseYear: 2017,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Advanced"
    },
    {
        id: "bo4",
        title: "Call of Duty: Black Ops 4",
        studio: "Treyarch",
        releaseYear: 2018,
        hasConsumables: true,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "cw",
        title: "Call of Duty: Black Ops Cold War",
        studio: "Treyarch",
        releaseYear: 2020,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "vg",
        title: "Call of Duty: Vanguard",
        studio: "Sledgehammer Games",
        releaseYear: 2021,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "mw3",
        title: "Call of Duty: Modern Warfare III",
        studio: "Sledgehammer Games",
        releaseYear: 2023,
        hasConsumables: false,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "bo6",
        title: "Call of Duty: Black Ops 6",
        studio: "Treyarch",
        releaseYear: 2024,
        hasConsumables: true,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "bo7_standard",
        title: "Call of Duty: Black Ops 7",
        studio: "Treyarch",
        releaseYear: 2025,
        hasConsumables: true,
        gameCategory: "Standard",
        era: "Modern"
    },
    {
        id: "bo7_cursed",
        title: "Call of Duty: Black Ops 7",
        studio: "Treyarch",
        releaseYear: 2025,
        hasConsumables: true,
        gameCategory: "Cursed",
        era: "Modern"
    }
];

export function getGameDisplayName(game) {
    if (!game) {
        return "Unknown Game";
    }

    if (game.id === "bo7_standard") {
        return "Call of Duty: Black Ops 7 — Standard Mode";
    }

    if (game.id === "bo7_cursed") {
        return "Call of Duty: Black Ops 7 — Cursed Mode";
    }

    return game.title;
}
