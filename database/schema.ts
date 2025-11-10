import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar, date } from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum('status', ['В обработке', 'Одобрено', 'Отклонено']);
export const ROLE_ENUM = pgEnum('role', ['ADMIN', 'USER']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text('password').notNull(),
  universityCard: text('university_card').notNull(),
  status: STATUS_ENUM('status').default('В обработке'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).notNull().defaultNow(),
});


