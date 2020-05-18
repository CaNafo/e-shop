/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2014                    */
/* Created on:     16.5.2020. 12.13.05                          */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CART') and o.name = 'FK_CART_OWNS_A_CA_USERS')
alter table CART
   drop constraint FK_CART_OWNS_A_CA_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NEWS') and o.name = 'FK_NEWS_PUBLISHED_USERS')
alter table NEWS
   drop constraint FK_NEWS_PUBLISHED_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ORDERS') and o.name = 'FK_ORDERS_HAS_ORDER_RESERVED')
alter table ORDERS
   drop constraint FK_ORDERS_HAS_ORDER_RESERVED
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PERMISSION_LIST') and o.name = 'FK_PERMISSI_HAS_PERMI_ROLES')
alter table PERMISSION_LIST
   drop constraint FK_PERMISSI_HAS_PERMI_ROLES
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PERMISSION_LIST') and o.name = 'FK_PERMISSI_IS_IN_PER_PERMISSI')
alter table PERMISSION_LIST
   drop constraint FK_PERMISSI_IS_IN_PER_PERMISSI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('PRODUCTS') and o.name = 'FK_PRODUCTS_BELONGS_T_CATEGORY')
alter table PRODUCTS
   drop constraint FK_PRODUCTS_BELONGS_T_CATEGORY
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('RESERVED') and o.name = 'FK_RESERVED_HAS_RESER_CART')
alter table RESERVED
   drop constraint FK_RESERVED_HAS_RESER_CART
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('RESERVED') and o.name = 'FK_RESERVED_IS_RESERV_PRODUCTS')
alter table RESERVED
   drop constraint FK_RESERVED_IS_RESERV_PRODUCTS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ROLE_LIST') and o.name = 'FK_ROLE_LIS_HAS_ROLE_USERS')
alter table ROLE_LIST
   drop constraint FK_ROLE_LIS_HAS_ROLE_USERS
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('ROLE_LIST') and o.name = 'FK_ROLE_LIS_IS_IN_ROL_ROLES')
alter table ROLE_LIST
   drop constraint FK_ROLE_LIS_IS_IN_ROL_ROLES
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CART')
            and   name  = 'OWNS_A_CART_FK'
            and   indid > 0
            and   indid < 255)
   drop index CART.OWNS_A_CART_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CART')
            and   type = 'U')
   drop table CART
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CATEGORY')
            and   type = 'U')
   drop table CATEGORY
go

if exists (select 1
            from  sysobjects
           where  id = object_id('LOGS')
            and   type = 'U')
   drop table LOGS
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NEWS')
            and   name  = 'PUBLISHED_NEWS_FK'
            and   indid > 0
            and   indid < 255)
   drop index NEWS.PUBLISHED_NEWS_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NEWS')
            and   type = 'U')
   drop table NEWS
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('ORDERS')
            and   name  = 'HAS_ORDER_FK'
            and   indid > 0
            and   indid < 255)
   drop index ORDERS.HAS_ORDER_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ORDERS')
            and   type = 'U')
   drop table ORDERS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PERMISSIONS')
            and   type = 'U')
   drop table PERMISSIONS
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PERMISSION_LIST')
            and   name  = 'IS_IN_PERMISSION_LIST_FK'
            and   indid > 0
            and   indid < 255)
   drop index PERMISSION_LIST.IS_IN_PERMISSION_LIST_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PERMISSION_LIST')
            and   name  = 'HAS_PERMISSION_FK'
            and   indid > 0
            and   indid < 255)
   drop index PERMISSION_LIST.HAS_PERMISSION_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PERMISSION_LIST')
            and   type = 'U')
   drop table PERMISSION_LIST
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('PRODUCTS')
            and   name  = 'BELONGS_TO_CATEGORY_FK'
            and   indid > 0
            and   indid < 255)
   drop index PRODUCTS.BELONGS_TO_CATEGORY_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PRODUCTS')
            and   type = 'U')
   drop table PRODUCTS
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('RESERVED')
            and   name  = 'IS_RESERVED_FK'
            and   indid > 0
            and   indid < 255)
   drop index RESERVED.IS_RESERVED_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('RESERVED')
            and   name  = 'HAS_RESERVATION_FK'
            and   indid > 0
            and   indid < 255)
   drop index RESERVED.HAS_RESERVATION_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RESERVED')
            and   type = 'U')
   drop table RESERVED
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ROLES')
            and   type = 'U')
   drop table ROLES
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('ROLE_LIST')
            and   name  = 'IS_IN_ROLES_LIST_FK'
            and   indid > 0
            and   indid < 255)
   drop index ROLE_LIST.IS_IN_ROLES_LIST_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('ROLE_LIST')
            and   name  = 'HAS_ROLE_FK'
            and   indid > 0
            and   indid < 255)
   drop index ROLE_LIST.HAS_ROLE_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ROLE_LIST')
            and   type = 'U')
   drop table ROLE_LIST
