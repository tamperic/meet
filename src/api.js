import mockData from "./mock-data";
import NProgress from "nprogress";


// @param {*} events:
// The following function should be in the “api.js” file.
// This function takes an events array, then uses map to create a new array with only locations.
// It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
// The Set will remove all duplicates from the array.
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};


// This function takes 'accessToken' and checks the token's validity
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// This function will fetch the list of all events.
export const getEvents = async () => {
  // if using localhost return mock data, otherwise use the real API
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  // Check whether the user is offline, but this only works if there’s no internet.
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events?JSON.parse(events):[];
  }

  // Then, check for an access token
  const token = await getAccessToken();

  // if token exists make a GET request to the Google Caolendar API to the "Upcoming Events" endpoint. If it doesn’t exist or is invalid, need to get a new one.
  if (token) {
    removeQuery(); // remove the code (query parameters) from the URL once finished with it
    const url = "https://bh96eida0l.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      // Return the list of events data once fetched
      NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname; // returns the web protocol used (http: or https:), path and filename of the current page
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};


// Getting Access Token
export const getAccessToken = async () => {
  // The code checks whether an access token was found.
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    // If no token is found (!accessToken), the code then checks for an authorization code.
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    // If no authorization code is found (!code), the user is automatically redirected to the Google Authorization screen, where they can sign in and receive their code.
    if (!code) {
      const response = await fetch(
        "https://bh96eida0l.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};


// Redirect users to log in with Google, so they can be redirected back to your site with the code
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code); // Encode the code that will be used to get token
  const response = await fetch(
    'https://bh96eida0l.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  ); // Fetch new token on the code 
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

// 'getToken' function with 'try..catch' statement
// const getToken = async (code) => {
//   try {
//     const encodeCode = encodeURIComponent(code);
 
//     const response = await fetch( 'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     const { access_token } = await response.json();
//     access_token && localStorage.setItem("access_token", access_token);
//     return access_token;
//   } catch (error) {
//     error.json();
//   }
//  }