var Sequelize = require('sequelize');
const sequelize = new Sequelize('j4d-work', 'detexter', '12345', { //enter your username and pass 
    host: 'localhost',
    dialect: 'postgres'
  });

  sequelize.authenticate()
    .then(() => {
        console.log('Db connected!!');
    })
    .catch((err) => {
        console.log('something went wrong', err);
    });
module.exports = sequelize;