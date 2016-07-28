# Build

## Basics

- `gulp debug` runs `./gulpfile.js` which should kick off all the required tasks start a server at [http://localhost:3000/](http://localhost:3000/) - this is what you use locally
- `gulp live` is what is used for servers that are not being used to debug, i.e. live servers
- The web code lives in `./src/` and is built to `./build/`

## Environment

- Default environment is `dev`
- ` --env=prod` may be added to the build command (ex: `gulp debug --env=prod`) in order to use the Production servers
- Other environments may also be used. To add an environment (or view available one):
-- Environment configs are stored in `./env/`
-- File name format is `config.json.<env name>`
-- `--env=<env name>` can then be used to run the new environment config
-- `config.json` is the current running environment
-- NOTE: config.json is not in source control and is built to `./env/`

## Hosting

- [Netlify](https://netlify.com/)

Netlify runs `npm install` before the build command runs if it detects a  `package.json` file (which we have). They cache the dependencies between builds.

Sites are:

| Domain | Actual | Build | Branch |
| --- | --- | --- | --- |
| `testymctestface.netlify.com` | `testymctestface.netlify.com` | `gulp live --env=dev` | CONFIGURABLE* |
| `development-app.neon-lab.com` | `wonderland-development.netlify.com` | `gulp live --env=dev` | development |
| `staging-app.neon-lab.com` | `wonderland-staging.netlify.com` | `gulp live --env=prod` | staging |
| `app.neon-lab.com` | `wonderland-production.netlify.com` | `gulp live --env=prod` | production |

* If you change the branch, please note that https://github.com/neon-lab/wonderland/settings/hooks ends up having 2 x webhooks. When we only need one. So if you reconnect you need to go in here. You need to delete the `https://api.netlify.com/hooks/github  (pull_request and push)` one.

- Please ask if you require access (temporary password to access sites is `kneewrong`)

### SSL

- Provided by Netlify and [Let's Encrypt](https://letsencrypt.org/)
