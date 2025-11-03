# -------------------------
# Build Stage
# -------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# فقط package.json و package-lock.json برای کش npm
COPY package*.json ./
RUN npm install

# کل پروژه، شامل prisma و src
COPY . .

# Prisma generate (حتما بعد از copy کردن schema.prisma)
RUN npx prisma generate

# NestJS build
RUN npm run build

# -------------------------
# Runtime Stage
# -------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# کپی کردن فایل‌های build شده و node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY .env .env

EXPOSE 3000

# مسیر اصلی فایل main.js داخل dist/src/main.js هست
CMD ["node", "dist/src/main.js"]
