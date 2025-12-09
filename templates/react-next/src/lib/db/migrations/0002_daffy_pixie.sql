CREATE TABLE "stripe" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text,
	"customer_id" text,
	"subscription_id" text,
	"subscription_status" varchar(20),
	"plan_name" varchar(50),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stripe_customerId_unique" UNIQUE("customer_id"),
	CONSTRAINT "stripe_subscriptionId_unique" UNIQUE("subscription_id"),
	CONSTRAINT "stripe_userId_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_stripeCustomerId_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_stripeSubscriptionId_unique";--> statement-breakpoint
ALTER TABLE "stripe" ADD CONSTRAINT "stripe_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "stripe_product_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "stripe_subscription_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "subscription_status";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "plan_name";