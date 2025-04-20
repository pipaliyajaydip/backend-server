FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . . [it's overwrites the volume changes, we have written volume in compose file]

EXPOSE 5000

CMD ["npm", "run", "dev"]