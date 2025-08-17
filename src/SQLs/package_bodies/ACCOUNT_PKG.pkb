--------------------------------------------------------
--  DDL for Package Body ACCOUNT_PKG
--------------------------------------------------------

create or replace editionable package body "ACCOUNT_PKG" as


    /* 
    Account Entity
    */
   function get_all_accounts return sys_refcursor as
      accounts_cur sys_refcursor;
   begin
      open accounts_cur for select cust_id as "custId",
                                   bank_id as "bankId",
                                   bank_name as "bankName",
                                   branch_name as "branchName",
                                   bank as "bank",
                                   bank_city as "bankCity",
                                   bank_pin_code as "bankPinCode",
                                   bank_address as "bankAddress",
                                   account_nbr as "accountNumber",
                                   first_name as "firstName",
                                   last_name as "lastName",
                                   preferred_name as "preferredName",
                                   cust_address as "custAddress",
                                   email as "email",
                                   phone_nbr as "phoneNbr",
                                   cust_pin_code as "custPinCode"
                              from account_holder_details;

      return accounts_cur;
   end;

   function get_all_accounts_for_cust (
      p_user_name in customers.user_name%type
   ) return sys_refcursor is
      lv_cust_accounts sys_refcursor;
   begin
      open lv_cust_accounts for select cust_id as "custId",
                                       bank_id as "bankId",
                                       bank_name as "bankName",
                                       branch_name as "branchName",
                                       bank as "bank",
                                       bank_city as "bankCity",
                                       bank_pin_code as "bankPinCode",
                                       bank_address as "bankAddress",
                                       account_nbr as "accountNumber",
                                       first_name as "firstName",
                                       last_name as "lastName",
                                       preferred_name as "preferredName",
                                       last_logged_in as "lastLoggedIn"
                                                            from account_holder_details
                                 where user_name = p_user_name;
      return lv_cust_accounts;
   end;

   function get_account_details (
      p_account_nbr in account_holders.account_nbr%type
   ) return sys_refcursor as
      accounts_cur sys_refcursor;
   begin
      open accounts_cur for select cust_id as "custId",
                                   bank_id as "bankId",
                                   bank_name as "bankName",
                                   branch_name as "branchName",
                                   bank_city as "bankCity",
                                   bank as "bank",
                                   bank_pin_code as "bankPinCode",
                                   bank_address as "bankAddress",
                                   account_nbr as "accountNumber",
                                   first_name as "firstName",
                                   last_name as "lastName",
                                   preferred_name as "preferredName",
                                   phone_nbr as "phoneNbr",
                                   email as "email",
                                   cust_address as "custAddress",
                                   cust_pin_code as "custPinCode",
                                   last_logged_in as "lastLoggedIn"
                                                    from account_holder_details
                             where account_nbr = p_account_nbr;

      return accounts_cur;
   end;

   function get_preferred_names return sys_refcursor as
      l_preferred_names_cur sys_refcursor;
   begin
      open l_preferred_names_cur for select preferred_name as "preferredName",
                                            account_nbr as "accountNumber"
                                       from account_holders;

      return l_preferred_names_cur;
   end;

   procedure update_account_details (
      p_account_nbr    in account_holders.account_nbr%type,
      p_preferred_name in account_holders.preferred_name%type
   ) as
   begin
      update account_holders
         set
         preferred_name = p_preferred_name
       where account_nbr = p_account_nbr;

   end;

   procedure set_account_details (
      p_cust_id        in account_holders.cust_id%type default 0,
      p_bank_id        in account_holders.bank_id%type,
      p_account_nbr    in account_holders.account_nbr%type,
      p_preferred_name in account_holders.preferred_name%type,
      p_status         out number
   ) as
      l_bank_abbr varchar2(100);
      l_count     number;
   begin
      select count(*)
        into l_count
        from account_holders
       where account_nbr = p_account_nbr;

      if ( l_count > 0 ) then
         p_status := 1;
      else
         insert into account_holders (
            cust_id,
            bank_id,
            account_nbr,
            preferred_name
         ) values ( p_cust_id,
                    p_bank_id,
                    p_account_nbr,
                    p_preferred_name );
         p_status := 0;
      end if;
   end;

   procedure delete_account (
      p_account_nbr in account_holders.account_nbr%type
   ) is
      type l_investment_id_tab is
         table of number index by binary_integer;
      l_investment_ids l_investment_id_tab;
   begin
      select investment_id
      bulk collect
        into l_investment_ids
        from investment_details
       where account_nbr = p_account_nbr;

      if
         l_investment_ids is not null
         and l_investment_ids.count > 0
      then
         forall i in 1..l_investment_ids.count
            delete investment_details
             where investment_id = l_investment_ids(i);
      end if;

      delete account_holders
       where account_nbr = p_account_nbr;
   end;

    /* 
      End of Account entity
    */

    /*
      Investment Entity
    */

   function get_savings_for_account (
      p_account_nbr in account_holders.account_nbr%type
   ) return sys_refcursor as
      saving_dtls sys_refcursor;
   begin
      open saving_dtls for select cust_id as "custId",
                                  bank_id as "bankId",
                                  bank_name as "bankName",
                                  branch_name as "branchName",
                                  bank as "bank",
                                  bank_city as "bankCity",
                                  bank_pin_code as "bankPinCode",
                                  bank_address as "bankAddress",
                                  account_nbr as "accountNumber",
                                  first_name as "firstName",
                                  last_name as "lastName",
                                  preferred_name as "preferredName",
                                  cust_address as "custAddress",
                                  email as "email",
                                  phone_nbr as "phoneNbr",
                                  cust_pin_code as "custPinCode",
                                  investment_id as "investmentId",
                                  instrument_id as "instrumentId",
                                  instrument_assoc_bank as "instrumentAssocBankName",
                                  instrument_name as "instrumentName",
                                  instrument_type as "instrumentType",
                                  investment_amt as "investmentAmount",
                                  to_char(
                                                   investment_dt,
                                                   'DD-MON-YYYY'
                                                ) as "investmentDate",
                                  investment_type as "investmentType",
                                  active_flag as "investmentStatus",
                                  to_char(
                                                   expiration_dt,
                                                   'DD-MON-YYYY'
                                                ) as "expirationDate",
                                  last_logged_in as "lastLoggedIn"
                                                  from account_investment_details_vw
                            where account_nbr = p_account_nbr;

      return saving_dtls;
   end;


   function get_savings_for_user (
      p_user_name in account_investment_details_vw.user_name%type default null
   ) return sys_refcursor as
      saving_dtls sys_refcursor;
   begin
      if ( p_user_name is null ) then
         open saving_dtls for select cust_id as "custId",
                                     bank_id as "bankId",
                                     bank_name as "bankName",
                                     branch_name as "branchName",
                                     bank as "bank",
                                     bank_city as "bankCity",
                                     bank_pin_code as "bankPinCode",
                                     bank_address as "bankAddress",
                                     account_nbr as "accountNumber",
                                     first_name as "firstName",
                                     last_name as "lastName",
                                     preferred_name as "preferredName",
                                     cust_address as "custAddress",
                                     email as "email",
                                     phone_nbr as "phoneNbr",
                                     cust_pin_code as "custPinCode",
                                     investment_id as "investmentId",
                                     instrument_id as "instrumentId",
                                     instrument_assoc_bank as "instrumentAssocBankName",
                                     instrument_name as "instrumentName",
                                     instrument_type as "instrumentType",
                                     investment_amt as "investmentAmount",
                                     user_name as "userName",
                                     to_char(
                                                      investment_dt,
                                                      'DD-MON-YYYY'
                                                   ) as "investmentDate",
                                     investment_type as "investmentType",
                                     active_flag as "investmentStatus",
                                     to_char(
                                                      expiration_dt,
                                                      'DD-MON-YYYY'
                                                   ) as "expirationDate",
                                     last_logged_in as "lastLoggedIn"
                                                     from account_investment_details_vw
                               order by user_name,
                                        account_nbr;
      else
         open saving_dtls for select cust_id as "custId",
                                     bank_id as "bankId",
                                     bank_name as "bankName",
                                     branch_name as "branchName",
                                     bank as "bank",
                                     bank_city as "bankCity",
                                     bank_pin_code as "bankPinCode",
                                     bank_address as "bankAddress",
                                     account_nbr as "accountNumber",
                                     first_name as "firstName",
                                     last_name as "lastName",
                                     preferred_name as "preferredName",
                                     cust_address as "custAddress",
                                     email as "email",
                                     phone_nbr as "phoneNbr",
                                     cust_pin_code as "custPinCode",
                                     investment_id as "investmentId",
                                     instrument_id as "instrumentId",
                                     instrument_assoc_bank as "instrumentAssocBankName",
                                     instrument_name as "instrumentName",
                                     instrument_type as "instrumentType",
                                     investment_amt as "investmentAmount",
                                     user_name as "userName",
                                     to_char(
                                                      investment_dt,
                                                      'DD-MON-YYYY'
                                                   ) as "investmentDate",
                                     investment_type as "investmentType",
                                     active_flag as "investmentStatus",
                                     to_char(
                                                      expiration_dt,
                                                      'DD-MON-YYYY'
                                                   ) as "expirationDate",
                                     last_logged_in as "lastLoggedIn"
                                                     from account_investment_details_vw
                               where user_name = p_user_name
                               order by account_nbr;
      end if;
      return saving_dtls;
   end;




   function get_investment_details (
      p_investment_id account_investment_details_vw.investment_id%type
   ) return sys_refcursor as
      saving_dtls sys_refcursor;
   begin
      open saving_dtls for select cust_id as "custId",
                                  bank_id as "bankId",
                                  bank_name as "bankName",
                                  branch_name as "branchName",
                                  bank as "bank",
                                  bank_city as "bankCity",
                                  bank_pin_code as "bankPinCode",
                                  bank_address as "bankAddress",
                                  account_nbr as "accountNumber",
                                  first_name as "firstName",
                                  last_name as "lastName",
                                  preferred_name as "preferredName",
                                  cust_address as "custAddress",
                                  email as "email",
                                  phone_nbr as "phoneNbr",
                                  cust_pin_code as "custPinCode",
                                  investment_id as "investmentId",
                                  instrument_id as "instrumentId",
                                  instrument_assoc_bank as "instrumentAssocBankName",
                                  instrument_name as "instrumentName",
                                  instrument_type as "instrumentType",
                                  investment_amt as "investmentAmount",
                                  to_char(
                                                   investment_dt,
                                                   'DD-MON-YYYY'
                                                ) as "investmentDate",
                                  investment_type as "investmentType",
                                  active_flag as "investmentStatus",
                                  to_char(
                                                   expiration_dt,
                                                   'DD-MON-YYYY'
                                                ) as "expirationDate",
                                  last_logged_in as "lastLoggedIn"
                                                  from account_investment_details_vw
                            where investment_id = p_investment_id;

      return saving_dtls;
   end;

   procedure update_investment_details (
      p_investment_id account_investment_details_vw.investment_id%type,
      p_expiration_dt in account_investment_details_vw.expiration_dt%type,
      p_active_flag   in account_investment_details_vw.active_flag%type
   ) is
   begin
      update investment_details
         set expiration_dt = p_expiration_dt,
             active_flag = p_active_flag
       where investment_id = p_investment_id;
   end;

   procedure close_investment (
      p_investment_id account_investment_details_vw.investment_id%type
   ) as
   begin
      update investment_details
         set instrument_closed_dt = sysdate,
             active_flag = 'N'
       where investment_id = p_investment_id;

   end;

   procedure delete_investment (
      p_investment_id account_investment_details_vw.investment_id%type
   ) as
   begin
      delete investment_details
       where investment_id = p_investment_id;

   end;

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
   ) as
   begin
      insert into investment_details (
         account_nbr,
         instrument_type,
         instrument_id,
         instrument_name,
         instrument_assoc_bank,
         investment_amt,
         investment_type,
         investment_dt,
         expiration_dt,
         active_flag
      ) values ( p_account_nbr,
                 p_instrument_type,
                 p_instrument_id,
                 p_instrument_name,
                 p_instrument_assoc_bank,
                 p_investment_amount,
                 p_investment_type,
                 p_investment_dt,
                 p_expiration_dt,
                 p_active_flag ) returning investment_id into p_investment_id;

   end;

    /*
      End of Investment Entity
    */

    /*
      Customer Entity
    */

   function get_customer_details (
      p_user_name in customers.user_name%type
   ) return sys_refcursor is
      l_user_details_cur sys_refcursor;
      l_count            number;
   begin
      begin
         l_count := customer_exists(p_user_name);
         if ( l_count > 0 ) then
            open l_user_details_cur for select cust_id as "custId",
                                               password as "password",
                                               user_name as "userName",
                                               first_name as "firstName",
                                               last_name as "lastName",
                                               dob as "dob",
                                               gender as "gender",
                                               phone_nbr as "phoneNbr",
                                               email as "email",
                                               cust_pin_code as "custPinCode",
                                               cust_city as "custCity",
                                               cust_address as "custAddress",
                                               preferred_name as "preferredName",
                                               is_admin as "isAdmin",
                                               to_char(
                                                                       to_timestamp(to_char(
                                                                          last_logged_in,
                                                                          'DD-MON-YYYY HH:MI:SS AM'
                                                                       )) at time zone 'Asia/Kolkata',
                                                                       'DD-MON-YYYY HH:MI:SS AM'
                                                                    ) as "lastLoggedIn"
                                                                      from customers
                                         where upper(user_name) = upper(p_user_name);

         else
            raise no_data_found;
         end if;
      exception
         when no_data_found then
            raise_application_error(
               -20010,
               'Invalid credentails passed! Please try again.'
            );
         when others then
            raise_application_error(
               -20011,
               'Internal Error Occurred!'
            );
      end;

      return l_user_details_cur;
   end;

   function customer_exists (
      p_user_name in customers.user_name%type
   ) return number is
      l_count number;
   begin
      begin
         select 1
           into l_count
           from customers
          where upper(user_name) = upper(p_user_name);
      exception
         when no_data_found then
            l_count := 0;
         when others then
            raise_application_error(
               -20011,
               'Internal Server Error occurred!'
            );
      end;
      return l_count;
   end;

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
   ) return number is
      l_count number;
      l_ret   number;
   begin
      select count(1)
        into l_count
        from customers
       where user_name = p_user_name;

      if l_count > 0 then
         l_ret := 1;
      else
         insert into customers (
            user_name,
            password,
            first_name,
            last_name,
            preferred_name,
            dob,
            gender,
            email,
            phone_nbr,
            cust_city,
            cust_address,
            cust_pin_code,
            is_admin
         ) values ( p_user_name,
                    p_password,
                    p_first_name,
                    p_last_name,
                    p_preferred_name,
                    p_dob,
                    p_gender,
                    p_email,
                    p_phone_nbr,
                    p_cust_city,
                    p_cust_address,
                    p_cust_pin_code,
                    p_is_admin ) returning cust_id into p_cust_id;
         l_ret := 0;
      end if;
      return l_ret;
   end;


   function update_customer_details (
      p_cust_id       in customers.cust_id%type,
      p_phone_nbr     in customers.phone_nbr%type,
      p_email         in customers.email%type,
      p_cust_pin_code in customers.cust_pin_code%type,
      p_cust_city     in customers.cust_city%type,
      p_cust_address  in customers.cust_address%type
   ) return number is
      l_status number := 0;
   begin
      update customers
         set phone_nbr = p_phone_nbr,
             email = p_email,
             cust_pin_code = p_cust_pin_code,
             cust_city = p_cust_city,
             cust_address = p_cust_address
       where cust_id = p_cust_id;

      if ( sql%rowcount > 0 ) then
         l_status := 0;
      else
         l_status := 1;
      end if;

      return l_status;
   end;

   procedure update_last_logged_in (
      p_user_name      in customers.user_name%type,
      p_last_logged_in in date default sysdate
   ) is
      lv_count   number := 0;
      lv_cust_id customers.cust_id%type;
   begin
      lv_count := customer_exists(p_user_name => p_user_name);
      if ( lv_count > 0 ) then
         update customers
            set
            last_logged_in = p_last_logged_in
          where user_name = p_user_name;
      end if;
   end;

   function reset_password (
      p_cust_id      in customers.cust_id%type,
      p_password     in customers.password%type,
      p_new_password in customers.password%type
   ) return number is
      l_status number;
   begin
      update customers
         set
         password = p_new_password
       where password = p_password
         and cust_id = p_cust_id;

      if ( sql%rowcount > 0 ) then
         l_status := 0;
      else
         l_status := 1;
      end if;
      return l_status;
   end;

   function get_all_customers return sys_refcursor is
      lv_customers sys_refcursor;
   begin
      open lv_customers for select cust_id as "custId",
                                   user_name as "userName",
                                   first_name as "firstName",
                                   last_name as "lastName",
                                   dob as "dob",
                                   gender as "gender",
                                   phone_nbr as "phoneNbr",
                                   email as "email",
                                   cust_pin_code as "custPinCode",
                                   cust_city as "custCity",
                                   cust_address as "custAddress",
                                   preferred_name as "preferredName",
                                   is_admin as "isAdmin",
                                   to_char(
                                                     to_timestamp(to_char(
                                                        last_logged_in,
                                                        'DD-MON-YYYY HH:MI:SS AM'
                                                     )) at time zone 'Asia/Kolkata',
                                                     'DD-MON-YYYY HH:MI:SS AM'
                                                  ) as "lastLoggedIn"
                                                    from customers
                             where is_admin != 'Y';

      return lv_customers;
   end;

    -- Get cust_refreshtoken_xref details

   function rt_exists (
      p_rt customer_refresh_token_xref.refresh_token%type
   ) return number is
      lv_count number := 0;
   begin
      begin
         select count(1)
           into lv_count
           from customer_refresh_token_xref
          where refresh_token = p_rt;

         if ( lv_count < 1 ) then
            raise no_data_found;
         end if;
         lv_count := 1;
      exception
         when no_data_found then
            lv_count := 0;
      end;
      return lv_count;
   end;

   function get_cust_rt_xref (
      p_rt customer_refresh_token_xref.refresh_token%type
   ) return sys_refcursor is
      lv_count     number := 0;
      lv_rt_cursor sys_refcursor;
   begin
      lv_count := rt_exists(p_rt => p_rt);
      if ( lv_count > 0 ) then
         open lv_rt_cursor for select a.user_name "userName"
                                                       from customers a,
                                                            customer_refresh_token_xref b
                                where a.cust_id = b.cust_id
                                  and b.refresh_token = p_rt;
      else
           --raise_application_error(-20013,'Refresh token not found in the database');
         open lv_rt_cursor for select null as "userName"
                                 from dual;
      end if;

      return lv_rt_cursor;
   end;

   function detect_reuse_of_token (
      p_user_name customers.user_name%type,
      p_rt        customer_refresh_token_xref.refresh_token%type
   ) return number is
      lv_detected number := 0;
   begin
      select count(1)
        into lv_detected
        from customer_refresh_token_xref
       where cust_id in (
         select cust_id
           from customers
          where user_name = p_user_name
      )
         and refresh_token != p_rt;

      return lv_detected;
   end;

   procedure insert_cust_rt_xref (
      p_user_name     customers.user_name%type,
      p_rt            customer_refresh_token_xref.refresh_token%type,
      p_return_status out number
   ) is
      lv_count   number := 0;
      lv_cust_id customers.cust_id%type;
   begin
      lv_count := customer_exists(p_user_name => p_user_name);
      if ( lv_count > 0 ) then
         select cust_id
           into lv_cust_id
           from customers
          where user_name = p_user_name;

         insert into customer_refresh_token_xref (
            cust_id,
            refresh_token
         ) values ( lv_cust_id,
                    p_rt );

         p_return_status := 0;
      else
         p_return_status := 1;
      end if;
   end;

   procedure delete_cust_rt_xref (
      p_rt            customer_refresh_token_xref.refresh_token%type,
      p_return_status out number
   ) is
      lv_count number := 0;
   begin
      lv_count := rt_exists(p_rt => p_rt);
      if ( lv_count > 0 ) then
         delete customer_refresh_token_xref
          where refresh_token = p_rt;
         p_return_status := 0;
      else
         p_return_status := 1;
      end if;
   end;


   procedure delete_cust_rt_xref_for_user (
      p_user_name     customers.user_name%type,
      p_rt            customer_refresh_token_xref.refresh_token%type default null,
      p_return_status out number
   ) is
      lv_count      number := 0;
      lv_user_count number := 0;
   begin
      lv_user_count := customer_exists(p_user_name => p_user_name);
      if ( lv_user_count > 0 ) then
         if ( p_rt is not null
         or p_rt != '' ) then
            lv_count := rt_exists(p_rt => p_rt);
            if ( lv_count > 0 ) then
               delete customer_refresh_token_xref
                where refresh_token = p_rt
                  and cust_id in (
                  select cust_id
                    from customers
                   where user_name = p_user_name
               );
               p_return_status := 0;
            else
               p_return_status := 1;
            end if;
         else
            delete customer_refresh_token_xref
             where cust_id in (
               select cust_id
                 from customers
                where user_name = p_user_name
            );
            p_return_status := 0;
         end if;

      else
         p_return_status := 1;
      end if;
   end;

    /*
      End of Customer Entity
    */

    /* 
    Bank Entity
    */

    --   function get_banks_details return sys_refcursor is
    --      bank_dtls_cur sys_refcursor;
    --   begin
    --      open bank_dtls_cur for select bank_id as name,
    --                                    bank_abbr
    --                                    || '-'
    --                                    || substr(
    --                                       bank_city,
    --                                       1,
    --                                       3
    --                                    ) as value
    --                               from banks_master;
    --
    --      return bank_dtls_cur;
    --   end;


   function get_banks_details return sys_refcursor is
      bank_dtls_cur sys_refcursor;
   begin
      open bank_dtls_cur for select bank_id as "bankId",
                                    bank_name as "bankName",
                                    branch_name as "branchName",
                                    bank_abbr as "bankAbbr",
                                    bank_city as "bankCity",
                                    bank_pin_code as "bankPinCode",
                                    bank_address as "bankAddress"
                               from banks_master;

      return bank_dtls_cur;
   end;

   function get_bank_details (
      p_bank_id in banks_master.bank_id%type
   ) return sys_refcursor is
      bank_dtls_cur sys_refcursor;
   begin
      open bank_dtls_cur for select bank_id as "bankId",
                                    bank_name as "bankName",
                                    branch_name as "branchName",
                                    bank_abbr as "bankAbbr",
                                    bank_city as "bankCity",
                                    bank_pin_code as "bankPinCode",
                                    bank_address as "bankAddress"
                                                      from banks_master
                              where bank_id = p_bank_id;

      return bank_dtls_cur;
   end;

   function insert_bank_details (
      p_bank_name     banks_master.bank_name%type,
      p_branch_name   banks_master.branch_name%type,
      p_bank_city     banks_master.bank_city%type,
      p_bank_pin_code banks_master.bank_pin_code%type,
      p_bank_abbr     banks_master.bank_abbr%type,
      p_bank_address  banks_master.bank_address%type
   ) return number is
      l_status number;
      l_count  number;
   begin
      select count(1)
        into l_count
        from banks_master
       where bank_name = p_bank_name
         and branch_name = p_branch_name;

      if ( l_count > 0 ) then
         l_status := 1;
      else
         insert into banks_master (
            bank_name,
            branch_name,
            bank_city,
            bank_pin_code,
            bank_abbr,
            bank_address
         ) values ( p_bank_name,
                    p_branch_name,
                    p_bank_city,
                    p_bank_pin_code,
                    p_bank_abbr,
                    p_bank_address ) returning bank_id into l_status;

         --l_status := 0;
      end if;
      return l_status;
   end;

   procedure update_bank_details (
      p_bank_id       in banks_master.bank_id%type,
      p_bank_abbr     in banks_master.bank_abbr%type,
      p_bank_pin_code in banks_master.bank_pin_code%type,
      p_bank_address  in banks_master.bank_address%type
   ) is
   begin
      update banks_master
         set bank_pin_code = p_bank_pin_code,
             bank_abbr = p_bank_abbr,
             bank_address = p_bank_address
       where bank_id = p_bank_id;
   end;

   procedure delete_bank_details (
      p_bank_id banks_master.bank_id%type
   ) is
      type l_acct_number_tab is
         table of varchar2(1000) index by binary_integer;
      l_acct_nos l_acct_number_tab;
   begin
      select account_nbr
      bulk collect
        into l_acct_nos
        from account_holders
       where bank_id = p_bank_id;

      if (
         l_acct_nos is not null
         and l_acct_nos.count > 0
      ) then
         for i in 1..l_acct_nos.count loop
            delete_account(p_account_nbr => l_acct_nos(i));
         end loop;
      end if;

      delete banks_master
       where bank_id = p_bank_id;

   end delete_bank_details;


    /*
      End of Bank Entity
    */


    /*
      Instrument Types Entity
    */


   function get_instrument_types return sys_refcursor as
      instrument_types_cur sys_refcursor;
   begin
      open instrument_types_cur for select instrument_type_id "instrumentTypeId",
                                           instrument_type_cd "instrumentTypeCode",
                                           instrument_type_desc "instrumentTypeDescription"
                                      from instrument_types;

      return instrument_types_cur;
   end;

   function get_instrument_type (
      p_instrument_type_id in instrument_types.instrument_type_id%type
   ) return sys_refcursor as
      instrument_types_cur sys_refcursor;
   begin
      open instrument_types_cur for select instrument_type_id "instrumentTypeId",
                                           instrument_type_cd "instrumentTypeCode",
                                           instrument_type_desc "instrumentTypeDescription"
                                                                    from instrument_types
                                     where instrument_type_id = p_instrument_type_id;

      return instrument_types_cur;
   end;

   procedure update_instrument_type (
      p_instrument_type_id   in instrument_types.instrument_type_id%type,
      p_instrument_type_desc in instrument_types.instrument_type_desc%type
   ) is
   begin
      update instrument_types
         set
         instrument_type_desc = p_instrument_type_desc
       where instrument_type_id = p_instrument_type_id;
   end;

   procedure delete_instrument_type (
      p_instrument_type_id in instrument_types.instrument_type_id%type
   ) is
   begin
      delete instrument_types
       where instrument_type_id = p_instrument_type_id;
   end;

   function register_instrument_type (
      p_instrument_type_cd   in instrument_types.instrument_type_cd%type,
      p_instrument_type_desc in instrument_types.instrument_type_desc%type,
      p_instrument_type_id   out instrument_types.instrument_type_id%type
   ) return number is
      l_status number;
      l_count  number;
   begin
      select count(1)
        into l_count
        from instrument_types
       where instrument_type_cd = p_instrument_type_cd;

      if ( l_count > 0 ) then
         l_status := 1;
      else
         insert into instrument_types (
            instrument_type_cd,
            instrument_type_desc
         ) values ( p_instrument_type_cd,
                    p_instrument_type_desc ) returning instrument_type_id into p_instrument_type_id;

         l_status := 0;
      end if;
      return l_status;
   end;

    /*
      End Instrument Types Entity
    */


   function get_investment_types return sys_refcursor is
      investment_types_cur sys_refcursor;
   begin
      open investment_types_cur for select investment_type_id as "investmentTypeId",
                                           investment_type_cd as "investmentTypeCode",
                                           investment_type_desc as "investmentTypeDescription"
                                      from investment_types;

      return investment_types_cur;
   end;

   function get_investment_type (
      p_investment_type_id in investment_types.investment_type_id%type
   ) return sys_refcursor is
      investment_types_cur sys_refcursor;
   begin
      open investment_types_cur for select investment_type_id as "investmentTypeId",
                                           investment_type_cd as "investmentTypeCode",
                                           investment_type_desc as "investmentTypeDescription"
                                                                    from investment_types
                                     where investment_type_id = p_investment_type_id;

      return investment_types_cur;
   end;

   procedure update_investment_type (
      p_investment_type_id   in investment_types.investment_type_id%type,
      p_investment_type_desc in investment_types.investment_type_desc%type
   ) is
   begin
      update investment_types
         set
         investment_type_desc = p_investment_type_desc
       where investment_type_id = p_investment_type_id;
   end;

   procedure delete_investment_type (
      p_investment_type_id in investment_types.investment_type_id%type
   ) is
   begin
      delete investment_types
       where investment_type_id = p_investment_type_id;
   end;


   function register_investment_type (
      p_investment_type_cd   in investment_types.investment_type_cd%type,
      p_investment_type_desc in investment_types.investment_type_desc%type,
      p_investment_type_id   out investment_types.investment_type_id%type
   ) return number is
      l_status number;
      l_count  number;
   begin
      select count(1)
        into l_count
        from investment_types
       where investment_type_cd = p_investment_type_cd;

      if ( l_count > 0 ) then
         l_status := 1;
      else
         insert into investment_types (
            investment_type_cd,
            investment_type_desc
         ) values ( p_investment_type_cd,
                    p_investment_type_desc ) returning investment_type_id into p_investment_type_id;

         l_status := 0;
      end if;
      return l_status;
   end;



    /*
      Reports
    */

   function get_monthly_debit_summary return sys_refcursor is
      l_monthly_debit_rpt_cur sys_refcursor;
   begin
      open l_monthly_debit_rpt_cur for select cust_id as "custId",
                                              user_name as "userName",
                                              first_name as "firstName",
                                              last_name as "lastName",
                                              bank_name as "bankName",
                                              branch_name as "branchName",
                                              preferred_name as "preferredName",
                                              account_nbr as "accountNumber",
                                              sum(investment_amt) as "totalInvestmentAmount"
                                                                          from account_investment_details_vw
                                        where active_flag = 'Y'
                                          and investment_type_cd = 'SIP'
                                          and is_admin != 'Y'
                                        group by cust_id,
                                                 user_name,
                                                 first_name,
                                                 last_name,
                                                 bank_name,
                                                 branch_name,
                                                 preferred_name,
                                                 account_nbr;

      return l_monthly_debit_rpt_cur;
   end;

   function get_active_investment_summary (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor is
      lv_investment_summ sys_refcursor;
   begin
      if ( p_user_name is null ) then
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            instrument_type as "instrumentType",
                                            investment_type as "investmentType",
                                            user_name as "userName"
                                                                   from account_investment_details_vw
                                      where active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by instrument_type,
                                               investment_type,
                                               user_name;
      else
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            instrument_type as "instrumentType",
                                            investment_type as "investmentType"
                                                                   from account_investment_details_vw
                                      where user_name = p_user_name
                                        and active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by instrument_type,
                                               investment_type;
      end if;

      return lv_investment_summ;
   end;

   function get_active_investment_summary_for_inv_type (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor is
      lv_investment_summ sys_refcursor;
   begin
      if ( p_user_name is null ) then
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            investment_type as "investmentType",
                                            user_name as "userName"
                                                                   from account_investment_details_vw
                                      where active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by investment_type,
                                               user_name;
      else
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            investment_type as "investmentType"
                                                                   from account_investment_details_vw
                                      where user_name = p_user_name
                                        and active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by investment_type;
      end if;
      return lv_investment_summ;
   end;


   function get_active_investment_summary_for_instr_type (
      p_user_name in customers.user_name%type default null
   ) return sys_refcursor is
      lv_investment_summ sys_refcursor;
   begin
      if ( p_user_name is null ) then
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            instrument_type as "instrumentType",
                                            user_name as "userName"
                                                                   from account_investment_details_vw
                                      where active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by instrument_type,
                                               user_name;
      else
         open lv_investment_summ for select sum(investment_amt) as "investmentAmount",
                                            instrument_type as "instrumentType"
                                                                   from account_investment_details_vw
                                      where user_name = p_user_name
                                        and active_flag = 'Y'
                                        and is_admin = 'N'
                                      group by instrument_type;
      end if;
      return lv_investment_summ;
   end;
/* 
End of Reports
*/

end;
/