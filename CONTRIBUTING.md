# Contributing to Jarspec

## Releasing the libraries

The libraries live in this Yarn workspaces monorepo and are published to npm independently. Each package is built with [tsdown](https://tsdown.dev) into a dual ESM + CommonJS bundle (`.mjs`/`.cjs` + `.d.mts`/`.d.cts`). `dist/` is **git-ignored** and rebuilt automatically at publish time by each package's `prepack` script, so there is nothing built to commit.

### 1. Bump the version

Update the version everywhere and keep the values in sync:

- the package versions in `packages/js-client/package.json`, `packages/js-server/package.json` (and the root `package.json`, which tracks the spec version)
- the spec `version` literal the libraries emit — `common/@types/CommonResponse.ts` and its mirrored copies under each `packages/*/src/common`, the `version` value in each `packages/*/src/index.ts`, and the examples + **Latest jarspec version** at the bottom of the README

### 2. Build and validate

```sh
yarn install
yarn workspace:build   # builds both packages with tsdown
yarn lint:pkg          # publint — validates the published package shape
```

### 3. Publish

Each command runs the package's `prepack` first (which rebuilds `dist/`); the `files` field then ships only `dist/` in the tarball:

```sh
yarn npm login         # one-time; needs publish rights to the @devleaf-labs scope
yarn workspace @devleaf-labs/jarspec-client npm publish
yarn workspace @devleaf-labs/jarspec-server npm publish
```

Both packages set `publishConfig.access: "public"`, so the scoped packages are published publicly.

### 4. Tag the release

```sh
git tag v2.0.0
git push --tags
```
