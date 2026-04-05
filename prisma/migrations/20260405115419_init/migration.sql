-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Client');

-- CreateEnum
CREATE TYPE "TypeMesure" AS ENUM ('manuelle', 'ai_generation');

-- CreateEnum
CREATE TYPE "TypeCostumisation" AS ENUM ('Col', 'Bouton', 'Broderie', 'Manche');

-- CreateEnum
CREATE TYPE "TypeTissus" AS ENUM ('Bazin', 'Coton', 'Lin');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EnAttente', 'EnProduction', 'Pret', 'Livre');

-- CreateEnum
CREATE TYPE "ModePaiement" AS ENUM ('OrangeMoney', 'Wave', 'MoovMoney', 'Visa', 'MasterCard', 'PayPal');

-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('EnAttente', 'Echouet', 'Effectue');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Client',
    "adresse" TEXT,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "prixBase" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionCustomisation" (
    "id" SERIAL NOT NULL,
    "type" "TypeCostumisation" NOT NULL,
    "nom" TEXT NOT NULL,
    "prixAjout" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,

    CONSTRAINT "OptionCustomisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tissus" (
    "id" SERIAL NOT NULL,
    "type" "TypeTissus" NOT NULL,
    "couleur" TEXT NOT NULL,
    "texture" TEXT NOT NULL,
    "prixParMetre" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "monbreDeMetres" INTEGER NOT NULL,

    CONSTRAINT "Tissus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesure" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "poitrine" DOUBLE PRECISION NOT NULL,
    "taille" DOUBLE PRECISION NOT NULL,
    "poids" DOUBLE PRECISION NOT NULL,
    "epaule" DOUBLE PRECISION NOT NULL,
    "longueurBras" DOUBLE PRECISION NOT NULL,
    "longueurJambe" DOUBLE PRECISION NOT NULL,
    "cou" DOUBLE PRECISION NOT NULL,
    "hanche" DOUBLE PRECISION NOT NULL,
    "status" "TypeMesure" NOT NULL,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Mesure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "dateCommande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statutCommande" "StatutCommande" NOT NULL DEFAULT 'EnAttente',
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenue" (
    "id" SERIAL NOT NULL,
    "commandeId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "tissusId" INTEGER NOT NULL,
    "mesureId" INTEGER NOT NULL,

    CONSTRAINT "Tenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "modePaiement" "ModePaiement" NOT NULL,
    "montant" INTEGER NOT NULL,
    "statutPaiement" "StatutPaiement" NOT NULL DEFAULT 'EnAttente',
    "imageUrl" TEXT,
    "commandeId" INTEGER NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" INTEGER,
    "tissusId" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_telephone_key" ON "Utilisateur"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_commandeId_key" ON "Paiement"("commandeId");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionCustomisation" ADD CONSTRAINT "OptionCustomisation_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesure" ADD CONSTRAINT "Mesure_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenue" ADD CONSTRAINT "Tenue_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenue" ADD CONSTRAINT "Tenue_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenue" ADD CONSTRAINT "Tenue_tissusId_fkey" FOREIGN KEY ("tissusId") REFERENCES "Tissus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenue" ADD CONSTRAINT "Tenue_mesureId_fkey" FOREIGN KEY ("mesureId") REFERENCES "Mesure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_tissusId_fkey" FOREIGN KEY ("tissusId") REFERENCES "Tissus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
