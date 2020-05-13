using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace e_shop.Models
{
    public partial class eshopContext : DbContext
    {
        public eshopContext()
        {
        }

        public eshopContext(DbContextOptions<eshopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Cart { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<PermissionList> PermissionList { get; set; }
        public virtual DbSet<Permissions> Permissions { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Reserved> Reserved { get; set; }
        public virtual DbSet<RoleList> RoleList { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server = WINDOWS-GIQE8BS\SQLEXPRESS; Database = eshop; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CartId });

                entity.ToTable("CART");

                entity.HasIndex(e => e.UserId)
                    .HasName("OWNS_A_CART_FK");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.CartId)
                    .HasColumnName("CART_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CartAddDate)
                    .HasColumnName("CART_ADD_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Cart)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CART_OWNS_A_CA_USERS");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("CATEGORY");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasColumnName("CATEGORY_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Logs>(entity =>
            {
                entity.HasKey(e => e.LogId);

                entity.ToTable("LOGS");

                entity.Property(e => e.LogId).HasColumnName("LOG_ID");

                entity.Property(e => e.LogCounter).HasColumnName("LOG_COUNTER");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.NewsId });

                entity.ToTable("NEWS");

                entity.HasIndex(e => e.UserId)
                    .HasName("PUBLISHED_NEWS_FK");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.NewsId)
                    .HasColumnName("NEWS_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.NewsBody)
                    .IsRequired()
                    .HasColumnName("NEWS_BODY")
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.NewsDateTime)
                    .HasColumnName("NEWS_DATE_TIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.NewsDescription)
                    .HasColumnName("NEWS_DESCRIPTION")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.NewsPhoto)
                    .HasColumnName("NEWS_PHOTO")
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.NewsTittle)
                    .IsRequired()
                    .HasColumnName("NEWS_TITTLE")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NEWS_PUBLISHED_USERS");
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => new { e.CategoryId, e.ProductId, e.UserId, e.CartId, e.ReservedId, e.OrderId });

                entity.ToTable("ORDERS");

                entity.HasIndex(e => new { e.CategoryId, e.ProductId, e.UserId, e.CartId, e.ReservedId })
                    .HasName("HAS_ORDER_FK");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.ProductId).HasColumnName("PRODUCT_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.CartId).HasColumnName("CART_ID");

                entity.Property(e => e.ReservedId).HasColumnName("RESERVED_ID");

                entity.Property(e => e.OrderId)
                    .HasColumnName("ORDER_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OrderDate)
                    .HasColumnName("ORDER_DATE")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Reserved)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => new { d.CategoryId, d.ProductId, d.UserId, d.CartId, d.ReservedId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ORDERS_HAS_ORDER_RESERVED");
            });

            modelBuilder.Entity<PermissionList>(entity =>
            {
                entity.HasKey(e => new { e.PermissionId, e.RoleId });

                entity.ToTable("PERMISSION_LIST");

                entity.HasIndex(e => e.PermissionId)
                    .HasName("IS_IN_PERMISSION_LIST_FK");

                entity.HasIndex(e => e.RoleId)
                    .HasName("HAS_PERMISSION_FK");

                entity.Property(e => e.PermissionId).HasColumnName("PERMISSION_ID");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.PermissionList)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PERMISSI_IS_IN_PER_PERMISSI");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.PermissionList)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PERMISSI_HAS_PERMI_ROLES");
            });

            modelBuilder.Entity<Permissions>(entity =>
            {
                entity.HasKey(e => e.PermissionId);

                entity.ToTable("PERMISSIONS");

                entity.Property(e => e.PermissionId).HasColumnName("PERMISSION_ID");

                entity.Property(e => e.PermissionName)
                    .IsRequired()
                    .HasColumnName("PERMISSION_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => new { e.CategoryId, e.ProductId });

                entity.ToTable("PRODUCTS");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("BELONGS_TO_CATEGORY_FK");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.ProductId)
                    .HasColumnName("PRODUCT_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ProductAmount).HasColumnName("PRODUCT_AMOUNT");

                entity.Property(e => e.ProductExpireDate)
                    .HasColumnName("PRODUCT_EXPIRE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasColumnName("PRODUCT_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.ProductPrice)
                    .HasColumnName("PRODUCT_PRICE")
                    .HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PRODUCTS_BELONGS_T_CATEGORY");
            });

            modelBuilder.Entity<Reserved>(entity =>
            {
                entity.HasKey(e => new { e.CategoryId, e.ProductId, e.UserId, e.CartId, e.ReservedId });

                entity.ToTable("RESERVED");

                entity.HasIndex(e => new { e.CategoryId, e.ProductId })
                    .HasName("IS_RESERVED_FK");

                entity.HasIndex(e => new { e.UserId, e.CartId })
                    .HasName("HAS_RESERVATION_FK");

                entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");

                entity.Property(e => e.ProductId).HasColumnName("PRODUCT_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.CartId).HasColumnName("CART_ID");

                entity.Property(e => e.ReservedId)
                    .HasColumnName("RESERVED_ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ReservedAmount).HasColumnName("RESERVED_AMOUNT");

                entity.Property(e => e.ReservedOrdered).HasColumnName("RESERVED_ORDERED");

                entity.HasOne(d => d.Products)
                    .WithMany(p => p.Reserved)
                    .HasForeignKey(d => new { d.CategoryId, d.ProductId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESERVED_IS_RESERV_PRODUCTS");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Reserved)
                    .HasForeignKey(d => new { d.UserId, d.CartId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESERVED_HAS_RESER_CART");
            });

            modelBuilder.Entity<RoleList>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.UserId });

                entity.ToTable("ROLE_LIST");

                entity.HasIndex(e => e.RoleId)
                    .HasName("IS_IN_ROLES_LIST_FK");

                entity.HasIndex(e => e.UserId)
                    .HasName("HAS_ROLE_FK");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleList)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ROLE_LIS_IS_IN_ROL_ROLES");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RoleList)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ROLE_LIS_HAS_ROLE_USERS");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("ROLES");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasColumnName("ROLE_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("USERS");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");

                entity.Property(e => e.BirthDate)
                    .HasColumnName("BIRTH_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.EMail)
                    .IsRequired()
                    .HasColumnName("E-MAIL")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("FIRST_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("LAST_NAME")
                    .HasMaxLength(128)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(512)
                    .IsUnicode(false);
            });
        }
    }
}
