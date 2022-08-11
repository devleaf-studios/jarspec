const $successBtn = document.getElementById('success-test');
const $errorBtn = document.getElementById('error-test');
const $responsePre = document.getElementById('response');

const jarspec = require('@devleaf-labs/jarspec-client');

$successBtn.addEventListener('click', async function() {
  try {
    console.log('Attempting to call /success endpoint of localhost api.');
    const res = await jarspec.jarspecRequest('http://localhost:3000/success');
    $responsePre.innerHTML = JSON.stringify(res);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});

$errorBtn.addEventListener('click', async function() {
  try {
    console.log('Attempting to call /error endpoint of localhost api.');
    const res = await jarspec.jarspecRequest('http://localhost:3000/error');
    console.log(res);
  } catch (err) {
    $responsePre.innerHTML = JSON.stringify(err);
    console.error(err);
  }
});