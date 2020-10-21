FROM node:lts-alpine3.10

WORKDIR /opt/web-platform-grpc-web-gateway

COPY package.json package.json
COPY dist/ dist/

ENTRYPOINT ["node", "dist/index.js"]
