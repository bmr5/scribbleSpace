const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '562231562934-4chj9222am4nbhukta775h8c25frhktm.apps.googleusercontent.com',
  '8cYuyh1JHkGrMCz2cgHabUfY',
  'http://localhost:3000/scribbleSpace'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

module.exports = { url, oauth2Client };