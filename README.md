# AngularJS Notifications

The purpose of this AngularJS module is to show notification messages within a SPA. Those
notifications should be used to display information which provide users with a feedback, but do not disturb them at the current work. One example would be a chat application, where the notification module displays a slight notification that someone has logged in. The module is encapsulated, thus it could be shared across multiple projects.

A simple project around this module is built to demonstrate its capabilities:
- create notifications with following types: INFO, WARNING, ERROR
- dismiss particular notification or all at once
- dismiss INFO notifications after 10 seconds automatically

## Prerequisites

- Get [Google Chrome][chrome-download] browser
- Get [Node.js][node-download].
- Navigate to project folder from terminal, and install the dependencies with: `npm install` . During that process, it is highly possible to see NPM warnings - feel free to ignore them for moment.

Code is built and tested on Ubuntu 16.04, running NodeJS 7.8.0 and NPM 4.4.4

## Running the app

Run `npm start` from terminal. It will open new browser tab and load the demo application at http://localhost:3000

### Different builds

Application can be packed into development and production builds:
- `npm start` - will create development build, it will run server on port 3000 and watch for any file changes
- `npm run build-prod` - will create production build, but it will only generate files and will not open automatically in browser

## Running the tests

Run `npm test` from terminal and watch the resulting output from test runner.
If everything goes well, the following output should appear in terminal (execution times may be different):
```
PhantomJS 2.1.1 (Linux 0.0.0): Executed 10 of 10 SUCCESS (0.06 secs / 0.061 secs)
Chrome 55.0.000 (Linux 0.0.0): Executed 10 of 10 SUCCESS (0.122 secs / 0.11 secs)
TOTAL: 20 SUCCESS
```

[chrome-download]: https://www.google.com/chrome/
[node-download]: https://nodejs.org/en/download/
