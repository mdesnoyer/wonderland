# Technical

## Setup

Homebrew
* If you have not already, install Homebrew - http://brew.sh/#install

Node & NPM
* If you have not already, install Node & NPM:
<pre><code>brew install node</code></pre>

React Developer Tools
* Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) (Chrome Extension)

Repository
* Check out this repo into your chosen location
<pre><code>git checkout https://github.com/neon-lab/wonderland.git</code></pre>

Dependencies
* Go to root directory `wonderland`
<pre><code>npm install</code></pre>

Optional
* Install Babel Syntax Highlighter (for Sublime Text or equivalent)

## Build

- `gulp debug` runs `./gulpfile.js` which should kick off all the required tasks start a server at [http://localhost:3000/](http://localhost:3000/) - this is what you use locally
- `gulp live` is what is used for servers that are not being used to debug, i.e. live servers
- The web code lives in `./src/` and is built to `./build/`

## Github

- `https://github.com/neon-lab/wonderland`
- Branches are `development`, `staging` and `production`, these point to their respective sites (these all run `gulp live`)

## Development Process

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number OR `eh-new-feature-thing`
- Work on this branch, when your feature is complete, open a Pull Request against `development` (you may need to rebase) and assign to a Senior Engineer (or other person that is not you)
- Make sure you can run `gulp live` against it and it builds
- Make sure you can run `gulp debug` against it and it builds
- Make sure there is a meaninful PR message
- Title the Pull Request of the form - `Sensible Title #123`
- Once signed off, the reviewer says merge, you can squash your branch into 1 commit and merge to `development`
- Once development site is built, please test, it is your responsibility
- You should also login to Netlify and check the build log (please ask if you do not know how to do this)
- After merging, please delete your branch

```
git branch -d branchname
git push origin --delete branchname
```

## Release Process

- Periodically, we will push (merge) `development` into `staging` and release for testing.
- We will push (merge) `development` into `production` and release.

## Hosting

- Sites are `wonderland-development.netlify.com`, `wonderland-staging.netlify.com` and `wonderland-production.netlify.com`, please ask if you require access.
- Temporary password to access sites is `kneewrong`

## API

- API info is available at http://docs.neonv2.apiary.io/#; also useful is https://jsapi.apiary.io/apis/neonv2.apib (raw form)

## Monitoring

We use Pingdom:

- USERNAME: ops@neon-lab.com
- PASSWORD: Neon-lab1
- LOGIN URL: https://my.pingdom.com/dashboard
- UPTIME CHECK URL: https://my.pingdom.com/newchecks/checks
- SITE NAME: Wonderland Development
