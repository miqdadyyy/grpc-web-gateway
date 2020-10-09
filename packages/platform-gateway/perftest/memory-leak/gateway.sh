#!/bin/bash

export API_HOST=qavdc2-m.dlg.im:443
export API_SECURE=true

#export NODE_OPTIONS="--max-old-space-size=128 --require=../utils/memory-usage.js"
export NODE_OPTIONS="--inspect --max-old-space-size=128 --require=../utils/memory-usage.js"

node ../../src/index.js
