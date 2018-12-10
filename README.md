# gRPC Web Gateway

Proxies HTTP & WebSocket requests to gRPC service.

## Usage

```
const path = require('path');

const gateway = createGrpcGateway({
  apiHost: 'grpc-api:443',
  protoRoot: path.join(__dirname, 'proto/api.proto'),
});

gateway.listen(8080);
```
