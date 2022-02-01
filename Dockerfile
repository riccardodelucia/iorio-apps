# build stage
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html

COPY entrypoint.sh /docker-entrypoint.d/my_entrypoint.sh
RUN chmod +x /docker-entrypoint.d/my_entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.d/my_entrypoint.sh"]
CMD ["nginx"]
