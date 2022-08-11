# Jarspec JS/TS/NodeJS Server

## What is Jarspec?

The **J**SON **A**PI **R**esponse **Spec**ification (jarspec) is a new specification provided to lay a foundation for
how JSON responses from RESTful API servers should be formatted. 

You can read more about [Jarspec here...](https://github.com/devleaf-studios/jarspec)

## What is the Jarspec server

The Jarspec server (for NodeJS/Express [TS/JS]) is a library built to allow creating jarspec responses easier. The library contains methods for generating jarspec JSON as well as an express middleware method for using with [expressJS](https://expressjs.com/).

## Getting Started

You can install the jarspec client using the following commands:

```bash
# NPM
npm i @devleaf-labs/jarspec-server

# Yarn
yarn add @devleaf-labs/jarspec-server
```
And then use in your code as follows with ExpressJS:

```typescript
// Using Javascript
const jserver = require('@devleaf-labs/jarspec-server');
const Jarspec = jserver.Jarspec;

// Using Typescript
import { Jarspec } from '@devleaf-labs/jarspec-server';

// Use middleware in express
app.use(Jarspec.expressMiddleware);

// create success route
app.get('/success', function(req, res) {
  return res.jarspec.success(/*...*/);
});

// create error route
app.get('/error', function(req, res) {
  return res.jarspec.error(/*...*/);
});
```

Alternatively, you can use jarspec on any NodeJS server as follows:

```typescript
// Using Javascript
const jserver = require('@devleaf-labs/jarspec-server');
const Jarspec = jserver.Jarspec;

// Using Typescript
import { Jarspec } from '@devleaf-labs/jarspec-server';

// Create Jarspec Success
const successResponse = Jarspec.success(/*...*/);

// Create Jarspec Error
const errorResponse = Jarspec.error(/*...*/);
```

Note: If using jarspec on a **non-Express server**, you will need to remember to set the `Content-Type` header and http code correctly, as the methods used above only act as builders for a Jarspec JSON variable.

## API

### Success

```typescript
success<T>(data?: any[], id?: string): JarspecSuccessResponse;
```

### Error

```typescript
error<T>(rpcCode: gRPCStatus, message: string, id?: string, data?: any[], error: any): JarspecErrorResponse;
```

### Express Middleware

```typescript
expressMiddleware(req: any, res: any, next: any): void;
```

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





