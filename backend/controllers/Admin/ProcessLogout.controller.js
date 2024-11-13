class ProcessLogoutController {
    processLogout(req, res) {
        // Invalidate user session or JWT token (frontend should handle this)
        res.status(200).json({ message: 'Logged out successfully' });
    }
}

module.exports = new ProcessLogoutController();
