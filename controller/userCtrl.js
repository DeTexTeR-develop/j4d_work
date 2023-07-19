const expressAsyncHandler = require('express-async-handler');
const { where } = require('sequelize');
const User = require('../models/usersModel');

const createUser = expressAsyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ where: {email:email} });
    console.log(findUser);
    if(!findUser){
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        //user already exists
        throw new Error("user already exists");

    };
});

const loginUser = expressAsyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //check if user exists or not
    const findUser = await User.findOne({ where: {email:email} });
    console.log(findUser);
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json(
            {
                id:findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                mobile: findUser?.mobile,
            }
        );
    }else{
        throw new Error("Invalid Credentials");
    }
});

const getAllUsers = expressAsyncHandler( async(req , res) => {
    try{
        const allUsers = await User.findAll();
        res.json(allUsers);
    }catch(err){
        throw new Error(err);
    }
});

const deleteUser = expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try{
        await User.destroy({where:{id:id}});
        res.json({
            msg: 'User deleted'
        });
    }catch(err){
        throw new Error(err);
    }
});

const updateUser = expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    try{
        await User.update(
            {
                firstName: req?.body?.firstName,
                lastName:req?.body?.lastName,
                email:req?.body?.email,
                mobile:req?.body?.mobile,
                password:req?.body?.password
            },{
                where:{id: id}
            }
        );
        const updatedUser = await User.findOne({where: {id: id}})
        res.json(updatedUser);
        
    }catch(err){    
        throw new Error(err);
    }

})


module.exports = {createUser, loginUser, getAllUsers, deleteUser, updateUser};
