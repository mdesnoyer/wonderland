# Wonderland

TODO

## Setup

_(This is very much a work in progress, all feedback and amends welcome)_

- Install [Node.js](https://nodejs.org/en/download/)
- Install [https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en](React Developer Tools) (Chrome Extension)
- Install Babel Syntax Highlighter (for Sublime Text or equivalent)
- Clone this repo into a folder, e.g. `wonderland`

### Command Line

- Goto root directory `wonderland`
- `npm install` installs all dependencies from `/package.json` into `/node_modules/`

### Web Server

- `gulp` runs `gulpfile.js` which should start a server at [http://localhost:3000/](http://localhost:3000/)

### Github

- branches are `development` and `production`, these point to the respective sites, `wonderland-development.netlify.com` and `wonderland-production.netlify.com`

### Development Process

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number
- Work on this branch, when your feature is complete, open a Pull Request against `development` and assign to Ed Henderson
- Once good, it will be merged to `development` and you can test feature on the Development site

### Release Process

- Periodically, TBC we will push (merge) `development` into `production` and release.

### QA
- TBC

### Netlify

- temporary password to access site is `kneewrong`

# TODO

- distinct development and production Gulp builds
- distinct development and production dependencies
- split up Jira tickets
- automated testing as part of build step
- smarter/faster build
- design
