ALTER TABLE "stripe" DROP CONSTRAINT "stripe_userId_unique";--> statement-breakpoint
ALTER TABLE "stripe" DROP CONSTRAINT "stripe_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "stripe" ADD CONSTRAINT "stripe_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "stripe" DROP COLUMN "user_id";