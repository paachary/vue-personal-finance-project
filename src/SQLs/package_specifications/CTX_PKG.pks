--------------------------------------------------------
--  DDL for Package CTX_PKG
--------------------------------------------------------

create or replace editionable package "CTX_PKG" as
   procedure set_session_id (
      p_session_id in number
   );
   procedure set_ctx (
      p_sec_level_attr in varchar2,
      p_sec_level_val  in varchar2
   );
   procedure clear_session (
      p_session_id in number
   );
   procedure clear_context;
end;
/