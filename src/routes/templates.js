const express = require("express");

module.exports = (client) => {
  const router = express.Router();

  /**
   * GET /templates/:id
   * Returns a full template structure (groups + fields)
   */
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // const sql = `SELECT rentals_db.get_template_flat($1) AS template;`;

      // const { rows } = await client.query(sql, [id]);

      const sql = `
  SELECT rentals_db.get_template_flat(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid
  ) AS template;
`;

      const { rows } = await client.query(sql);

      // normalmente function retorna 1 linha com os indicadores
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Template not found." });
      }

      res.status(200).json({
        success: true,
        data: rows[0].template,
      });
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  //ESSENCIAL: retorna o router para que o server.js registre a rota
  return router;
};
