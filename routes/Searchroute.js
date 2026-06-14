// Search players by game and location
router.get("/search", async (req, res) => {
  try {
    const { game, location } = req.query;

    // Find users that match the query
    const players = await User.find({
      game: game,
      location: location
    });

    if (players.length === 0) {
      return res.json({ message: "No players found" });
    }

    res.json(players);
  } catch (err) {
    res.status(400).json({ error: "❌ Search failed: " + err.message });
  }
});
