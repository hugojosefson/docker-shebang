#!/usr/bin/env bash
/** 2>/dev/null

 NODE_VERSION=lts

 PACKAGE_JSON='{
   "dependencies": {
     "yargs": "13.2.0"
   }
 }'

 yn="$(readlink -f "${0}.yarn-and-node")";echo 'yarn >/dev/null 2>&1;[ $? = 0 ] && exec node "$@";e=$?;cat yarn-error.log>&2;exit $e'>"$yn";p="$(readlink -f "${0}.package.json")";echo "${PACKAGE_JSON}">"$p";cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init -w /app -v "$p":/app/package.json:ro -v "$yn":/app/yarn-and-node:ro node:${NODE_VERSION} sh yarn-and-node - "$0" "$@";e=$?;rm "$p";rm "$yn";exit $e

 This single-file script runner via Docker:
 https://github.com/hugojosefson/docker-shebang
 */
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  YOUR JS CODE BEGINS:
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
