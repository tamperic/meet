'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-sable-chi.vercel.app/"];


const oAuth2Client = new google.auth.OAuth2(
 CLIENT_ID,
 CLIENT_SECRET,
 redirect_uris[0]
);

// The getAuthURL() function returns an authorization URL that users can visit to authorize the app and get their USER_AUTHORIZATION_CODE.
module.exports.getAuthURL = async () => {
 // Scopes array is passed to the `scope` option.

 const authUrl = oAuth2Client.generateAuthUrl({
   access_type: "offline",
   scope: SCOPES,
 });


 return {
   statusCode: 200,
   headers: {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
   },
   body: JSON.stringify({ authUrl, }),
 };
};

// The getAccessToken() function that returns an access token.
module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code  = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise ((resolve, reject) =>  {
    // Exchange authorization code for access token with a “callback” after the exchange,
    // The callback in this case is an arrow function with the results as parameters: “error” and “response”

    oAuth2Client.getToken(code, (error, response) =>  {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  }).then((results) => {
    // Respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(results),
    };
  }).catch((error) =>  {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  oAuth2Client.setCredentials({ access_token });
  
  return new Promise((resolve, reject)  => {
    // 'getCalendarEvents' serverless function uses the 'calendar.events.list' endpoint
    // (to verify how events data will be used in app) with the following parameters:
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  }).then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  }).catch((error) =>  {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error),
    };
  });
};