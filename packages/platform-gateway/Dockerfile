FROM node:14-alpine3.12

WORKDIR /opt/web-platform-grpc-web-gateway

COPY package.json package.json
COPY dist/ dist/

ENTRYPOINT ["node", "dist/index.js"]
