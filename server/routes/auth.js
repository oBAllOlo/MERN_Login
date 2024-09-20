const express = require("express");
const router = express.Router();

//controller
const {
  register,
  login,
  listUser,
  editUser,
  deleteUser,
  currentUser,
} = require("../controllers/auth");

//middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoints http://localhost:3000/api/register
//@Methods POST
//@Access Public
router.post("/register", register);

//@Endpoints http://localhost:3000/api/login
//@Methods POST
//@Access Public
router.post("/login", login);

//@Endpoints http://localhost:3000/api/current-user
//@Methods POST
//@Access Private
router.post("/current-user", auth, currentUser);

//@Endpoints http://localhost:3000/api/current-admin
//@Methods POST
//@Access Private
router.post("/current-admin", auth, adminCheck, currentUser);

//@Endpoints http://localhost:3000/api/auth
//@Methods GET
//@Access Public
router.get("/auth", listUser);

//@Endpoints http://localhost:3000/api/auth
//@Methods PUT
//@Access Public
router.put("/auth", editUser);

//@Endpoints http://localhost:3000/api/auth
//@Methods DELETE
//@Access Public
router.delete("/auth", deleteUser);

module.exports = router;
