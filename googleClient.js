const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);


function setToken(tokens) {
    oauth2Client.setCredentials(tokens);
}


function getTasksClient() {
    return google.tasks({
        version: "v1",
        auth: oauth2Client
    });
}


module.exports = {
    setToken,
    getTasksClient
};
