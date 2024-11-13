class LogoutCarAgentController {
    processLogout(req, res) {
        // Since JWTs are stateless, the frontend should handle the removal of the token.
        res.status(200).json({ message: 'Logged out successfully' });
    }
}

module.exports = new LogoutCarAgentController();
