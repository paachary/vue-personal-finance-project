--------------------------------------------------------
--  DDL for View ACCOUNT_HOLDER_DETAILS
--------------------------------------------------------

create or replace force editionable view "ACCOUNT_HOLDER_DETAILS" (
   "CUST_ID",
   "USER_NAME",
   "BANK_ID",
   "BANK_NAME",
   "BRANCH_NAME",
   "BANK",
   "BANK_CITY",
   "BANK_PIN_CODE",
   "BANK_ADDRESS",
   "ACCOUNT_NBR",
   "FIRST_NAME",
   "LAST_NAME",
   "DOB",
   "PREFERRED_NAME",
   "CUST_ADDRESS",
   "EMAIL",
   "PHONE_NBR",
   "CUST_PIN_CODE",
   "CUST_CITY",
   "IS_ADMIN",
   "LAST_LOGGED_IN"
) as
   select c.cust_id,
          c.user_name,
          a.bank_id,
          a.bank_name,
          a.branch_name,
          a.bank_name
          || ' '
          || a.branch_name as bank,
          a.bank_city,
          a.bank_pin_code,
          a.bank_address,
          b.account_nbr,
          c.first_name,
          c.last_name,
          c.dob,
          b.preferred_name,
          c.cust_address,
          c.email,
          c.phone_nbr,
          c.cust_pin_code,
          c.cust_city,
          c.is_admin,
          to_char(
             to_timestamp(to_char(
                last_logged_in,
                'DD-MON-YYYY HH:MI:SS AM'
             )) at time zone 'Asia/Kolkata',
             'DD-MON-YYYY HH24:MI:SS'
          ) as last_logged_in
     from banks_master a,
          account_holders b,
          customers c
    where a.bank_id = b.bank_id
      and c.cust_id = b.cust_id;