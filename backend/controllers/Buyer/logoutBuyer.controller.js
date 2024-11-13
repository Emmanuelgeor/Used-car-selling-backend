class LogoutBuyerController {
    processLogout(req, res) {
        res.status(200).json({ message: 'Logged out successfully' });
    }
}

module.exports = new LogoutBuyerController();
