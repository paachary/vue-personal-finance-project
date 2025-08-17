--------------------------------------------------------
--  Constraints for Table INVESTMENT_DETAILS
--------------------------------------------------------

alter table "INVESTMENT_DETAILS" modify (
   "ACCOUNT_NBR" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INSTRUMENT_TYPE" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INSTRUMENT_ID" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INSTRUMENT_NAME" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INSTRUMENT_ASSOC_BANK" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INVESTMENT_AMT" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "INVESTMENT_DT" not null enable
);
alter table "INVESTMENT_DETAILS" modify (
   "ACTIVE_FLAG" not null enable
);
alter table "INVESTMENT_DETAILS"
   add constraint "INVESTMENT_DETAILS_PK" primary key ( "INVESTMENT_ID" )
      using index "INVESTMENT_DETAILS_PK" enable;