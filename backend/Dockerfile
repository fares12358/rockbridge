# node:20-slim (Debian/glibc) rather than alpine: bcrypt's prebuilt native
# binary targets glibc and otherwise needs a full build toolchain on musl.
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]
