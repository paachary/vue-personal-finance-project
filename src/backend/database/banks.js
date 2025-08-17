import oracledb from "oracledb";
import * as dbService from "../services/database.js";

export async function getBankDetails() {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_banks_details();
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

export async function registerBank(bnk) {
    const statement = `
        begin :ret := ACCOUNT_PKG.insert_bank_details(
                          p_bank_name => :bank_name, 
                            p_branch_name => :branch_name, 
                            p_bank_city => :bank_city, 
                            p_bank_pin_code => :bank_pin_code, 
                            p_bank_abbr => :bank_abbr,
                            p_bank_address => :bank_address);
        end;
    `;
    const bank = Object.assign({}, bnk);

    bank.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, bank, options);

    return result;
}

export async function updateBankDetails(bnk) {
    const statement = `
        begin  ACCOUNT_PKG.update_bank_details(
                          p_bank_id => :bank_id, 
                          p_bank_pin_code => :bank_pin_code, 
                          p_bank_abbr => :bank_abbr,
                          p_bank_address => :bank_address);
        end;
    `;
    const bank = Object.assign({}, bnk);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, bank, options);

    return result;
}

export async function deleteBankDetails(bnk) {
    const statement = `
        begin  ACCOUNT_PKG.delete_bank_details(
                          p_bank_id => :bank_id);
        end;
    `;
    const bank = Object.assign({}, bnk);

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, bank, options);

    return result;
}
