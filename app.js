const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Testing Jenkins pipeline to docker from Ubuntu Server...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
