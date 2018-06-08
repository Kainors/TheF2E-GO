require('dotenv').config();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8888;

const isWebpackBundled = fs.existsSync(path.join(__dirname,'./public/dist'));

new Promise((resolve, reject) => {
  if (process.env.NODE_ENV && !isWebpackBundled) {
    require('./bundle').run((err, status) => {
      if (err) reject(err);
      resolve();
    });
  } else {
    resolve();
  }
}).then(() => {
  require('./app').listen(PORT, () => {
    console.log(`Server listen at ${PORT}`);
  });
})
