const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'users'
});

User.addHook('beforeValidate', async function (user){
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

console.log(User === sequelize.models.User);

module.exports = User;