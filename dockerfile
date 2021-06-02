FROM  node:current-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN ls
RUN pwd

ENV NODE_ENV=production
ENV DBURL=postgres://postgres:123@172.20.0.5:5432/postgres
ENV PORT=3001

RUN pwd
COPY . .

EXPOSE 3001

CMD [ "npm", "run" , "prod" ]