import * as dbApis from "../database/context.js";
import { handleError } from "../util/error.js";

export async function setApplicationContext(req, res, next) {
    try {
        await dbApis.setSessionId(req.body.custId);

        const userName = req.body.userName;
        const ctx = {
            key: "user_name",
            val: userName,
        };
        await dbApis.setContext(ctx);
        res.status(200).json({ message: "Context set successfully" });
    } catch (err) {
        handleError(err, "Error setting session ID", res, next);
    }
}

export async function clearCtxSession(req, res, next) {
    try {
        await dbApis.clearCtxSession(req.body.custId);
        await dbApis.clearContext();
        res.status(200).json({ message: "Context cleared successfully" });
    } catch (err) {
        handleError(err, "Error clearing context", res, next);
    }
}
