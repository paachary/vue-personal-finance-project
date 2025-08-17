-- Setup

@tables/BANKS_MASTER.sql
@tables/INSTRUMENT_TYPES.sql
@tables/INVESTMENT_TYPES.sql

-- CUSTOMERS

@tables/CUSTOMERS.sql
@tables/CUSTOMER_REFRESH_TOKEN_XREF.sql

-- ACCOUNTS

@tables/ACCOUNT_HOLDERS.sql

-- INVESTMENTS

@tables/INVESTMENT_DETAILS.sql

-- DEBUG TABLE

@tables/DEBUG_TAB.sql


-- VIEWS
@views/ACCOUNT_HOLDER_DETAILS_VW.sql
@views/ACCOUNT_INVESTMENT_DETAILS_VW.sql

-- PACKAGES
@package_specifications/ACCOUNT_PKG.pks
@package_specifications/CTX_PKG.pks

@package_bodies/ACCOUNT_PKG.pkb
@package_bodies/CTX_PKG.pkb

-- Context Creation
@vpd_scripts/context_setting.sql

-- Functions
@functions/GET_USER_POLICY.sql

-- Policy Creation
@vpd_scripts/rls_policy.sql

-- --------------------------------------------------------
-- Constraints
-- --------------------------------------------------------

 @constraints/BANK_MASTER_PK.sql
 @constraints/BANKS_MASTER_CONSTRAINT.sql

 @constraints/INVESTMENT_INSTRUMENT_TYPE_PK.sql
 @constraints/INVESTMENT_INSTRUMENT_TYPE_UNQ.sql
-- @constraints/INVESTMENT_INSTRUMENT_TYPE_PK.sql

 @constraints/INVESTMENT_TYPES_CONSTRAINT.sql
 @constraints/INSTRUMENT_TYPES_CONSTRAINT.sql

 @constraints/CUSTOMER_USER_ID_PK.sql
 @constraints/CUSTOMERS_CONSTRAINT.sql

 @constraints/CUSTOMER_REFRESH_TOKEN_XREF_CONSTRAINT.sql
 @constraints/CUSTOMER_REFRESH_TOKEN_XREF_REFCONSTRAINT.sql


 @constraints/ACCOUNT_HOLDER_PK.sql
 @constraints/ACCOUNT_HOLDERS_CONSTRAINT.sql
 @constraints/ACCOUNT_HOLDERS_REFCONSTRAINT.sql

 @constraints/INVESTMENT_DETAILS_PK.sql
 @constraints/INVESTMENT_DETAILS_CONSTRAINT.sql
 @constraints/INVESTMENT_DETAILS_REFCONSTRAINT.sql

 @constraints/DEBUG_TAB_CONSTRAINT.sql