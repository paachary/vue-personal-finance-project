--------------------------------------------------------
--  Ref Constraints for Table ACCOUNT_HOLDERS
--------------------------------------------------------

alter table "ACCOUNT_HOLDERS"
   add constraint "ACCTHOLDER$USERID$FK"
      foreign key ( "CUST_ID" )
         references "CUSTOMERS" ( "CUST_ID" )
            on delete cascade
      enable;
alter table "ACCOUNT_HOLDERS"
   add constraint "ACCTHOLDER$BANKID$FK"
      foreign key ( "BANK_ID" )
         references "BANKS_MASTER" ( "BANK_ID" )
            on delete cascade
      enable;