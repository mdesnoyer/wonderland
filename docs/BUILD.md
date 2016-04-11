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
-- `config.json` is the current running environment (NOTE: config.json is not in source control and is built to `./env/`

## Hosting

- [Netlify](https://netlify.com)

Sites are:

| Domain | Actual | Build | Branch |
| --- | --- | --- | --- |
| `development-app.neon-lab.com` | `wonderland-development.netlify.com` | `gulp live --env=dev` | development |
| `staging-app.neon-lab.com` | `wonderland-staging.netlify.com` | `gulp live --env=prod` | staging |
| `app.neon-lab.com` | `wonderland-production.netlify.com` | `gulp live --env=prod` | production |

Please ask if you require access (temporary password to access sites is `kneewrong`)

### SSL

- Provided by Netlify and [Let's Encrypt](https://letsencrypt.org/)
