--------------------------------------------------------
--  DDL for Index INVESTMENT_INSTRUMENT_TYPE_UNQ
--------------------------------------------------------

create unique index "INVESTMENT_INSTRUMENT_TYPE_UNQ" on
   "INSTRUMENT_TYPES" (
      "INSTRUMENT_TYPE_CD"
   );