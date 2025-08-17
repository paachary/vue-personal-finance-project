--------------------------------------------------------
--  DDL for View ACCOUNT_INVESTMENT_DETAILS_VW
--------------------------------------------------------

create or replace force editionable view "ACCOUNT_INVESTMENT_DETAILS_VW" (
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
   "PREFERRED_NAME",
   "DOB",
   "CUST_ADDRESS",
   "CUST_CITY",
   "EMAIL",
   "PHONE_NBR",
   "CUST_PIN_CODE",
   "IS_ADMIN",
   "INVESTMENT_ID",
   "INSTRUMENT_ID",
   "INSTRUMENT_ASSOC_BANK",
   "INSTRUMENT_NAME",
   "INSTRUMENT_TYPE",
   "INVESTMENT_AMT",
   "INVESTMENT_DT",
   "INSTRUMENT_TYPE_CD",
   "INVESTMENT_TYPE_CD",
   "INVESTMENT_TYPE",
   "ACTIVE_FLAG",
   "EXPIRATION_DT",
   "LAST_LOGGED_IN"
) as
   select a.cust_id,
          a.user_name,
          a.bank_id,
          a.bank_name,
          a.branch_name,
          a.bank,
          a.bank_city,
          a.bank_pin_code,
          a.bank_address,
          a.account_nbr,
          a.first_name,
          a.last_name,
          a.preferred_name,
          a.dob,
          a.cust_address,
          a.cust_city,
          a.email,
          a.phone_nbr,
          a.cust_pin_code,
          a.is_admin,
          b.investment_id,
          b.instrument_id,
          b.instrument_assoc_bank,
          b.instrument_name,
          d.instrument_type_desc as instrument_type,
          b.investment_amt,
          b.investment_dt,
          b.instrument_type as instrument_type_cd,
          b.investment_type as investment_type_cd,
          c.investment_type_desc as investment_type,
          b.active_flag,
          b.expiration_dt,
          a.last_logged_in
     from account_holder_details a
     join investment_details b
   on a.account_nbr = b.account_nbr
     join investment_types c
   on b.investment_type = c.investment_type_cd
     join instrument_types d
   on b.instrument_type = d.instrument_type_cd;