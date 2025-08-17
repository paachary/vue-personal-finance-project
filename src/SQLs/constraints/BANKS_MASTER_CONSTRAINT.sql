--------------------------------------------------------
--  Constraints for Table BANKS_MASTER
--------------------------------------------------------

alter table "BANKS_MASTER" modify (
   "BANK_NAME" not null enable
);
alter table "BANKS_MASTER" modify (
   "BRANCH_NAME" not null enable
);
alter table "BANKS_MASTER" modify (
   "BANK_CITY" not null enable
);
alter table "BANKS_MASTER" modify (
   "BANK_ABBR" not null enable
);
alter table "BANKS_MASTER"
   add constraint "BANK_MASTER_PK" primary key ( "BANK_ID" )
      using index "BANK_MASTER_PK" enable;