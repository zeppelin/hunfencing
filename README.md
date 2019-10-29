# hunfencing

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Zeppelin/hunfencing)

### `@hunfencing/client`

An Ember.js client.

- Building: `yarn build-client`
- Development: `cd ./packages/client; ember serve`

### `@hunfencing/server`

A NodeJS server & scraper.

- Building: `yarn build-server`
- Development (watching): `yarn watch-server`

### Running in production

Requirements:

- [Redis](https://redis.io/)

```sh
yarn deploy-build
yarn fastboot-server
```

Refreshing cached data: `yarn refresh-scraper-cache`
