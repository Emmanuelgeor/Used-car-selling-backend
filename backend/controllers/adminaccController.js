const UserAcc = require('../entity/adminentity'); // Import entity


// CreateAccC
exports.CreateAccC = async (req, res, next) => {
    const { username, password, role } = req.body;

    try {
        await UserAcc.createAccount(username, password, role); // Trigger entity logic
        next(); // Pass control to the next middleware
    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
};

//ViewAccC
exports.ViewAccC = async (req, res, next) => {
    try {
        await UserAcc.viewAllAccounts(); // Trigger entity logic
        next();
    } catch (error) {
        next(error);
    }
};

// UpdateAccC
exports.UpdateAccC = async (req, res, next) => {
    const { id } = req.params;
    const { username, role } = req.body;

    try {
        await UserAcc.updateAccount(id, { username, role }); // Trigger entity method
        next();
    } catch (error) {
        next(error);
    }
};

// SuspendAccC
exports.SuspendAccC = async (req, res, next) => {
    const { id } = req.params;

    try {
        await UserAcc.suspendAccount(id); // Trigger entity method
        next();
    } catch (error) {
        next(error);
    }
};

// SearchAccC
exports.SearchAccC = async (req, res, next) => {
    const { username } = req.query;

    try {
        await UserAcc.searchAccount(username); // Trigger entity method
        next();
    } catch (error) {
        next(error);
    }
};