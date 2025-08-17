import oracledb from "oracledb";
import * as dbService from "../services/database.js";

export async function getInstrumentTypes() {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_instrument_types;
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

export async function getInstrumentType(instrumentTypeId) {
    const statement = `
        begin :ret := ACCOUNT_PKG.get_instrument_type(p_instrument_type_id => :instrument_type_id);
        end;
    `;

    const binds = {
        ret: {
            type: oracledb.CURSOR,
            dir: oracledb.BIND_OUT,
        },
        instrument_type_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: instrumentTypeId,
        },
    };
    const options = {};
    const rows = await dbService.cursorStmtExecute(statement, binds, options);
    return rows;
}

export async function registerInstrumentType(instrumentTypeDtls) {
    const statement = `
        begin :ret := ACCOUNT_PKG.register_instrument_type(
                p_instrument_type_cd => :instrument_type_cd,
                p_instrument_type_desc => :instrument_type_desc,
                p_instrument_type_id   => :instrument_type_id);
        end;
    `;
    const instrumentType = Object.assign({}, instrumentTypeDtls);

    instrumentType.instrument_type_id = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    instrumentType.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(
        statement,
        instrumentType,
        options
    );

    return result;
}

export async function updateInstrumentType(instrumentTypeDtls) {
    const statement = `
        begin ACCOUNT_PKG.update_instrument_type(
            p_instrument_type_id => :instrument_type_id,
            p_instrument_type_desc => :instrument_type_desc);
        end;
    `;
    const instrumentType = Object.assign({}, instrumentTypeDtls);

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(
        statement,
        instrumentType,
        options
    );
    return result;
}
export async function deleteInstrumentType(instrumentTypeId) {
    const statement = `
        begin ACCOUNT_PKG.delete_instrument_type(p_instrument_type_id => :instrument_type_id);
        end;
    `;
    const binds = {
        instrument_type_id: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_IN,
            val: instrumentTypeId,
        },
    };
    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, binds, options);
    return result;
}
