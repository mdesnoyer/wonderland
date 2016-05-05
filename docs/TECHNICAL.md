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

## Github

- `https://github.com/neon-lab/wonderland`
- Branches are `development`, `staging` and `production`, these point to their respective sites, see BUILD.md for more details.

## Development Process

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number OR `eh-new-feature-thing`
- Try to keep (where possible) to *One Ticket = One Branch = One Pull Request*, I'd rather have two or three smaller pieces of work than one behemoth. This also makes reverting and finding problems WAY easier.
- Work on this branch, when your feature is complete, open a Pull Request against `development` (you may need to rebase) and assign to a Senior Engineer (or other person that is not you)
- Make sure you can run `gulp live` against it and it builds
- Make sure you can run `gulp debug` against it and it builds
- Make sure there is a meaningful PR message that references the ticket in question
- Please put a link to the PR in the ticket
- Title the Pull Request of the form - `Sensible Title #123`
- Once signed off, the reviewer says merge, you can squash your branch into one commit and merge to `development`
- Once development site is built, please test, *it is your responsibility*
- You should also login to Netlify and check the build log (please ask if you do not know how to do this)
- After merging, please delete your branch

```
git branch -d branchname
git push origin --delete branchname
```

### Pushing to Staging

- Start a [new PR])https://github.com/neon-lab/wonderland/compare/staging...development)
- Set the title to `development -> staging`
- Check that the proposed changes are accurate (what has been merged to `development` since last time we pushed to `staging`)
- Make a short note of these changes, e.g. `#1234 - Brief description of ticket / change / fix`
- Create PR
- Ask someone else to sanity check the PR
- Once good, click `Merge`
- Site should build on `staging` - please check Staging site for new changes
- Post note in `#wonderland` Slack channel along with note that `development` has been pushed to `staging`

## DNS

- [DNSimple](https://dnsimple.com)
- ops@neon-lab.com
- !~E5>hs${<xLp+\`

## API

- API info is available at http://api.docs.neon-lab.com/

## Monitoring

### Pingdom

- ops@neon-lab.com
- Neon-lab1
- https://my.pingdom.com/dashboard
