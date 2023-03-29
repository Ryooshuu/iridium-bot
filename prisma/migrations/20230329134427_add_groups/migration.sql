/*
  Warnings:

  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PermissionLevel" AS ENUM ('Default', 'Moderator', 'Administrator', 'Owner');

-- DropTable
DROP TABLE "Guild";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "permission_level" "PermissionLevel" NOT NULL DEFAULT 'Default',
    "public" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_assignments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "group_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "settings" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group_assignments" ADD CONSTRAINT "group_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_assignments" ADD CONSTRAINT "group_assignments_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
