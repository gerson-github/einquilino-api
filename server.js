require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  "http://localhost:3000", // <-- add your second frontend port
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

// // CONFIGURE SEU CLIENT POSTGRES
// const client = new pg.Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

// // TESTAR CONEXÃO
// client
//   .connect()
//   .then(() => console.log("✅ Conectado ao PostgreSQL com sucesso!"))
//   .catch((err) => console.error("❌ Erro ao conectar no PostgreSQL:", err));

//IMPORTAR ROTAS
//const indicatorsRoutes = require("./src/routes/indicators");
//const templateRoutes = require("./src/routes/templates");

//REGISTRAR ROTAS
//app.use("/api/indicators", indicatorsRoutes(indicatorsRoutes));
//app.use("/api/templates", templateRoutes(templateRoutes));

const indicatorsRoutes = require("./src/indicators/indicator.routes");
app.use("/api/indicators", indicatorsRoutes);

const templateRoutes = require("./src/templates/template.routes");
app.use("/api/templates", templateRoutes);

const contractDataRoutes = require("./src/contractData/contractData.routes");
app.use("/api/contract-data", contractDataRoutes);


//teste
app.get("/api/names", (req, res) => {
  res.json({
    names: ["gerson", "saulo", "laura"],
  });
});

// ROTA TESTE
app.get("/api", (req, res) => {
  res.send("API Rodando! 🎉");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);
});

// HTTP Request
//    ↓
// Routes
//    ↓
// Controller (HTTP)
//    ↓
// Service (Business logic)
//    ↓
// Repository (SQL)
//    ↓
// PostgreSQL
