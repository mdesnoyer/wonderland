# Wonderland

TODO

## Setup

_(This is very much a work in progress, all feedback and amends welcome)_

- Install [Node.js](https://nodejs.org/en/download/)
- Install [https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en](React Developer Tools) (Chrome Extension)
- Install Babel Syntax Highlighter (for Sublime Text or equivalent)
- Clone this repo into a folder, e.g. `wonderland`
- Goto root directory `wonderland`
- `npm install` installs all dependencies mentioned in `/package.json` into `/node_modules/`

## Building

- `gulp debug` runs `gulpfile.js` which should kick off all the required tasks start a server at [http://localhost:3000/](http://localhost:3000/) - this is what you use locally
- `gulp live` is what is used for servers that are not being used to debug, i.e. live servers

## Github

- branches are `development` and `production`, these point to the respective sites, see below for site details.

## Development Process

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number OR `eh-new-feature-thing`
- Work on this branch, when your feature is complete, open a Pull Request against `development` and assign to Ed Henderson
- Make sure there is a meaninful PR message and squash your branch into 1 commit
- Once good, it will be merged to `development` and you can test feature on the Development site
- After merging, please delete your branch

## Release Process

- Periodically, TBC we will push (merge) `development` into `production` and release.
- TODO

## QA

- TODO

## Hosting

TODO

### Netlify
- Sites are `wonderland-development.netlify.com` and `wonderland-production.netlify.com`, please ask Ed Henderson if you require access.
- Temporary password to access sites is `kneewrong`

# TODO

- distinct development and production dependencies
- split up Jira tickets
- automated testing as part of build step
- smarter/faster build
