##########################
# 1️⃣  Build stage
##########################
FROM node:18 AS build

WORKDIR /app

# Copy dependency manifests and install
COPY package*.json ./
RUN npm install

# Copy the rest of the source and generate production build
COPY . .
RUN npm run build

##########################
# 2️⃣  Runtime stage
##########################
FROM node:18-alpine

WORKDIR /app

# Install a tiny static-file server
RUN npm install -g serve     # only ~5 MB

# Copy compiled assets from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
