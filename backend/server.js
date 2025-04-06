const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json()); 

let mensagens = [];

app.get("/mensagens", (req, res) => {
  res.json(mensagens);
});

app.post("/mensagens", (req, res) => {
  const { mensagem } = req.body;

  if (mensagem && mensagem.trim() !== "") {
    mensagens.push({
      texto: mensagem,
      autor: "Beatris",
      data: new Date().toISOString(),
    });

    res.status(201).json({ sucesso: true, mensagens });
  } else {
    res.status(400).json({ sucesso: false, erro: "Mensagem inválida" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
