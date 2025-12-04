ALTER TABLE "user" ADD COLUMN "stripe_product_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripe_customer_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripe_subscription_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_status" varchar(20);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan_name" varchar(50);--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_stripeCustomerId_unique" UNIQUE("stripe_customer_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_stripeSubscriptionId_unique" UNIQUE("stripe_subscription_id");