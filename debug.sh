#!/bin/bash

# usage
# curl https://raw.githubusercontent.com/ketan/snap-debug/master/debug.sh | URL='https://shielxded-falls-4181.herokuapp.com/' bash

set -e
git clone https://github.com/ketan/snap-debug
cd snap-debug

npm install > /dev/null 2>&1
echo "Will run the debugger for 10 minutes before terminating it"

timeout 10m node client.js
