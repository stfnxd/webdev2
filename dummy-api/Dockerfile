# Brug en Node.js base image
FROM node:14

# Kopier package.json og package-lock.json
COPY package*.json ./

# Installer appafhængigheder
RUN npm install

# Kopier resten af filerne fra dummy-api-mappen
COPY . .

# Udstil port 3001
EXPOSE 3001

# Start serveren
CMD ["node", "server.js"]
