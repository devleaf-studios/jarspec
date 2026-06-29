# **J**SON **A**PI **R**esponse **Spec**ification (jarspec)

## What is Jarspec?

The **J**SON **A**PI **R**esponse **Spec**ification (jarspec) is a new specification provided to lay a foundation for
how JSON responses from RESTful API servers should be formatted. 

## Why was Jarspec created?

Managing data provided from your API to your client can be difficult, especially without a specification in place for 
your API's JSON to conform to. Therefore, Jarspec was created to help unify the API to client process in a simplified but extensible way. The consistent format helps you focus more on managing your data rather than spending time in attempting to decide what response structure to use between your Front End and Back End Teams. 

We developed Jarspec to conform to existing and well-known standards to help implementation to become as simple as possible.

## Example responses

A response from Jarspec can either be a success or an error.

### An example Jarspec Success Response:

A collection is returned as an array of data:
```json
{
  "status": "ok",
  "code": 200,
  "data": [
    "...any success data here"
  ],
  "timestamp": "2022-08-10T16:17:25.620Z",
  "version": "2.0.0"
}
```

A single resource may be returned directly as an object (it must be an object, not a primitive):
```json
{
  "status": "ok",
  "code": 200,
  "data": {
    "id": "user_123",
    "name": "Ada Lovelace"
  },
  "timestamp": "2022-08-10T16:17:25.620Z",
  "version": "2.0.0"
}
```

### An example Jarspec Error Response:
```json
{
  "status": "invalid-argument",
  "code": 400,
  "data": [
    "...any error data here"
  ],
  "message": "One or more supplied arguments are invalid.",
  "timestamp": "2022-08-10T16:17:25.620Z",
  "version": "2.0.0"
}
```

## Interfaces/Types
### Success Response

Properties the JSON response can contain for a successful response.

| Name | Type | Description | Required |
|--|--|--|--|
| Status | 'ok'| The 'ok' gRPC status code | ✅ |
| Code | 20X | A 20X HTTP status code | ✅ |
| Data | T\|T[]\|null | A single object, an array (of objects or primitives), or null. A single value must be an object — not a primitive | ✅ |
| ID | string | An optional ID to link the response to a request within the API. If supplied this should be logged | - |
| timestamp | string | An ISO timestamp of when the response was supplied | ✅ |
| version | string | A semver string of the Jarspec version being used | ✅ |

### Error Response

Properties the JSON response can contain for an error response.

| Name | Type | Description | Required |
|--|--|--|--|
| Status | gRPC Status | Any of the gRPC status codes | ✅ |
| Code | 4XX - 5XX | A HTTP code matching the gRPC status | ✅ |
| Message | string | A friendly message to present back to the caller | ✅ |
| Data | T\|T[]\|null | A single object, an array (of objects or primitives) of data/metadata, or null. A single value must be an object — not a primitive | ✅ |
| ID | string | An optional ID to link the response to a request within the API. If supplied this should be logged | - |
| timestamp | string | An ISO timestamp of when the response was supplied | ✅ |
| version | string | A semver string of the Jarspec version being used | ✅ |

### gRPC/HTTP Statuses

The gRPC/HTTP status combination ensures most clients compatibility with the response. We have utilised [Google Cloud API](https://cloud.google.com/apis/design/errors#handling_errors) standards for a well estabilished pattern.

| gRPC Status | HTTP Code | Type | Description |
|--|--|--|--|
| ok | 200 | Success | Success. No Error. |
| invalid-argument | 400 | Client Error | Client specified an invalid argument. Check error message and error details for more information. |
| failed-precondition | 400 | Client Error | Request can not be executed in the current system state, such as deleting a non-empty directory. |
| out-of-range | 400 | Client Error | Client specified an invalid range. |
| unauthenticated | 401 | Client Error | Request not authenticated due to missing, invalid, or expired token. |
| permission-denied | 403 | Client Error | Client does not have sufficient permission. |
| not-found | 404 | Client Error | A specified resource is not found. |
| aborted | 409 | Client Error | Concurrency conflict, such as read-modify-write conflict. |
| already-exists | 409 | Client Error | The resource that a client tried to create already exists. |
| resource-exhausted | 429 | Client Error | Either out of resource quota or reaching rate limiting. |
| cancelled | 499 | Client Error | Request cancelled by the client. |
| data-loss | 500 | Server Error | Unrecoverable data loss or data corruption. The client should report the error to the user. |
| unknown | 500 | Server Error | Unknown server error. Typically a server bug. |
| internal | 500 | Server Error | Internal server error. Typically a server bug. |
| not-implemented | 501 | Server Error | API method not implemented by the server. |
| na | 502 | Client/Server Error | Network error occurred before reaching the server. Typically a network outage or misconfiguration. |
| unavailable | 503 | Server Error | Service unavailable. Typically the server is down. |
| deadline-exceeded | 504 | Server Error | Request deadline exceeded. This will happen only if the caller sets a deadline that is shorter than the method's default deadline (i.e. requested deadline is not enough for the server to process the request) and the request did not finish within the deadline. |

## Jarspec libraries

| Name | Language | Client/Server | Link |
|--|--|--|--|
| js-client | Typescript/Javascript | Client | [npm](https://www.npmjs.com/package/@devleaf-labs/jarspec-client) |
| js-server | NodeJS (Express) | Server | [npm](https://www.npmjs.com/package/@devleaf-labs/jarspec-server) |

## Releasing the libraries

The libraries live in this Yarn workspaces monorepo and are published to npm independently. Each package is built with [tsdown](https://tsdown.dev) into a dual ESM + CommonJS bundle (`.mjs`/`.cjs` + `.d.mts`/`.d.cts`). `dist/` is **git-ignored** and rebuilt automatically at publish time by each package's `prepack` script, so there is nothing built to commit.

### 1. Bump the version

Update the version everywhere and keep the values in sync:

- the package versions in `packages/js-client/package.json`, `packages/js-server/package.json` (and the root `package.json`, which tracks the spec version)
- the spec `version` literal the libraries emit — `common/@types/CommonResponse.ts` and its mirrored copies under each `packages/*/src/common`, the `version` value in each `packages/*/src/index.ts`, and the examples + **Latest jarspec version** at the bottom of this README

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

## Additional Thoughts/Questions

**Why can data be an object or an array?**

> A single resource can be returned directly as a typed object (for example `data: User` for a "get one" request), so the caller no longer has to unwrap a one-element array (`data[0]`). Collections — and lists of primitives such as `string[]` or `number[]` — are still returned as an array. The one rule is that a single (non-array) value must be an object, never a bare primitive, which keeps responses predictable while supporting both shapes. `data` may also be `null`.

**Submitting changes for Jarspec**

> We accept all comments in making jarspec better. Currently our specification has been tested and confirmed to work in numerous [Typescript](https://www.typescriptlang.org/) and [Javascript](https://www.javascript.com/) projects, however we understand others may suggest even better ideas for the spec. Remember though, jarspec is only a guideline and not a fixed ruleset, so small changes working for only your project should be implemented by yourself rather than suggesting the whole specification be updated. We also request that and requests to change the specification follow the conventions set out already, being: simple, extensible and estabilished.

**Submitting client/server libraries**

> We keep a list of all client/server libraries for jarspec in a table above. However if you are programming in a language or framework that currently does not have a specific library and would like to create one, we encourage you to do so and submit a pull request linking the library and specifying the language in the table above. Once we have confirmed the library is functional we will add it to the readme.

## Latest jarspec version:
**2.0.0**

