# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- STAGE 2: RUN ----------
FROM node:20-alpine

WORKDIR /app

# Chỉ copy thứ cần chạy
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5050

CMD ["node", "dist/src/main.js"]

