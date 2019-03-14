require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const app = express();

const PORT = process.env.PORT || 8008;

app.use(compression());

app.use('/api/photos', proxy({
  target: 'http://ec2-18-222-149-148.us-east-2.compute.amazonaws.com/'
}));
app.use('/api/reserve', proxy({
  target: 'http://ec2-18-222-239-157.us-east-2.compute.amazonaws.com/'
}));
app.use('/api/:restaurantId/menu', proxy({
  target: 'http://ec2-18-223-135-231.us-east-2.compute.amazonaws.com/'
}));
app.use('/overview', proxy({
  target: 'http://ec2-3-92-162-226.compute-1.amazonaws.com/'
}));

app.use('/:id', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Listening to server at http://localhost:${PORT}`);
})