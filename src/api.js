import mockData from "./mock-data";


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


// This function will fetch the list of all events.
export const getEvents = async () => {
  return mockData;
};


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
        "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};