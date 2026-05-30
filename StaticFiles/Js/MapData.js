export const MAP_RATING_FIELDS = [
    { id: "hiddenSong", label: "Hidden Song", requires: { key: "hasHiddenSong", value: true } },
    { id: "soundDesign", label: "Sound Design" },
    { id: "mainQuest", label: "Main Quest", requires: { key: "hasMainQuest", value: true } },
    { id: "sideQuests", label: "Side Quests", requires: { key: "hasSideQuests", value: true } },
    { id: "atmosphere", label: "Atmosphere" },
    { id: "mapFlow", label: "Map Flow" },
    { id: "playerProgression", label: "Player Progression" },
    { id: "perkVariety", label: "Perk Variety" },
    { id: "wonderWeapons", label: "Wonder Weapons" },
    { id: "cast", label: "Cast" },
    { id: "visualAppeal", label: "Visual Appeal" },
    { id: "storyline", label: "Storyline" },
    { id: "innovation", label: "Innovation" },
    { id: "miscellaneous", label: "Miscellaneous" }
];

export const MAP_LIST = [
    // WORLD AT WAR
    { id: "nacht_waw", gameId: "waw", title: "Nacht der Untoten", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "verruckt_waw", gameId: "waw", title: "Verrückt", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "shi_no_numa_waw", gameId: "waw", title: "Shi No Numa", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "der_riese_waw", gameId: "waw", title: "Der Riese", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },

    // BLACK OPS
    { id: "kino_der_toten_bo1", gameId: "bo1", title: "Kino der Toten", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "five_bo1", gameId: "bo1", title: "Five", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "ascension_bo1", gameId: "bo1", title: "Ascension", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "call_of_the_dead_bo1", gameId: "bo1", title: "Call of the Dead", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "shangri_la_bo1", gameId: "bo1", title: "Shangri-La", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "moon_bo1", gameId: "bo1", title: "Moon", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "nacht_bo1", gameId: "bo1", title: "Nacht der Untoten", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "verruckt_bo1", gameId: "bo1", title: "Verrückt", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "shi_no_numa_bo1", gameId: "bo1", title: "Shi No Numa", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "der_riese_bo1", gameId: "bo1", title: "Der Riese", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },

    // BLACK OPS II
    { id: "tranzit_bo2", gameId: "bo2", title: "Tranzit", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "bus_depot_bo2", gameId: "bo2", title: "Bus Depot", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "farm_bo2", gameId: "bo2", title: "Farm", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "town_bo2", gameId: "bo2", title: "Town", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "nuketown_zombies_bo2", gameId: "bo2", title: "Nuketown Zombies", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "die_rise_bo2", gameId: "bo2", title: "Die Rise", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "mob_of_the_dead_bo2", gameId: "bo2", title: "Mob of the Dead", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "buried_bo2", gameId: "bo2", title: "Buried", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "origins_bo2", gameId: "bo2", title: "Origins", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // ADVANCED WARFARE
    { id: "outbreak_aw", gameId: "aw", title: "Outbreak", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "infection_aw", gameId: "aw", title: "Infection", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "carrier_aw", gameId: "aw", title: "Carrier", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "descent_aw", gameId: "aw", title: "Descent", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // BLACK OPS III
    { id: "shadows_of_evil_bo3", gameId: "bo3", title: "Shadows of Evil", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_giant_bo3", gameId: "bo3", title: "The Giant", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "der_eisendrache_bo3", gameId: "bo3", title: "Der Eisendrache", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "zetsubou_no_shima_bo3", gameId: "bo3", title: "Zetsubou No Shima", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "gorod_krovi_bo3", gameId: "bo3", title: "Gorod Krovi", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "revelations_bo3", gameId: "bo3", title: "Revelations", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "nacht_bo3", gameId: "bo3", title: "Nacht der Untoten", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "verruckt_bo3", gameId: "bo3", title: "Verrückt", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "shi_no_numa_bo3", gameId: "bo3", title: "Shi No Numa", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "origins_bo3", gameId: "bo3", title: "Origins", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "kino_der_toten_bo3", gameId: "bo3", title: "Kino der Toten", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "shangri_la_bo3", gameId: "bo3", title: "Shangri-La", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "ascension_bo3", gameId: "bo3", title: "Ascension", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "moon_bo3", gameId: "bo3", title: "Moon", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // INFINITE WARFARE
    { id: "zombies_in_spaceland_iw", gameId: "iw", title: "Zombies in Spaceland", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "rave_in_the_redwoods_iw", gameId: "iw", title: "Rave in the Redwoods", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "shaolin_shuffle_iw", gameId: "iw", title: "Shaolin Shuffle", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "attack_of_the_radioactive_thing_iw", gameId: "iw", title: "Attack of the Radioactive Thing", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_beast_from_beyond_iw", gameId: "iw", title: "The Beast from Beyond", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // WWII
    { id: "the_final_reich_ww2", gameId: "ww2", title: "The Final Reich", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_darkest_shore_ww2", gameId: "ww2", title: "The Darkest Shore", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_shadowed_throne_ww2", gameId: "ww2", title: "The Shadowed Throne", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_tortured_path_ww2", gameId: "ww2", title: "The Tortured Path", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_frozen_dawn_ww2", gameId: "ww2", title: "The Frozen Dawn", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // BLACK OPS 4
    { id: "voyage_of_despair_bo4", gameId: "bo4", title: "Voyage of Despair", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "ix_bo4", gameId: "bo4", title: "IX", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "blood_of_the_dead_bo4", gameId: "bo4", title: "Blood of the Dead", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "classified_bo4", gameId: "bo4", title: "Classified", category: "Standard", hasMainQuest: true, hasSideQuests: false, tags: [] },
    { id: "dead_of_the_night_bo4", gameId: "bo4", title: "Dead of the Night", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "ancient_evil_bo4", gameId: "bo4", title: "Ancient Evil", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "alpha_omega_bo4", gameId: "bo4", title: "Alpha Omega", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "tag_der_toten_bo4", gameId: "bo4", title: "Tag der Toten", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // VANGUARD
    { id: "der_anfang_vg", gameId: "vg", title: "Der Anfang", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "terra_maledicta_vg", gameId: "vg", title: "Terra Maledicta", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "shi_no_numa_reborn_vg", gameId: "vg", title: "Shi No Numa: Reborn", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_archon_vg", gameId: "vg", title: "The Archon", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // COLD WAR
    { id: "die_maschine_cw", gameId: "cw", title: "Die Maschine", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "firebase_z_cw", gameId: "cw", title: "Firebase Z", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "outbreak_cw", gameId: "cw", title: "Outbreak", category: "Standard", hasMainQuest: false, hasSideQuests: true, tags: [] },
    { id: "mauer_der_toten_cw", gameId: "cw", title: "Mauer der Toten", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "forsaken_cw", gameId: "cw", title: "Forsaken", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // MWIII
    { id: "urzikstan_mw3", gameId: "mw3", title: "Urzikstan", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },

    // BLACK OPS 6
    { id: "terminus_bo6", gameId: "bo6", title: "Terminus", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "liberty_falls_bo6", gameId: "bo6", title: "Liberty Falls", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "citadelle_des_morts_bo6", gameId: "bo6", title: "Citadelle des Morts", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_tomb_bo6", gameId: "bo6", title: "The Tomb", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "shattered_veil_bo6", gameId: "bo6", title: "Shattered Veil", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },
    { id: "the_reckoning_bo6", gameId: "bo6", title: "The Reckoning", category: "Standard", hasMainQuest: true, hasSideQuests: true, tags: [] },

    // BLACK OPS 7 STANDARD
    { id: "vandorn_farm_bo7_standard", gameId: "bo7_standard", title: "Vandorn Farm", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "exit_115_bo7_standard", gameId: "bo7_standard", title: "Exit 115", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "zarya_cosmodrone_bo7_standard", gameId: "bo7_standard", title: "Zarya Cosmodrone", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "mars_bo7_standard", gameId: "bo7_standard", title: "Mars", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "ashes_of_the_damned_bo7_standard", gameId: "bo7_standard", title: "Ashes of the Damned", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "astra_mallorum_bo7_standard", gameId: "bo7_standard", title: "Astra Mallorum", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "paradox_junction_bo7_standard", gameId: "bo7_standard", title: "Paradox Junction", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "totenreich_bo7_standard", gameId: "bo7_standard", title: "Totenreich", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },

    // BLACK OPS 7 CURSED
    { id: "vandorn_farm_bo7_cursed", gameId: "bo7_cursed", title: "Vandorn Farm", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "exit_115_bo7_cursed", gameId: "bo7_cursed", title: "Exit 115", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "zarya_cosmodrone_bo7_cursed", gameId: "bo7_cursed", title: "Zarya Cosmodrone", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "mars_bo7_cursed", gameId: "bo7_cursed", title: "Mars", category: "Standard", hasMainQuest: false, hasSideQuests: false, hasHiddenSong: false, tags: [] },
    { id: "ashes_of_the_damned_bo7_cursed", gameId: "bo7_cursed", title: "Ashes of the Damned", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "astra_mallorum_bo7_cursed", gameId: "bo7_cursed", title: "Astra Mallorum", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "paradox_junction_bo7_cursed", gameId: "bo7_cursed", title: "Paradox Junction", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] },
    { id: "totenreich_bo7_cursed", gameId: "bo7_cursed", title: "Totenreich", category: "Standard", hasMainQuest: false, hasSideQuests: false, tags: [] }
];
