#!/usr/bin/env sh
/** 2>/dev/null

 NODE_VERSION=lts

 PACKAGE_JSON='{
   "dependencies": {
     "yargs": "13.2.0"
   }
 }'

 ## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
 # DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
 # DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

 yn="$(readlink -f "${0}.yarn-and-node")";echo '(cd /tmp;yarn>/dev/null 2>&1;[ $? = 0 ]) && exec node "$@";e=$?;cat yarn-error.log>&2;exit $e'>"$yn";p="$(readlink -f "${0}.package.json")";echo "${PACKAGE_JSON}">"$p";cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init -v "$p":/tmp/package.json:ro -v "$yn":/yarn-and-node:ro -e NODE_PATH=/tmp/node_modules ${DOCKER_EXTRA_ARGS} node:${NODE_VERSION} sh /yarn-and-node - "$0" "$@";e=$?;rm "$p";rm "$yn";exit $e

 This single-file script runner via Docker:
 https://github.com/hugojosefson/docker-shebang
 */
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  YOUR JS CODE BEGINS HERE:
///////////////////////////////////////////////////////////////////////////////

const listOfArgs = process.argv
  .map((arg, index) => `  process.argv[${index}]=${JSON.stringify(arg)}`)
  .join('\n')

console.log('Hello world.')
console.log(`I was called with arguments:\n${listOfArgs}`)

const yargs = require('yargs')
console.log()
console.log(`require('yargs') returns a ${typeof yargs}.`)
console.log(`require('yargs').argv is an ${typeof yargs.argv}.`)
console.log(`require('yargs').argv contains ${JSON.stringify(yargs.argv, null, 2)}`)

console.log()
console.log(`Current directory contains: ${JSON.stringify(require('fs').readdirSync(__dirname), null, 2)}`)
