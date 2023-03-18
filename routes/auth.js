const {login, register} = require("../Controllers/auth")
const {Router} = require("express")
const router = Router();
router.post("/signup", register);
router.post("/login", login);

module.exports = router;