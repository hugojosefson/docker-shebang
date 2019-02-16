#!/usr/bin/env bash
``
/** 2>/dev/null

 NODE_VERSION=lts
 PACKAGE_JSON='{
   "name": "docker-shebang-runner",
   "dependencies": {
     "yargs": "*"
   }
 }
 '

 YARN_AND_NODE='#!/bin/sh
 yarn >/dev/null 2>&1
 [ $? = 0 ] && exec node "$@"
 e=$?
 cat yarn-error.log >&2
 exit $e
 '

 p="$(readlink -f "${0}.package.json")"
 echo "${PACKAGE_JSON}">"$p"

 yn="$(readlink -f "${0}.yarn-and-node")"
 echo "${YARN_AND_NODE}">"$yn"
 chmod +x "$yn"

 cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init -w /app -v "$p":/app/package.json:ro -v "$yn":/app/yarn-and-node:ro node:${NODE_VERSION} ./yarn-and-node - "$0" "$@";e=$?;rm "$p";rm "$yn";exit $e

 This single-file script runner via Docker:
 https://github.com/hugojosefson/docker-shebang
 */
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  YOUR JS CODE BEGINS:
///////////////////////////////////////////////////////////////////////////////

console.log('Hello world.')
console.log(`require('yargs') returns a ${typeof require('yargs')}.`)
console.log(`
I was called with arguments:
${process.argv.map((arg, index) => `  $${index}: ${JSON.stringify(arg)}`)}
`)

process.exit(process.argv.length)
