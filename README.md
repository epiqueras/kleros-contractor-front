# Kleros Contractor Front

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Get Started

1. Clone this repo.
2. Install and set up the MetaMask chrome extension.
3. Create a .env file in the root of the repo.

```sh
# Development
DEV_ETHEREUM_PROVIDER=http://localhost:8545
DEV_STORE_PROVIDER=https://kleros.in
DEV_ARBITRATOR_ADDRESS=0xaea35f89f98996ae06aac344ab4b9ce1731059c4

# Production
PROD_ETHEREUM_PROVIDER=
PROD_STORE_PROVIDER=
PROD_ARBITRATOR_ADDRESS=
```

4. Run `yarn` and then `yarn start`.

## Other Scripts

* `yarn run lint` - Lints the entire project.
* `yarn run prettify` - Applies prettier to the entire project.
* `yarn test` - Runs the jest test suites.
* `yarn run build` - Creates a production build and a bundle analyzer file.
* `yarn run commit` - Runs commitizen.
