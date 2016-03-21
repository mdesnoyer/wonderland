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
- Work on this branch, when your feature is complete, open a Pull Request against `development` (you may need to rebase) and assign to Ed Henderson (or other person that is not you)
- Make sure you can run `gulp live` against it and it builds
- Make sure you can run `gulp debug` against it and it builds
- Make sure there is a meaninful PR message
- Once signed off, you can squash your branch into 1 commit and merge to `development`
- Once development site is built, please test
- After merging, please delete your branch

```
git branch -d branchname
git push origin --delete branchname
```

## Release Process

- Periodically, we will push (merge) `development` into `production` and release.

## QA

- TODO

## Hosting

### Netlify
- Sites are `wonderland-development.netlify.com` and `wonderland-production.netlify.com`, please ask Ed Henderson if you require access.
- Temporary password to access sites is `kneewrong`

## Style Guide (work in progress)

- use `var` always
- Use NAMES_LIKE_THIS for constant values
- 4 spaces for tabs
- space before `{`

If in doubt, defer to the code.

### Sass / CSS

- 1 line per selector

```
.awesome,
.cool,
.fantastic {
	text-align: center;
}
```

## Other

- API info is available at http://docs.neonv2.apiary.io/#; also useful is https://jsapi.apiary.io/apis/neonv2.apib (raw form)
- 152655.006.01.197 and 149293.043.01.197 are Video Ids for Discovery (Account Id, gvs3vytvg20ozp78rolqmdfa), read only please

## Troubleshooting

```
Fetch API cannot load http://services.neon-lab.com/api/v2/uhet29evso83qb7ys70hvj3z/videos. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

https://bugs.chromium.org/p/chromium/issues/detail?id=67743

## Credentials

### Test Account

- USERNAME = wonderland_demo
- PASSWORD = ad9f8g4n3ibna9df
- ACCOUNT_ID = uhet29evso83qb7ys70hvj3z


### Discovery

- USERNAME = 'global_admin_neon'
- PASSWORD = '4ERDWIlupafI'
- ACCOUNT_ID = 'gvs3vytvg20ozp78rolqmdfa'

## Test Videos

- http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4
- https://dl.dropboxusercontent.com/u/38984845/Neon%20Sledging.mov
- https://vimeo.com/157318040
- https://vimeo.com/105570424
- https://vimeo.com/36552490
- https://vimeo.com/41169610
- https://vimeo.com/114583953

## Spike

- moved spike/TODO to https://neonlabs.atlassian.net/browse/NEON-729

