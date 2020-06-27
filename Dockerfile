FROM mhart/alpine-node:12
WORKDIR '/app'
COPY package*.json ./

RUN apk update && apk upgrade

RUN apk add --no-cache bash git openssh

RUN npm install -g yarn

RUN yarn install

COPY . .
RUN yarn build

FROM nginx
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html