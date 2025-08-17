import * as dbService from "../services/database.js";
import { CustomError } from "../util/CustomError.js";

export async function setSessionId(custId) {
    try {
        const statement = `
        begin CTX_PKG.set_session_id (
                            p_session_id => :session_id);
        end;
    `;
        const sess = Object.assign({}, { session_id: custId });
        const options = {
            autoCommit: true,
        };
        await dbService.simpleExecute(statement, sess, options);
    } catch (err) {
        throw new CustomError(`Setting the session failed:${err.message}`, 400);
    }
}

export async function setContext(ctx) {
    try {
        const statement = `
        begin CTX_PKG.set_ctx(p_sec_level_attr => :key,
        p_sec_level_val => :val);end;`;

        const context = Object.assign({}, ctx);
        const options = {
            autoCommit: true,
        };
        await dbService.simpleExecute(statement, context, options);
    } catch (err) {
        throw new CustomError(
            `Setting the session context failed:${err.message}`,
            400
        );
    }
}

export async function clearCtxSession(custId) {
    try {
        const statement = `
        begin CTX_PKG.clear_session (
                            p_session_id => :session_id);
        end;
    `;

        const sess = Object.assign({}, { session_id: custId });
        const options = {
            autoCommit: true,
        };
        await dbService.simpleExecute(statement, sess, options);
    } catch (err) {
        throw new CustomError(
            `Clearing the session failed:${err.message}`,
            400
        );
    }
}

export async function clearContext() {
    try {
        const statement = `
        begin CTX_PKG.clear_context ;
        end;
    `;
        const options = {
            autoCommit: true,
        };
        await dbService.simpleExecute(statement, {}, options);
    } catch (err) {
        throw new CustomError(
            `Clearing the context failed:${err.message}`,
            400
        );
    }
}
