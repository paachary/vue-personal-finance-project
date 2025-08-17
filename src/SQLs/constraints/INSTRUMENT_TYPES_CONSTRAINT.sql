--------------------------------------------------------
--  Constraints for Table INSTRUMENT_TYPES
--------------------------------------------------------

alter table "INSTRUMENT_TYPES" modify (
   "INSTRUMENT_TYPE_CD" not null enable
);
alter table "INSTRUMENT_TYPES"
   add constraint "INVESTMENT_INSTRUMENT_TYPE_PK" primary key ( "INSTRUMENT_TYPE_ID" )
      using index "INVESTMENT_INSTRUMENT_TYPE_PK" enable;
alter table "INSTRUMENT_TYPES"
   add constraint "INVESTMENT_INSTRUMENT_TYPE_UNQ" unique ( "INSTRUMENT_TYPE_CD" )
      using index "INVESTMENT_INSTRUMENT_TYPE_UNQ" enable;