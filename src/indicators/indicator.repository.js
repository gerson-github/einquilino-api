const db = require("../db");

exports.getMonthly = async () => {
  const sql = `SELECT rentals_db.get_monthly_financial_indicators() as data`;
  const { rows } = await db.query(sql);
  return rows[0]?.data || null;
};
