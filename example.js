#!/usr/bin/env bash
``/** 2>/dev/null
NODE_VERSION=lts
cat "$0"|awk "x==1{print}/^\/{40}/{x=1}"|docker run --rm -i --init node:${NODE_VERSION} node - "$0" "$@";exit $?

This single-file script runner via Docker:
https://github.com/hugojosefson/docker-shebang
*/
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  YOUR JS CODE BEGINS:
///////////////////////////////////////////////////////////////////////////////

console.log('Hello world.')
console.log(`
I was called with arguments:
${process.argv.map((arg, index) => `  $${index}: ${JSON.stringify(arg)}`)}
`)

process.exit(process.argv.length)