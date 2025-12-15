const express = require("express");

module.exports = (client) => {
  const router = express.Router();

  /**
   * GET /indicators/monthly
   * calls a fc get_monthly_financial_indicators()
   */
  router.get("/monthly", async (req, res) => {
    try {
      const sql = `SELECT rentals_db.get_monthly_financial_indicators()`;

      const { rows } = await client.query(sql);

      // normalmente function retorna 1 linha com os indicadores
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No indicators returned" });
      }

      res.json({
        success: true,
        indicators: rows[0].get_monthly_financial_indicators

      });
    } catch (error) {
      console.error("Error fetching monthly indicators:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching monthly indicators",
      });
    }
  });
  //ESSENCIAL: retorna o router para que o server.js registre a rota
  return router;
};
