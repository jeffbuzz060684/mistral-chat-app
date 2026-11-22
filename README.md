# mistral-chat-app

Mini app web de chat appelant l'API Mistral avec le SDK TypeScript/JavaScript officiel (`@mistralai/mistralai`), modèle `mistral-small-latest`.

La clé `MISTRAL_API_KEY` reste **côté serveur** : le navigateur ne parle qu'au serveur Express via `/api/chat`.

## Installation

```bash
npm install
cp .env.example .env
# puis éditez .env et renseignez votre clé : MISTRAL_API_KEY=...
```

Vous pouvez obtenir une clé API sur [console.mistral.ai](https://console.mistral.ai/).

## Exécution locale

```bash
npm start
```

Puis ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.
