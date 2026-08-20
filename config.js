/*
 * The only file you edit for a new client.
 *
 * Fastest path: pick the preset closest to the client's niche below, then open
 * presets.js and edit that entry (or paste it here and edit it in place).
 *
 * Available: "salon" | "cafe" | "detailing" | "aircon" | "plumbing"
 * Preview any of them without editing: index.html?preset=detailing&theme=cyber
 */
const CLIENT = "salon";

/* Own client? Replace the line below with your own object — same shape as any preset. */
const requestedPreset = new URLSearchParams(location.search).get("preset");
const CONFIG = PRESETS[requestedPreset] || PRESETS[CLIENT];
