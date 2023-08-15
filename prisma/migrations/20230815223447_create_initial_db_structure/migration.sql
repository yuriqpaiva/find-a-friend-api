-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "dependency_level" INTEGER NOT NULL,
    "environment" TEXT NOT NULL,
    "adopted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_pictures" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,

    CONSTRAINT "pet_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_requisites" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,

    CONSTRAINT "pet_requisites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE INDEX "organizations_email_idx" ON "organizations"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_pictures" ADD CONSTRAINT "pet_pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_requisites" ADD CONSTRAINT "pet_requisites_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
