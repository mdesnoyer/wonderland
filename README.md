# Wonderland

_(This is very much a work in progress, all feedback welcome)_

## Setup

- Install [Node.js](https://nodejs.org/en/download/)
- Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) (Chrome Extension)
- Install Babel Syntax Highlighter (for Sublime Text or equivalent)
- Clone this repo into a folder, e.g. `wonderland`
- Go to root directory `wonderland`
- `npm install` installs all dependencies mentioned in `./package.json` into `./node_modules/`

## Building

- `gulp debug` runs `./gulpfile.js` which should kick off all the required tasks start a server at [http://localhost:3000/](http://localhost:3000/) - this is what you use locally
- `gulp live` is what is used for servers that are not being used to debug, i.e. live servers
- The web code lives in `./src/` and is built to `./build/`

## Github

- `https://github.com/neon-lab/wonderland`
- Branches are `development` and `production`, these point to their respective sites, see below for site details.

## Development Process

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number OR `eh-new-feature-thing`
- Work on this branch, when your feature is complete, open a Pull Request against `development` and assign to Ed Henderson (or other person that is not you)
- Make sure there is a meaninful PR message and squash your branch into 1 commit
- Once signed off, you can merge to `development` and you can test said feature on the Development site
- After merging, please delete your branch

## Release Process

- Periodically, we will push (merge) `development` into `production` and release.

## QA

- TODO

## Hosting

### Netlify
- Sites are `wonderland-development.netlify.com` and `wonderland-production.netlify.com`, please ask Ed Henderson if you require access.
- Temporary password to access sites is `kneewrong`

# TODO

- http://bulma.io/
- distinct Development and Production dependencies
