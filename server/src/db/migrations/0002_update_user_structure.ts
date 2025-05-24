import { sql } from "drizzle-orm";

export async function up(db: any) {
  // Add new columns to users table
  await db.schema
    .alterTable("users")
    .addColumn("password_hash", "varchar(255)", { notNull: true })
    .addColumn("first_name", "varchar(100)", { notNull: true })
    .addColumn("last_name", "varchar(100)", { notNull: true })
    .execute();

  // Migrate data from parents to users
  await db.execute(sql`
        UPDATE users u
        SET 
            password_hash = p.password_hash,
            first_name = p.first_name,
            last_name = p.last_name
        FROM parents p
        WHERE u.id = p.user_id
    `);

  // Add user_id to children table
  await db.schema
    .alterTable("children")
    .addColumn("user_id", "uuid", { references: "users.id" })
    .execute();

  // Remove columns from parents table
  await db.schema
    .alterTable("parents")
    .dropColumn("email")
    .dropColumn("password_hash")
    .dropColumn("first_name")
    .dropColumn("last_name")
    .dropColumn("role")
    .execute();

  // Remove columns from children table
  await db.schema
    .alterTable("children")
    .dropColumn("first_name")
    .dropColumn("last_name")
    .execute();
}

export async function down(db: any) {
  // Add columns back to parents table
  await db.schema
    .alterTable("parents")
    .addColumn("email", "varchar(255)", { notNull: true, unique: true })
    .addColumn("password_hash", "varchar(255)", { notNull: true })
    .addColumn("first_name", "varchar(100)", { notNull: true })
    .addColumn("last_name", "varchar(100)", { notNull: true })
    .addColumn("role", "varchar(50)", { notNull: true, defaultValue: "parent" })
    .execute();

  // Migrate data back to parents
  await db.execute(sql`
        UPDATE parents p
        SET 
            email = u.email,
            password_hash = u.password_hash,
            first_name = u.first_name,
            last_name = u.last_name
        FROM users u
        WHERE p.user_id = u.id
    `);

  // Add columns back to children table
  await db.schema
    .alterTable("children")
    .addColumn("first_name", "varchar(100)", { notNull: true })
    .addColumn("last_name", "varchar(100)", { notNull: true })
    .execute();

  // Migrate data back to children
  await db.execute(sql`
        UPDATE children c
        SET 
            first_name = u.first_name,
            last_name = u.last_name
        FROM users u
        WHERE c.user_id = u.id
    `);

  // Remove columns from users table
  await db.schema
    .alterTable("users")
    .dropColumn("password_hash")
    .dropColumn("first_name")
    .dropColumn("last_name")
    .execute();

  // Remove user_id from children table
  await db.schema.alterTable("children").dropColumn("user_id").execute();
}
