--------------------------------------------------------
--  Ref Constraints for Table INVESTMENT_DETAILS
--------------------------------------------------------

alter table "INVESTMENT_DETAILS"
   add constraint "INVESTMENT_DETAILS_FK1"
      foreign key ( "ACCOUNT_NBR" )
         references "ACCOUNT_HOLDERS" ( "ACCOUNT_NBR" )
      enable;