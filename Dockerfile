FROM node:20-slim

COPY ./ /home/node/

WORKDIR /home/node/

#USER node

RUN npm install

EXPOSE 3001

CMD npm run start
