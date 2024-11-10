// controllers/adminc.js
const UserAcc = require('../entity/adminentity');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Call the entity's method to authenticate the user
        const userData = await UserAcc.loginUser(username, password);

        // Respond with user data and JWT token 
        res.json({
            user: {
                id: userData.id,
                username: userData.username,
                role: userData.role
            },
            token: userData.token
        });
    } catch (error) {
        res.status(401).json({ error: error.message }); 
    }
};

