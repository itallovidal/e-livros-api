/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "alugados" DROP CONSTRAINT "alugados_user_id_fkey";

-- DropForeignKey
ALTER TABLE "favoritos" DROP CONSTRAINT "favoritos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lidos" DROP CONSTRAINT "lidos_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "alugados" ADD CONSTRAINT "alugados_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lidos" ADD CONSTRAINT "lidos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
