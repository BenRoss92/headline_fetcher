# Headline Fetcher 2

## Running the app

### Running locally (on a Mac)

**Required** - Make sure you have installed: [Chrome](https://www.google.com/chrome/browser/desktop/index.html), [Chromedriver](http://webdriver.io/guide/getstarted/install.html#Setup-Chrome) and [Node (any version between 1-7) and NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac).

1. [Register an FT API Key](https://developer.ft.com/)
2. Clone this repo - `$ git clone git@github.com:BenRoss92/headline_fetcher.git && cd headline_fetcher`
3. Install dependencies - `$ npm install`
4. Create a `.env` file in root of the project and add your API key:
```
# e.g.
FT_API_KEY=jfkldsjfkldfjkdlsu485543
```
5. Run the local server - `$ npm start`
6. Use the app - Visit `http://localhost:3000/` in a browser

### Running tests

1. Download the latest [selenium standalone server]($ curl -O http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar)
2. Run the local server - `$ npm start`
3. Run the tests while the server is running - in a new command line tab, run `$ npm test`

## Brief

### Criteria

Build a website that shows a list of Financial Times news headlines. Achieve this using the [FT Developer API](https://developer.ft.com/). Provide a search box that finds headlines containing specific words (e.g. searching for "Brexit" should return a list of Brexit-related headlines).

Optionally, provide pagination for results, at 20 results per page.

You're free to develop any other functionality around that minimum set of requirements. Below are some recommendations on how to do this.

This website should be:

- Server-rendered
- Use progressive enhancement
- Responsive
- Accessible

### Bonus

For bonus points, the site should:

- Be built using Javascript and node.js
- Be deployed on Heroku
- Not rely too heavily on client-side frameworks (i.e. Angular, React) or libraries like jQuery
- Have a similar look and feel as ft.com
- Be performant over 3G networks

It'd be really awesome if, on top of all that, your site:

- Uses [Origami Components](http://origami.ft.com/)
- Works offline
