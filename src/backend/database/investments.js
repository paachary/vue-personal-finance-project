import oracledb from "oracledb";
import * as dbService from "../services/database.js";

// Retrieves investment details by investment ID
// Returns a cursor with investment details
//
// Parameters:
// - investmentId: The ID of the investment to retrieve details for
//
// Returns:
// - A cursor containing the investment details
//     return rows;

export async function getInvestmentDetails(investmentId) {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_investment_details(p_investment_id => :investment_id);
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
        investment_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: investmentId,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

// Retrieves savings for a specific account
// Returns a cursor with savings details for the account
// Parameters:
// - accountNumber: The account number to retrieve savings for
// Returns:
// - A cursor containing the savings details for the account

export async function getSavingsForAccount(accountNumber) {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_savings_for_account(p_account_nbr => :account_number);
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
        account_number: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: accountNumber,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);

    return rows;
}

// Registers a new savings investment
// Returns the result of the registration, including the investment ID

export async function registerSavings(savingDtls) {
    const statement = `
        begin  ACCOUNT_PKG.register_savings_for_account(
                p_account_nbr           => :account_number,
                p_instrument_type       => :instrument_type,
                p_instrument_id         => :instrument_id,
                p_instrument_name       => :instrument_name,
                p_instrument_assoc_bank => :instrument_assoc_bank,
                p_investment_amount     => :investment_amount,
                p_investment_type       => :investment_type,
                p_investment_dt         => :investment_dt,
                p_expiration_dt         => :expiration_dt,
                p_active_flag           => :active_flag,
                p_investment_id         => :investment_id);
        end;
    `;
    const saving = Object.assign({}, savingDtls);

    saving.investment_id = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, saving, options);

    return result;
}

export async function updateInvestment(investmentDtls) {
    const statement = `
        begin  ACCOUNT_PKG.update_investment_details(p_investment_id => :investment_id,
                                       p_expiration_dt => :expiration_date,
                                       p_active_flag => :investment_status);
        end;
    `;
    const investment = Object.assign({}, investmentDtls);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(
        statement,
        investment,
        options
    );

    return result;
}

export async function deleteInvestment(investmentDtls) {
    const statement = `
        begin  ACCOUNT_PKG.delete_investment(p_investment_id => :investment_id);
        end;
    `;
    const investment = Object.assign({}, investmentDtls);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(
        statement,
        investment,
        options
    );

    return result;
}

// Retrieves all investments for all users for a username
export async function getAllInvestmentsForUser(userName) {
    const statement =
        userName !== ""
            ? `
        begin :ret := ACCOUNT_PKG.get_savings_for_user(p_user_name => :user_name);
        end;
    `
            : `
        begin :ret := ACCOUNT_PKG.get_savings_for_user;
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };

    if (userName !== "") {
        binds.user_name = {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: userName,
        };
    }
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function getActiveInvestmentSummary(userName = "") {
    const statement =
        userName !== ""
            ? `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary(p_user_name => :user_name);
        end;
    `
            : `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary;
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };

    if (userName !== "") {
        binds.user_name = {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: userName,
        };
    }
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function getActiveInvestmentSummaryForInvestmentType(
    userName = ""
) {
    const statement =
        userName !== ""
            ? `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary_for_inv_type(p_user_name => :user_name);
        end;
    `
            : `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary_for_inv_type;
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };

    if (userName !== "") {
        binds.user_name = {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: userName,
        };
    }
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function getActiveInvestmentSummaryForInstrumentType(
    userName = ""
) {
    const statement =
        userName !== ""
            ? `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary_for_instr_type(p_user_name => :user_name);
        end;
    `
            : `
        begin :ret := ACCOUNT_PKG.get_active_investment_summary_for_instr_type;
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
    };

    if (userName !== "") {
        binds.user_name = {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: userName,
        };
    }
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function getMonthlyDebitSummary() {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_monthly_debit_summary;
        end;`;

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
