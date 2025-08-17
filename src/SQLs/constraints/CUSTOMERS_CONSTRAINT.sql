--------------------------------------------------------
--  Constraints for Table CUSTOMERS
--------------------------------------------------------

alter table "CUSTOMERS"
   add constraint "CUSTOMER_USER_ID_PK" primary key ( "CUST_ID" )
      using index "CUSTOMER_USER_ID_PK" enable;