--------------------------------------------------------
--  DDL for Package ACCOUNT_PKG
--------------------------------------------------------

create or replace editionable package "ACCOUNT_PKG" as
   function get_all_accounts return sys_refcursor;

   function get_all_accounts_for_cust (
      p_user_name in customers.user_name%type
   ) return sys_refcursor;

   function get_account_details (
      p_account_nbr in account_holders.account_nbr%type
   ) return sys_refcursor;

   function get_preferred_names return sys_refcursor;

   procedure set_account_details (
      p_cust_id        in account_holders.cust_id%type default 0,
      p_bank_id        in account_holders.bank_id%type,
      p_account_nbr    in account_holders.account_nbr%type,
      p_preferred_name in account_holders.preferred_name%type,
      p_status         out number
   );

   procedure update_account_details (
      p_account_nbr    in account_holders.account_nbr%type,
      p_preferred_name in account_holders.preferred_name%type
   );

   procedure delete_account (
      p_account_nbr in account_holders.account_nbr%type
   );

   function get_savings_for_account (
      p_account_nbr in account_holders.account_nbr%type
   ) return sys_refcursor;

   function get_savings_for_user (
      p_user_name in account_investment_details_vw.user_name%type default null
   ) return sys_refcursor;


   function get_investment_details (
      p_investment_id account_investment_details_vw.investment_id%type
   ) return sys_refcursor;

   procedure close_investment (
      p_investment_id account_investment_details_vw.investment_id%type
   );

   procedure update_investment_details (
      p_investment_id account_investment_details_vw.investment_id%type,
      p_expiration_dt in account_investment_details_vw.expiration_dt%type,
      p_active_flag   in account_investment_details_vw.active_flag%type
   );

   procedure delete_investment (
      p_investment_id account_investment_details_vw.investment_id%type
   );

   procedure register_savings_for_account (
      p_account_nbr           in investment_details.account_nbr%type,
      p_instrument_type       in investment_details.instrument_type%type,
      p_instrument_id         in investment_details.instrument_id%type,
      p_instrument_name       in investment_details.instrument_name%type,
      p_instrument_assoc_bank in investment_details.instrument_assoc_bank%type,
      p_investment_amount     in investment_details.investment_amt%type,
      p_investment_type       in investment_details.investment_type%type,
      p_investment_dt         in investment_details.investment_dt%type,
      p_expiration_dt         in investment_details.expiration_dt%type,
      p_active_flag           in investment_details.active_flag%type,
      p_investment_id         out investment_details.investment_id%type
   );


    --   function get_bank_details return sys_refcursor;

   function get_banks_details return sys_refcursor;

   function get_bank_details (
      p_bank_id in banks_master.bank_id%type
   ) return sys_refcursor;

   procedure update_bank_details (
      p_bank_id       in banks_master.bank_id%type,
      p_bank_abbr     in banks_master.bank_abbr%type,
      p_bank_pin_code in banks_master.bank_pin_code%type,
      p_bank_address  in banks_master.bank_address%type
   );

   function insert_bank_details (
      p_bank_name     banks_master.bank_name%type,
      p_branch_name   banks_master.branch_name%type,
      p_bank_city     banks_master.bank_city%type,
      p_bank_pin_code banks_master.bank_pin_code%type,
      p_bank_abbr     banks_master.bank_abbr%type,
      p_bank_address  banks_master.bank_address%type
   ) return number;


   procedure delete_bank_details (
      p_bank_id banks_master.bank_id%type
   );

   function get_instrument_types return sys_refcursor;

   function get_instrument_type (
      p_instrument_type_id in instrument_types.instrument_type_id%type
   ) return sys_refcursor;

   procedure update_instrument_type (
      p_instrument_type_id   in instrument_types.instrument_type_id%type,
      p_instrument_type_desc in instrument_types.instrument_type_desc%type
   );

   procedure delete_instrument_type (
      p_instrument_type_id in instrument_types.instrument_type_id%type
   );

   function register_instrument_type (
      p_instrument_type_cd   in instrument_types.instrument_type_cd%type,
      p_instrument_type_desc in instrument_types.instrument_type_desc%type,
      p_instrument_type_id   out instrument_types.instrument_type_id%type
   ) return number;


   function get_investment_types return sys_refcursor;

   function get_investment_type (
      p_investment_type_id in investment_types.investment_type_id%type
   ) return sys_refcursor;

   procedure update_investment_type (
      p_investment_type_id   in investment_types.investment_type_id%type,
      p_investment_type_desc in investment_types.investment_type_desc%type
   );

   procedure delete_investment_type (
      p_investment_type_id in investment_types.investment_type_id%type
   );

   function register_investment_type (
      p_investment_type_cd   in investment_types.investment_type_cd%type,
      p_investment_type_desc in investment_types.investment_type_desc%type,
      p_investment_type_id   out investment_types.investment_type_id%type
   ) return number;


   function get_monthly_debit_summary return sys_refcursor;

   function get_active_investment_summary (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor;

   function get_active_investment_summary_for_instr_type (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor;

   function get_active_investment_summary_for_inv_type (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor;

   function get_customer_details (
      p_user_name in customers.user_name%type
   ) return sys_refcursor;


   function customer_exists (
      p_user_name in customers.user_name%type
   ) return number;

   function register_new_customer (
      p_user_name      in customers.user_name%type,
      p_password       in customers.password%type,
      p_first_name     in customers.first_name%type,
      p_last_name      in customers.last_name%type,
      p_preferred_name in customers.preferred_name%type,
      p_gender         in customers.gender%type,
      p_dob            in customers.dob%type,
      p_email          in customers.email%type,
      p_phone_nbr      in customers.phone_nbr%type,
      p_cust_pin_code  in customers.cust_pin_code%type,
      p_cust_city      in customers.cust_city%type,
      p_cust_address   in customers.cust_address%type,
      p_is_admin       in customers.is_admin%type,
      p_cust_id        out customers.cust_id%type
   ) return number;

   function update_customer_details (
      p_cust_id       in customers.cust_id%type,
      p_phone_nbr     in customers.phone_nbr%type,
      p_email         in customers.email%type,
      p_cust_pin_code in customers.cust_pin_code%type,
      p_cust_city     in customers.cust_city%type,
      p_cust_address  in customers.cust_address%type
   ) return number;

   procedure update_last_logged_in (
      p_user_name      in customers.user_name%type,
      p_last_logged_in in date default sysdate
   );

   function reset_password (
      p_cust_id      in customers.cust_id%type,
      p_password     in customers.password%type,
      p_new_password in customers.password%type
   ) return number;

   function get_all_customers return sys_refcursor;

   function get_cust_rt_xref (
      p_rt customer_refresh_token_xref.refresh_token%type
   ) return sys_refcursor;

   function detect_reuse_of_token (
      p_user_name customers.user_name%type,
      p_rt        customer_refresh_token_xref.refresh_token%type
   ) return number;

   procedure delete_cust_rt_xref (
      p_rt            customer_refresh_token_xref.refresh_token%type,
      p_return_status out number
   );


   procedure delete_cust_rt_xref_for_user (
      p_user_name     customers.user_name%type,
      p_rt            customer_refresh_token_xref.refresh_token%type default null,
      p_return_status out number
   );

   procedure insert_cust_rt_xref (
      p_user_name     customers.user_name%type,
      p_rt            customer_refresh_token_xref.refresh_token%type,
      p_return_status out number
   );

end account_pkg;
/