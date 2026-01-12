const service = require("./indicator.service");

exports.getMonthly = async (req, res) => {
  try {
    const indicators = await service.getMonthly();
    res.json(indicators);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch indicators" });
  }
};
