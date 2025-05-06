import puppeteer from "puppeteer"; // Using Puppeteer’s own API to query elements on the page.

describe('show/hide an event details', () => {
    test('An event element is collapsed by default.', async () => {
        const browser = await puppeteer.launch(); // The Chromium window opens.

        const page = await browser.newPage();
        await page.goto('http://localhost:5173/'); // Puppeteer navigates to app by visiting the “http://localhost:5173/” URL.

        await page.waitForSelector('.event'); // The page needs some time to load the event list. To ensure this list is loaded before moving on, it was used the API method 'waitForSelector()' to wait until a desired element ('.event') appears.

        const eventDetails = await page.$('.event-details'); // Puppeteer checks if “event” details isn't null...
        expect(eventDetails).toBeNull(); // ..in other words, that it’s not shown to the user, which is done when this code line is executed.
        await browser.close(); // The Chromium window will be closed, completing the test run.
    });
});