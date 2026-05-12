FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Vérifie que le build a bien produit dist/main.js
RUN test -f dist/main.js || (echo "BUILD FAILED: dist/main.js not found" && exit 1)

# --- Image finale ---
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["node", "dist/main"]