FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app
EXPOSE 3000
COPY . .
COPY .env.prod ./.env
RUN npm install
RUN npm run build
CMD ["npm", "start"]
