const { AgentAcc } = require('../entity/agententity');

exports.usedcarI = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userData = await AgentAcc.login(username, password);

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