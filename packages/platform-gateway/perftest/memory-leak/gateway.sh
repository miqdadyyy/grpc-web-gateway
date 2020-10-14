#!/bin/bash

export API_HOST=${API_HOST:-127.0.0.1:9999}
export API_SECURE=true

node --trace-gc --inspect \
  --max-old-space-size=256 \
  --require=../utils/memory-usage.js \
  ../../src/index.js
