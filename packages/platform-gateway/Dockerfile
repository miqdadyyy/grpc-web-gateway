
FROM node:lts-alpine3.10

WORKDIR /opt/web-platform-grpc-web-gateway

COPY src/ src/
COPY package.json package.json

ENTRYPOINT ["npm", "start"]