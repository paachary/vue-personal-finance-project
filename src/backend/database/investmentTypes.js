import oracledb from "oracledb";
import * as dbService from "../services/database.js";

export async function getInvestmentTypes() {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_investment_types;
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

export async function getInvestmentType(investmentTypeId) {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_investment_type(p_investment_type_id => :investment_type_id);
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
        investment_type_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: investmentTypeId,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function registerInvestmentType(investmentTypeDtls) {
    const statement = `
        begin :ret := ACCOUNT_PKG.register_investment_type(
                p_investment_type_cd => :investment_type_cd,
                p_investment_type_desc => :investment_type_desc,
                p_investment_type_id   => :investment_type_id);
        end;
    `;
    const investmentType = Object.assign({}, investmentTypeDtls);

    investmentType.investment_type_id = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    investmentType.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(
        statement,
        investmentType,
        options
    );

    return result;
}

export async function updateInvestmentType(investmentTypeDtls) {
    const statement = `
        begin ACCOUNT_PKG.update_investment_type(
            p_investment_type_id => :investment_type_id,
            p_investment_type_desc => :investment_type_desc);
        end;
    `;
    const investmentType = Object.assign({}, investmentTypeDtls);

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(
        statement,
        investmentType,
        options
    );
    return result;
}

export async function deleteInvestmentType(investmentTypeId) {
    const statement = `
        begin ACCOUNT_PKG.delete_investment_type(p_investment_type_id => :investment_type_id);
        end;
    `;
    const binds = {
        investment_type_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: investmentTypeId,
        },
    };
    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, binds, options);
    return result;
}
