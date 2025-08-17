--------------------------------------------------------
--  Constraints for Table ACCOUNT_HOLDERS
--------------------------------------------------------

alter table "ACCOUNT_HOLDERS"
   add constraint "ACCOUNT_HOLDER_PK" primary key ( "ACCOUNT_NBR" )
      using index "ACCOUNT_HOLDER_PK" enable;
alter table "ACCOUNT_HOLDERS" modify (
   "PREFERRED_NAME" not null enable
);