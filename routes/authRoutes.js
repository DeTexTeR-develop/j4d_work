const router = require('express').Router(); 
const {createUser, loginUser, getAllUsers, deleteUser, updateUser} = require('../controller/userCtrl');

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;