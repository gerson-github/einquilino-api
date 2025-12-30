require("dotenv").config();
const express = require("express");
const cors = require("cors");

const pg = require("pg"); // <-- THIS WAS MISSING

const app = express();
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5001",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  "http://localhost:3000" // <-- add your second frontend port
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



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

//IMPORTAR ROTAS
const indicatorsRoutes = require("./src/routes/indicators");
const templateRoutes = require("./src/routes/templates");


//REGISTRAR ROTAS
app.use("/indicators", indicatorsRoutes(client));
app.use("/templates", templateRoutes(client));

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("API Rodando! 🎉");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});
