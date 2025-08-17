--------------------------------------------------------
--  DDL for Table ACCOUNT_HOLDERS
--------------------------------------------------------

create table "ACCOUNT_HOLDERS" (
   "ACCOUNT_NBR"    varchar2(100),
   "PREFERRED_NAME" varchar2(40),
   "BANK_ID"        number,
   "CUST_ID"        number,
   "CREATED_AT"     date default sysdate
);