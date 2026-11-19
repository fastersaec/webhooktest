
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the same token in Meta Developer Console
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// Parse incoming JSON
app.use(express.json());

// 1. Meta webhook verification (GET)
app.get("/webhook/whatsapp", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WhatsApp Webhook Verified!");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// 2. Receive WhatsApp events (POST)
app.post("/webhook/whatsapp", (req, res) => {
    console.log("WhatsApp Webhook Event:");
    console.log(JSON.stringify(req.body, null, 2));

    // TODO: Process incoming messages
    // TODO: Update message delivery/read status
    // TODO: Route messages to the correct tenant

    return res.sendStatus(200);
});

// Health check
app.get("/", (req, res) => {
    res.send("WhatsApp Webhook Server is running");
});

app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
