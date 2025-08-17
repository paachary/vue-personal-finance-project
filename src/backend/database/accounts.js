import oracledb from "oracledb";
import * as dbService from "../services/database.js";

export async function getAllAccounts() {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_all_accounts();
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function registerAccount(acct) {
    const statement = `
        begin ACCOUNT_PKG.set_account_details(
                          p_cust_id => :cust_id, 
                            p_bank_id => :bank_id, 
                            p_account_nbr => :account_nbr,
                            p_preferred_name => :preferred_name,
                            p_status => :status);
        end;
    `;

    const account = Object.assign({}, acct);

    account.status = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, account, options);

    return result;
}
// export async function getAccounts() {
//     const statement = `
//         begin :ret := ACCOUNT_PKG.get_all_accounts();
//         end;
//     `;

//     const binds = {
//         ret: {
//             type: oracledb.CURSOR,
//             dir: oracledb.BIND_OUT,
//         },
//     };
//     const options = {};
//     const rows = await dbService.cursorStmtExecute(statement, binds, options);
//     return rows;
// }

export async function updateAccountDetails(acct) {
    const statement = `
        begin  ACCOUNT_PKG.update_account_details(
                          p_account_nbr => :account_nbr,
                          p_preferred_name => :preferred_name);
        end;
    `;
    const acctDtls = Object.assign({}, acct);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, acctDtls, options);

    return result;
}

export async function deleteAccountDetails(acct) {
    const statement = `
        begin  ACCOUNT_PKG.delete_account(
                          p_account_nbr => :account_nbr);
        end;
    `;
    const acctDtls = Object.assign({}, acct);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, acctDtls, options);

    return result;
}

export async function getAllAccountsForCust(userName) {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_all_accounts_for_cust(
                          p_user_name => :user_name);
        end;
    `;

    const binds = {
        user_name: userName,
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}
