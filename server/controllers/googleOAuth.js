const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GAUTH_ID,
  process.env.GAUTH_SECRET,
  process.env.GAUTH_URL
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
