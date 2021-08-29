# myPrivateJournal
A self-contained, private journal app.

This app provides an interactive page and API for viewing, storing, and modifying journal entries sorted by date of creation. Timestamps are included for both creation and editing, along with search features based on keyword. Should you accidentally discard any in-progress additions or edits, they are stored in memory until you refresh the page.

Incremental updates and feature additions are planned!

# Developer notes

  [API calls](#API)
  [Scripts and usage](#Scripts)
  [Developer notes](#Notes)

## API

Default localhost port: 3950

- POST to '/newEntry' - create a new journal entry
- GET '/entries' - receive the full list of journal entries
- DELETE '/entry/:id' - deletes all data for a specific entry's ID
- PUT to '/entry/:id' - modifies a specific journal entry based on ID

## Scripts

Before running, ensure PostgreSQL is active on your system.
  --> installation via HomeBrew: https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3
This project uses the default PostgreSQL username, port, and password.
If needed, specify your own Pool configuration (username, port, password) in db/index.js.

`npm install`
`npm run start` -- Launch Node.js server and connect to PostgreSQL pool
`npm run build` -- Launch client on localhost:3950

## Notes

Upcoming feature sequence:
- Delete confirmation modal
- Additional button animations (hover, click)
- React Hot Reloading
- More search features
- Selectable themes
- User creation and authentication
- Entry-specific view with "Mood" component (users can reference a YouTube video/song)