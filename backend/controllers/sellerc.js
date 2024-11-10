const { SellerAcc } = require('../entity/sellerentity');

exports.sellerI = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userData = await SellerAcc.login(username, password);

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