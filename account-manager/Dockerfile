FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]
