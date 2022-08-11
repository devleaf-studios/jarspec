var express = require('express');
var cors = require('cors');
var app = express();

// require jarspec middleware
var jarspec = require('@devleaf-labs/jarspec-server').Jarspec;

// add middleware
app.use(express.json());
app.use(cors());
app.use(jarspec.expressMiddleware);

// create success route
app.get('/success', function(req, res) {
  return res.jarspec.success([{
    message: 'Hello World'
  }], '12345-12345-12345-12345');
});

// create error route
app.get('/error', function(req, res) {
  return res.jarspec.error(
    'invalid-argument',
    'This is an error message to present to the client.',
    '12345-12345-12345-12345',
    [{ fields: [ '.username' ] }],
    new Error('An example traceback for where the problem occurred.')
  );
});

// listen on 3000 and start the server.
app.listen(3000, function() {
  console.log('Demo API service started on http://localhost:3000');
});