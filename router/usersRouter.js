const router = require('express').Router();
const { getAllUsers, getOneUser, deleteUser, createUser, updateUser, bodyChecker, idChecker} = require('../controller/usersController');

router.param('id', idChecker)
router.route('/').get(getAllUsers).post(bodyChecker,createUser);
router.route('/:id').get(getOneUser).delete(deleteUser).put(updateUser);

module.exports = router