go

if exists (select 1
            from  sysobjects
           where  id = object_id('USERS')
            and   type = 'U')
   drop table USERS
go

/*==============================================================*/
/* Table: CART                                                  */
/*==============================================================*/
create table CART (
   CART_ID              int                  identity,
   USER_ID              int                  not null,
   CART_ADD_DATE        datetime             not null,
   constraint PK_CART primary key (USER_ID, CART_ID)
)
go

/*==============================================================*/
/* Index: OWNS_A_CART_FK                                        */
/*==============================================================*/




create nonclustered index OWNS_A_CART_FK on CART (USER_ID ASC)
go

/*==============================================================*/
/* Table: CATEGORY                                              */
/*==============================================================*/
create table CATEGORY (
   CATEGORY_ID          int                  identity,
   CATEGORY_NAME        varchar(128)         not null,
   constraint PK_CATEGORY primary key (CATEGORY_ID)
)
go

/*==============================================================*/
/* Table: LOGS                                                  */
/*==============================================================*/
create table LOGS (
   LOG_ID               int                  identity,
   LOG_COUNTER          int                  null,
   constraint PK_LOGS primary key (LOG_ID)
)
go

/*==============================================================*/
/* Table: NEWS                                                  */
/*==============================================================*/
create table NEWS (
   NEWS_ID              int                  identity,
   USER_ID              int                  not null,
   NEWS_TITTLE          varchar(128)         not null,
   NEWS_DESCRIPTION     varchar(512)         null,
   NEWS_BODY            varchar(2000)        not null,
   NEWS_DATE_TIME       datetime             not null,
   NEWS_PHOTO           nvarchar(MAX)        null,
   constraint PK_NEWS primary key (USER_ID, NEWS_ID)
)
go

/*==============================================================*/
/* Index: PUBLISHED_NEWS_FK                                     */
/*==============================================================*/




create nonclustered index PUBLISHED_NEWS_FK on NEWS (USER_ID ASC)
go

/*==============================================================*/
/* Table: ORDERS                                                */
/*==============================================================*/
create table ORDERS (
   ORDER_ID             int                  identity,
   CATEGORY_ID          int                  not null,
   PRODUCT_ID           int                  not null,
   USER_ID              int                  not null,
   CART_ID              int                  not null,
   RESERVED_ID          int                  not null,
   ORDER_DATE           datetime             not null,
   constraint PK_ORDERS primary key (CATEGORY_ID, PRODUCT_ID, USER_ID, CART_ID, RESERVED_ID, ORDER_ID)
)
go

/*==============================================================*/
/* Index: HAS_ORDER_FK                                          */
/*==============================================================*/




create nonclustered index HAS_ORDER_FK on ORDERS (CATEGORY_ID ASC,
  PRODUCT_ID ASC,
  USER_ID ASC,
  CART_ID ASC,
  RESERVED_ID ASC)
go

/*==============================================================*/
/* Table: PERMISSIONS                                           */
/*==============================================================*/
create table PERMISSIONS (
   PERMISSION_ID        int                  identity,
   PERMISSION_NAME      varchar(128)         not null,
   constraint PK_PERMISSIONS primary key (PERMISSION_ID)
)
go

/*==============================================================*/
/* Table: PERMISSION_LIST                                       */
/*==============================================================*/
create table PERMISSION_LIST (
   PERMISSION_ID        int                  not null,
   ROLE_ID              int                  not null,
   constraint PK_PERMISSION_LIST primary key (PERMISSION_ID, ROLE_ID)
)
go

/*==============================================================*/
/* Index: HAS_PERMISSION_FK                                     */
/*==============================================================*/




create nonclustered index HAS_PERMISSION_FK on PERMISSION_LIST (ROLE_ID ASC)
go

/*==============================================================*/
/* Index: IS_IN_PERMISSION_LIST_FK                              */
/*==============================================================*/




create nonclustered index IS_IN_PERMISSION_LIST_FK on PERMISSION_LIST (PERMISSION_ID ASC)
go

/*==============================================================*/
/* Table: PRODUCTS                                              */
/*==============================================================*/
create table PRODUCTS (
   PRODUCT_ID           int                  identity,
   CATEGORY_ID          int                  not null,
   PRODUCT_NAME         varchar(128)         not null,
   PRODUCT_PRICE        decimal              not null,
   PRODUCT_EXPIRE_DATE  datetime             null,
   PRODUCT_DESCRIPTION  varchar(2000)        null,
   PRODUCT_PHOTO        nvarchar(8000)       null,
   constraint PK_PRODUCTS primary key (CATEGORY_ID, PRODUCT_ID)
)
go

