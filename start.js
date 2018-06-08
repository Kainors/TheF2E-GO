require('dotenv').config();
const PORT = process.env.PORT || 8888;

if(process.env.NODE_ENV){
  require('./bundle')
}

require('./app').listen(PORT, () => {
  console.log(`Server listen at ${PORT}`);
});
