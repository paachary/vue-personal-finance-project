import oracledb from "oracledb";
import * as dbService from "../services/database.js";
import { CustomError } from "../util/CustomError.js";

export async function registerNewCustomer(cust) {
    const statement = `
        begin :ret := ACCOUNT_PKG.register_new_customer (
      p_user_name  => :user_name,
      p_password   => :password,
      p_first_name => :first_name,
      p_last_name  => :last_name,
      p_preferred_name => :preferred_name,
      p_gender     => :gender,
      p_dob        => :dob,
      p_email      => :email,
      p_phone_nbr  => :phone_nbr,
      p_cust_pin_code => :cust_pin_code,
      p_cust_city     => :cust_city,
      p_cust_address  => :cust_address,
      p_is_admin  => :is_admin,
      p_cust_id    => :cust_id);
        end;
    `;
    const customer = Object.assign({}, cust);

    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    customer.cust_id = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, customer, options);
    if (result.outBinds.ret === 1) {
        throw new CustomError(
            `Customer with username ${customer.user_name} already exists!`,
            409
        );
    }
    return result;
}

export async function updateCustomerDetails(cust) {
    const statement = `
        begin :ret := ACCOUNT_PKG.update_customer_details (
                            p_cust_id       => :cust_id,
                            p_phone_nbr     => :phone_nbr,
                            p_email         => :email,
                            p_cust_pin_code => :cust_pin_code,
                            p_cust_city     => :cust_city,
                            p_cust_address  => :cust_address);
        end;
    `;
    const customer = Object.assign({}, cust);

    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };

    const result = await dbService.simpleExecute(statement, customer, options);

    if (result.outBinds.ret === 1) {
        throw new CustomError(`Updating customer details failed!`, 400);
    }
    return result;
}

export async function getCustomerDetails(userName) {
    const statement = `
    begin :ret := ACCOUNT_PKG.get_customer_details (p_user_name => :user_name);end;
    `;

    const customer = Object.assign({}, {});
    customer.user_name = userName;
    customer.ret = {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT,
    };

    const options = {};
    let rows;
    try {
        rows = await dbService.cursorStmtExecute(statement, customer, options);
        return rows;
    } catch (err) {
        throw new CustomError(err.message, +err.statusCode);
    }
}

export async function validateCustomer(cust) {
    const userName = cust.userName;
    const password = cust.password;

    try {
        const rows = await getCustomerDetails(userName);
        if (rows === undefined || rows === null || rows.length === 0) {
            throw new CustomError(
                "Invalid credentails passed! Please try again!",
                401
            );
        }
        if (rows !== null) {
            if (!(await dbService.verifyPassword(password, rows[0].password))) {
                throw new CustomError(
                    "Invalid credentails passed! Please try again.",
                    401
                );
            }
        }
        return rows;
    } catch (err) {
        throw new CustomError(err.message, +err.statusCode);
    }
}

export async function getAllCustomers() {
    const statement = `
    begin :ret := ACCOUNT_PKG.get_all_customers; end;
    `;

    const customer = Object.assign({}, {});
    customer.ret = {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT,
    };

    const options = {};
    const rows = await dbService.cursorStmtExecute(
        statement,
        customer,
        options
    );
    return rows;
}

export async function getCustRefreshToken(refreshToken) {
    const statement = `
    begin :ret := ACCOUNT_PKG.get_cust_rt_xref(p_rt => :refresh_token); end;
    `;

    const customer = Object.assign({}, {});
    customer.ret = {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT,
    };

    customer.refresh_token = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: refreshToken,
    };

    const options = {};
    const rows = await dbService.cursorStmtExecute(
        statement,
        customer,
        options
    );
    return rows;
}

export async function detectReuseOfRefreshToken(userName, refreshToken) {
    const statement = `
    begin :ret := ACCOUNT_PKG.detect_reuse_of_token(p_user_name => :user_name,
                                                    p_rt => :refresh_token); end;
    `;
    const customer = Object.assign({}, {});
    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    customer.user_name = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: userName,
    };

    customer.refresh_token = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: refreshToken,
    };

    const options = {};
    const rows = await dbService.simpleExecute(statement, customer, options);
    return rows;
}

export async function setCustRefreshToken(userName, refreshToken) {
    const statement = `
    begin ACCOUNT_PKG.insert_cust_rt_xref(p_user_name => :user_name,
                                                  p_rt => :refresh_token,
                                                  p_return_status => :ret); end;
    `;

    const customer = Object.assign({}, {});

    customer.user_name = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: userName,
    };

    customer.refresh_token = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: refreshToken,
    };

    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, customer, options);
    return result;
}

export async function deleteCustRefreshTokenForUser(userName, refreshToken) {
    const statement = `
    begin ACCOUNT_PKG.delete_cust_rt_xref_for_user( p_user_name => :user_name,
                                                    p_rt => :refresh_token,
                                                    p_return_status => :ret); end;
    `;

    const customer = Object.assign({}, {});

    customer.user_name = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: userName,
    };

    customer.refresh_token = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: refreshToken,
    };

    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, customer, options);
    return result;
}

export async function deleteCustRefreshToken(refreshToken) {
    const statement = `
    begin ACCOUNT_PKG.delete_cust_rt_xref(p_rt => :refresh_token,
                                                  p_return_status => :ret); end;
    `;

    const customer = Object.assign({}, {});

    customer.refresh_token = {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: refreshToken,
    };

    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, customer, options);
    return result;
}

export async function updateLastLoggedIn(userName) {
    const statement = `
    begin ACCOUNT_PKG.update_last_logged_in(p_user_name => :user_name); end;
    `;

    const customer = Object.assign({}, { user_name: userName });

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, customer, options);
    return result;
}

export async function resetPassword(
    custId,
    enteredPassword,
    dbPassword,
    newPassword
) {
    const statement = `
    begin :ret := ACCOUNT_PKG.reset_password(p_cust_id => :cust_id,
                                             p_password => :current_password,
                                             p_new_password => :new_password); end;
    `;

    if (!(await dbService.verifyPassword(enteredPassword, dbPassword))) {
        throw new CustomError(
            "Invalid credentails passed! Please try again.",
            401
        );
    }

    const customer = Object.assign(
        {},
        {
            cust_id: custId,
            current_password: dbPassword,
            new_password: newPassword,
        }
    );
    customer.ret = {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT,
    };

    const options = {
        autoCommit: true,
    };
    const result = await dbService.simpleExecute(statement, customer, options);

    if (result.outBinds.ret === 1) {
        throw new CustomError(
            "Invalid credentails passed! Please try again.",
            401
        );
    }
    return result;
}
