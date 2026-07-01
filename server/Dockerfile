FROM node:20-bookworm-slim
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install --omit=dev
COPY server/server.js ./
ENV NODE_ENV=production
EXPOSE 4001
CMD ["node", "server.js"]