/*==============================================================*/
/* Index: BELONGS_TO_CATEGORY_FK                                */
/*==============================================================*/




create nonclustered index BELONGS_TO_CATEGORY_FK on PRODUCTS (CATEGORY_ID ASC)
go

/*==============================================================*/
/* Table: RESERVED                                              */
/*==============================================================*/
create table RESERVED (
   RESERVED_ID          int                  identity,
   CATEGORY_ID          int                  not null,
   PRODUCT_ID           int                  not null,
   USER_ID              int                  not null,
   CART_ID              int                  not null,
   RESERVED_AMOUNT      int                  not null,
   RESERVED_ORDERED     bit                  not null,
   constraint PK_RESERVED primary key (CATEGORY_ID, PRODUCT_ID, USER_ID, CART_ID, RESERVED_ID)
)
go

/*==============================================================*/
/* Index: HAS_RESERVATION_FK                                    */
/*==============================================================*/




create nonclustered index HAS_RESERVATION_FK on RESERVED (USER_ID ASC,
  CART_ID ASC)
go

/*==============================================================*/
/* Index: IS_RESERVED_FK                                        */
/*==============================================================*/




create nonclustered index IS_RESERVED_FK on RESERVED (CATEGORY_ID ASC,
  PRODUCT_ID ASC)
go

/*==============================================================*/
/* Table: ROLES                                                 */
/*==============================================================*/
create table ROLES (
   ROLE_ID              int                  identity,
   ROLE_NAME            varchar(128)         not null,
   constraint PK_ROLES primary key (ROLE_ID)
)
go

/*==============================================================*/
/* Table: ROLE_LIST                                             */
/*==============================================================*/
create table ROLE_LIST (
   ROLE_ID              int                  not null,
   USER_ID              int                  not null,
   constraint PK_ROLE_LIST primary key (ROLE_ID, USER_ID)
)
go

/*==============================================================*/
/* Index: HAS_ROLE_FK                                           */
/*==============================================================*/




create nonclustered index HAS_ROLE_FK on ROLE_LIST (USER_ID ASC)
go

/*==============================================================*/
/* Index: IS_IN_ROLES_LIST_FK                                   */
/*==============================================================*/




create nonclustered index IS_IN_ROLES_LIST_FK on ROLE_LIST (ROLE_ID ASC)
go

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS (
   USER_ID              int                  identity,
   FIRST_NAME           varchar(128)         not null,
   LAST_NAME            varchar(128)         not null,
   "E-MAIL"             varchar(128)         not null,
   BIRTH_DATE           datetime             null,
   PASSWORD             varchar(512)         not null,
   constraint PK_USERS primary key (USER_ID)
)
go

alter table CART
   add constraint FK_CART_OWNS_A_CA_USERS foreign key (USER_ID)
      references USERS (USER_ID)
go

alter table NEWS
   add constraint FK_NEWS_PUBLISHED_USERS foreign key (USER_ID)
      references USERS (USER_ID)
go

alter table ORDERS
   add constraint FK_ORDERS_HAS_ORDER_RESERVED foreign key (CATEGORY_ID, PRODUCT_ID, USER_ID, CART_ID, RESERVED_ID)
      references RESERVED (CATEGORY_ID, PRODUCT_ID, USER_ID, CART_ID, RESERVED_ID)
go

alter table PERMISSION_LIST
   add constraint FK_PERMISSI_HAS_PERMI_ROLES foreign key (ROLE_ID)
      references ROLES (ROLE_ID)
go

alter table PERMISSION_LIST
   add constraint FK_PERMISSI_IS_IN_PER_PERMISSI foreign key (PERMISSION_ID)
      references PERMISSIONS (PERMISSION_ID)
go

alter table PRODUCTS
   add constraint FK_PRODUCTS_BELONGS_T_CATEGORY foreign key (CATEGORY_ID)
      references CATEGORY (CATEGORY_ID)
go

alter table RESERVED
   add constraint FK_RESERVED_HAS_RESER_CART foreign key (USER_ID, CART_ID)
      references CART (USER_ID, CART_ID)
go

alter table RESERVED
   add constraint FK_RESERVED_IS_RESERV_PRODUCTS foreign key (CATEGORY_ID, PRODUCT_ID)
      references PRODUCTS (CATEGORY_ID, PRODUCT_ID)
go

alter table ROLE_LIST
   add constraint FK_ROLE_LIS_HAS_ROLE_USERS foreign key (USER_ID)
      references USERS (USER_ID)
go

alter table ROLE_LIST
   add constraint FK_ROLE_LIS_IS_IN_ROL_ROLES foreign key (ROLE_ID)
      references ROLES (ROLE_ID)
go

