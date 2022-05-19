const router = require("express").Router();
const passport = require("passport");
let pool = require("../config/database");

/* ------------- Begin Model Functions ------------- */

async function getUsers(pool) {
    return await pool.select().from("users");
}

/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        result = await getUsers(pool);
        res.send(result).end();
    } else {
        res.send('You are not authenticated');
    }
});

/* ------------- End Controller Functions ------------- */

module.exports = router;
