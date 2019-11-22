# gRPC Web Gateway

Proxies HTTP & WebSocket requests to gRPC service.

## Usage

```js
const path = require('path');

const gateway = createGrpcGateway({
  apiHost: 'grpc-api:443'
});

gateway.listen(8080);
```
