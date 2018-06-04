const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, './public')));
app.use('/design', express.static(path.join(__dirname, './design')));

app.listen(PORT, () => {
  console.log(`Server listen at ${PORT}`);
});
