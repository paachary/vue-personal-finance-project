--------------------------------------------------------
--  Ref Constraints for Table CUSTOMER_REFRESH_TOKEN_XREF
--------------------------------------------------------

alter table "CUSTOMER_REFRESH_TOKEN_XREF"
   add constraint "CUSTOMER_REFRESH_TOKEN_XREF_FK1"
      foreign key ( "CUST_ID" )
         references "CUSTOMERS" ( "CUST_ID" )
      enable;