# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 👇 THE FIX: Force Node to use up to 2GB of memory (RAM + Swap)
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]