# Contributing

## Github

- `https://github.com/neon-lab/wonderland`
- Branches are `development`, `staging` and `production`, these point to their respective sites, see BUILD.md for more details.

## Development

- When working on feature, cut a branch from `development`, give it a sensible name, e.g. `eh-123` where EH is your initials and 123 is the ticket number OR `eh-new-feature-thing`.
- Try to keep (where possible) to *One Ticket = One Branch = One Pull Request*, we'd rather have two or three smaller pieces of work than one behemoth. This also makes reverting and finding problems WAY easier.
- Work on this branch, when your feature is complete, open a Pull Request against `development` (you may need to rebase, see below) and assign to Ed Henderson (or equivalent).
- Make sure you can run `gulp live` against it and it builds.
- Make sure you can run `gulp debug` against it and it builds.
- Title the Pull Request of the form - `Sensible Title #123`.
- Make sure there is a meaningful PR message that references the ticket in question.
- Please put a link to the PR in the ticket.
- For bigger items or where it makes sense, please include a *Test Plan*.
- Once signed off (usually LGTM), the reviewer says merge, you can squash your branch into one commit and merge to `development` (or use Github's squash feature)
- Once development site is built, please test, *it is your responsibility*.
- If required - you should also login to Netlify and check the build log (please ask if you do not know how to do this).
- After merging, please delete your branch locally AND on Github.

```
git branch -d branchname
git push origin --delete branchname
```

### Rebasing

- TODO

## Development -> Staging

- Start a [new PR](https://github.com/neon-lab/wonderland/compare/staging...development).
- Set the title to `development -> staging`.
- Check that the proposed changes are accurate (what has been merged to `development` since last time we pushed to `staging`).
- Make a short note of these changes, e.g. `#1234 - Brief description of ticket / change / fix`.
- Create PR.
- Ask someone else to sanity check the PR.
- Once good, click `Merge`.
- Site should build on `staging` - please check Staging site for new changes.
- Post note in `#wonderland` Slack channel along with note that `development` has been pushed to `staging`.

## Development -> Production

- Similar to above but you want to go `development` -> `production`

## Production (Hot Fixes)

- TODO

