class ProcessLogoutController {
    async processLogout(req, res) {
        try {
            // Call the logout function
            await processLogout(req);
            res.redirect('/login');
        } catch (err) {
            console.error( err);
        }
    }
}
module.exports = new ProcessLogoutController();
