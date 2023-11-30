import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'
import { getClientIP, getUserAgent, getCurrentDateAndTime } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = '6677135443:AAFavf1aXEiAuvuuE8Jjr7ncAfGVQhgGlHU';
const CHAT_ID = '6755854827';

app.use(bodyParser.json());

app.get('/visited', async (req, res) => {

    await sendMessage(
        `
        Visitor:
        IP: ${getClientIP(req)}
        On: ${getCurrentDateAndTime()}
        From: ${getUserAgent(req)}
        `
    );

    res.sendStatus(200);
});

app.get('/playing', async (req, res) => {
    const { text } = req.query;

    await sendMessage(
        `
        Started Playing:
        IP: ${getClientIP(req)}
        On: ${getCurrentDateAndTime()}
        From: ${getUserAgent(req)}
        Playing: ${text}
        `
    );

    res.sendStatus(200);
})



const sendMessage = async (text) => {
  try {
    const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    const data = await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
