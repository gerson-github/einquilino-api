// src/templates/template.repository.js
const db = require("../db");

exports.findAll = async () => {
  const sql = `
    SELECT id, templateName
    FROM rentals_db.templates
    ORDER BY createdAt DESC
  `;
  const { rows } = await db.query(sql);
  return rows;
};

exports.findById = async (id) => {
  const sql = `
    SELECT
      t.id,
      t.templateName,
      (
        SELECT jsonb_agg(groups_agg)
        FROM (
          SELECT
            g.id,
            g.name,
            g.position,
            (
              SELECT jsonb_agg(fields_agg ORDER BY f.position)
              FROM (
                SELECT
                  f.id,
                  f.key,
                  f.label,
                  f.type,
                  f.required,
                  f.position,
                  f.options,
                  f.settings
                FROM rentals_db.fields f
                WHERE f.groupId = g.id
              ) fields_agg
            ) AS fields
          FROM rentals_db.groups g
          WHERE g.templateId = t.id
          ORDER BY g.position
        ) groups_agg
      ) AS groups
    FROM rentals_db.templates t
    WHERE t.id = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
  `;

  const { rows } = await db.query(sql, [id]);
  return rows[0];
};
