const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/tasks"
        ]
    });
}

async function authenticate(code) {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    return tokens;
}

function setCredentials(tokens) {
    oauth2Client.setCredentials(tokens);
}

function getClient() {
    return oauth2Client;
}

module.exports = {
    getAuthUrl,
    authenticate,
    setCredentials,
    getClient
};
