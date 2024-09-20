const express = require("express");
const router = express.Router();

//controller
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeStatus,
  changeRole,
} = require("../controllers/users");

//middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoints http://localhost:5000/api/users
//@Methods GET
//@Access Private
router.get("/users", auth, adminCheck, listUsers);

//@Endpoints http://localhost:5000/api/users:id
//@Methods GET
//@Access Private
router.get("/users/:id", readUsers);

//@Endpoints http://localhost:5000/api/users:id
//@Methods PUT
//@Access Private
router.put("/users/:id", auth, adminCheck, updateUsers);

//@Endpoints http://localhost:5000/api/users:id
//@Methods DELETE
//@Access Private
router.delete("/users/:id", removeUsers);

//@Endpoints http://localhost:5000/api/change-status
//@Methods POST
//@Access Private
router.post("/change-status", auth, adminCheck, changeStatus);

//@Endpoints http://localhost:5000/api/change-role
//@Methods POST
//@Access Private
router.post("/change-role", auth, adminCheck, changeRole);

module.exports = router;
