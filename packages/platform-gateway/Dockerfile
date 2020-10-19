
FROM node:lts-alpine3.10

WORKDIR /opt/web-platform-grpc-web-gateway

COPY package.json package.json
COPY node_modules/ node_modules/
COPY dist/ dist/

ENTRYPOINT ["node", "dist/src/index.js"]
