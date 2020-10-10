#!/bin/bash

export API_HOST=qavdc2-m.dlg.im:443
export API_SECURE=true

node --trace-gc --inspect \
  --max-old-space-size=256 \
  --require=../utils/memory-usage.js \
  ../../src/index.js
