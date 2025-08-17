--------------------------------------------------------
--  Constraints for Table CUSTOMER_REFRESH_TOKEN_XREF
--------------------------------------------------------

alter table "CUSTOMER_REFRESH_TOKEN_XREF" modify (
   "CUST_ID" not null enable
);
alter table "CUSTOMER_REFRESH_TOKEN_XREF" modify (
   "REFRESH_TOKEN" not null enable
);