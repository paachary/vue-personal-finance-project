--------------------------------------------------------
--  DDL for Function GET_USER_POLICY
--------------------------------------------------------

create or replace editionable function "GET_USER_POLICY" (
   schema_p in varchar2,
   table_p  in varchar2
) return varchar2 as
   l_policy_pred varchar2(400);
   l_user_name   varchar2(100);
   l_cust_id     number;
   l_is_admin    customers.is_admin%type;
begin
   l_user_name := sys_context(
      'finance_ctx',
      'user_name'
   );
   begin
      select is_admin,
             cust_id
        into
         l_is_admin,
         l_cust_id
        from customers
       where user_name = upper(l_user_name);
   exception
      when no_data_found then
         raise_application_error(
            -20030,
            'Username does not exist in the database. Pls recheck!'
         );
   end;

   if ( lower(l_is_admin) = 'n' ) then
      l_policy_pred := 'cust_id = ' || l_cust_id;
   else
      l_policy_pred := '1 = 1';
   end if;
   return l_policy_pred;
end;
/