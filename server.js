require("dotenv").config();
const express = require("express");
const pg = require("pg"); // <-- THIS WAS MISSING

const app = express();
app.use(express.json());

// CONFIGURE SEU CLIENT POSTGRES
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// TESTAR CONEXÃO
client
  .connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar no PostgreSQL:", err));

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("API Rodando! 🎉");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});
