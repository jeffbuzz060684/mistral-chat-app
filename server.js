require("dotenv").config();

const express = require("express");
const { Mistral } = require("@mistralai/mistralai");

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.MISTRAL_API_KEY;
const client = apiKey ? new Mistral({ apiKey }) : null;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const messages = Array.isArray(req.body.messages)
    ? req.body.messages.filter(
        (m) => m && typeof m.role === "string" && typeof m.content === "string"
      )
    : [];

  if (messages.length === 0) {
    return res.status(400).json({ error: "Champ 'messages' invalide ou vide." });
  }

  if (!client) {
    return res.status(500).json({ error: "MISTRAL_API_KEY n'est pas définie sur le serveur." });
  }

  try {
    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Erreur de l'API Mistral." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
