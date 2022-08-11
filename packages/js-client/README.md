# Jarspec JS/TS Client

## What is Jarspec?

The **J**SON **A**PI **R**esponse **Spec**ification (jarspec) is a new specification provided to lay a foundation for
how JSON responses from RESTful API servers should be formatted. 

You can read more about [Jarspec here...](https://github.com/devleaf-studios/jarspec)

## What is the Jarspec client

The Jarspec client (for TS/JS) extends off of the [Javascript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) with powerful type features when using with an API which returns a jarspec response. Please note this library will not work with anything other than Jarspec responses by design, as a 502 error/type error will be thrown
if the data returned does not match jarspec conventions.

## Getting Started

You can install the jarspec client using the following commands:

```bash
# NPM
npm i @devleaf-labs/jarspec-client

# Yarn
yarn add @devleaf-labs/jarspec-client
```
And then use in your code as follows:

```typescript
// Using Javascript
const jarspec = require('@devleaf-labs/jarspec-client');

jarspec.jarspecRequest('https://localhost:3000')
  .then(response => {
    console.log(response); // jarspec success response
  })
  .catch(err => {
    console.log(err); // jarspec error response
  });

// Using Typescript
import { jarspecRequest } from '@devleaf-labs/jarspec-client';

jarspecRequest<unknown>('https://localhost:3000')
  .then((res: JarspecSuccessResponse) => {
    console.log(res); // jarspec success response
    console.log(res.data); // unknown[]|null
  })
  .catch((err: JarspecErrorResponse) => {
    console.log(err); // jarspec error response.
  });
```

You can type out an expected data value using `jarspecRequest<T>()` where T is the format you expect your data returned in. The library will inteligently convert `T` into `T[]` as part of the `JarspecSuccessResponse|JarspecErrorResponse` interface.

## API

### jarspecRequest

```typescript
jarspecRequest(input: RequestInfo, init?: RequestInit) => Promise<JarspecSuccessResponse|JarspecErrorResponse>
```

The parameters supplied to the `jarspecRequest` method are the same that would be applied to the [Javascript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### JarspecSuccessResponse

```typescript
interface JarspecSuccessResponse<T = any> {
  status: 'ok';
  code: 200;
  data: T[]|null;
  id?: string;
  timestamp: string;
  version: '1.0.0';
}
```

### JarspecErrorResponse

```typescript
interface JarspecSuccessResponse<T = any> {
  status: gRPCStatus;
  code: HTTPStatus;
  message: string;
  data: T[]|null;
  id?: string;
  timestamp: string;
  version: '1.0.0';
}
```

### gRPCStatus 

```typescript
type gRPCStatus =
  'ok'|
  'invalid-argument'|
  'failed-precondition'|
  'out-of-range'|
  'unauthenticated'|
  'permission-denied'|
  'not-found'|
  'aborted'|
  'already-exists'|
  'resource-exhausted'|
  'cancelled'|
  'data-loss'|
  'unknown'|
  'internal'|
  'not-implemented'|
  'na'|
  'unavailable'|
  'deadline-exceeded';
```

### HTTPStatus

```typescript
type HTTPStatus = 
  200|
  400|
  401|
  403|
  404|
  409|
  429|
  499|
  500|
  501|
  502|
  503|
  504;
```





