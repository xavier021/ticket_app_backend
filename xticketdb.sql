CREATE TABLE "xticket_statuses"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" BIGINT NOT NULL
);

ALTER TABLE "xticket_statuses" ADD PRIMARY KEY("id");

CREATE TABLE "xticket_priorities"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" BIGINT NOT NULL
);

ALTER TABLE "xticket_priorities" ADD PRIMARY KEY("id");

CREATE TABLE "xticket_categories"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" BIGINT NOT NULL
);

ALTER TABLE "xticket_categories" ADD PRIMARY KEY("id");

CREATE TABLE "xticket_categories_users"(
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);

ALTER TABLE "xticket_categories_users" ADD PRIMARY KEY("category_id");

CREATE TABLE "xticket"(
    "id" INTEGER NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "html" TEXT NULL,
    "status_id" INTEGER NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" BIGINT NOT NULL,
    "completed_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);

ALTER TABLE "xticket" ADD PRIMARY KEY("id");

CREATE INDEX "xticket_subject_index" ON "xticket"("subject");

CREATE INDEX "xticket_status_id_index" ON "xticket"("status_id");

CREATE INDEX "xticket_priority_id_index" ON "xticket"("priority_id");

CREATE INDEX "xticket_user_id_index" ON "xticket"("user_id");

CREATE INDEX "xticket_agent_id_index" ON "xticket"("agent_id");

CREATE INDEX "xticket_category_id_index" ON "xticket"("category_id");

CREATE INDEX "xticket_completed_at_index" ON "xticket"("completed_at");

CREATE TABLE "xticket_comments"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "content" TEXT NOT NULL,
    "html" TEXT NULL
);

ALTER TABLE "xticket_comments" ADD PRIMARY KEY("id");

CREATE INDEX "xticket_comments_user_id_index" ON "xticket_comments"("user_id");

CREATE INDEX "xticket_comments_ticket_id_index" ON "xticket_comments"("ticket_id");

CREATE TABLE "xticket_audits"(
    "id" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE "xticket_audits" ADD PRIMARY KEY("id");

CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "ticket_admin" BOOLEAN NOT NULL,
    "ticket_agent" BOOLEAN NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL
);

ALTER TABLE "users" ADD PRIMARY KEY("id");

ALTER TABLE "xticket" ADD CONSTRAINT "xticket_priority_id_foreign" FOREIGN KEY("priority_id") REFERENCES "xticket_priorities"("id");

ALTER TABLE "xticket" ADD CONSTRAINT "xticket_status_id_foreign" FOREIGN KEY("status_id") REFERENCES "xticket_statuses"("id");

ALTER TABLE "xticket" ADD CONSTRAINT "xticket_agent_id_foreign" FOREIGN KEY("agent_id") REFERENCES "users"("id");

ALTER TABLE "xticket" ADD CONSTRAINT "xticket_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "xticket_categories"("id");

ALTER TABLE "xticket_comments" ADD CONSTRAINT "xticket_comments_ticket_id_foreign" FOREIGN KEY("ticket_id") REFERENCES "xticket"("id");

ALTER TABLE "xticket_audits" ADD CONSTRAINT "xticket_audits_ticket_id_foreign" FOREIGN KEY("ticket_id") REFERENCES "xticket"("id");

ALTER TABLE "xticket" ADD CONSTRAINT "xticket_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE "xticket_categories_users" ADD CONSTRAINT "xticket_categories_users_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE "xticket_comments" ADD CONSTRAINT "xticket_comments_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE "xticket_audits" ADD CONSTRAINT "xticket_audits_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
