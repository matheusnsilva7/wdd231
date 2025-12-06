export async function fetchSports() {
  try {
    const res = await fetch("./data/sports.json");
    if (!res.ok) {
      throw new Error("Could not load local sports.json: " + res.status);
    }

    const data = await res.json();

    return data.map((s, i) => ({
      id: s.id || "sport-" + i,
      name: s.name || "Unknown Sport",
      format: s.format || "Team/Individual",
      description: s.description || "No description provided.",
      popularity: s.popularity || "Unknown",
    }));
  } catch (err) {
    console.error("Error loading sports.json", err);
    return [];
  }
}
