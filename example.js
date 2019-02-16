#!/usr/bin/env bash
function noop() {
    return
}

noop /*
cat "$0"|awk "x==1{print}/^\*\//{x=1}"|docker run --rm -i --init node node - "$0" "$@";exit $?;

Single-file script runner via docker:
https://github.com/hugojosefson/docker-shebang
*/
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  BEGIN YOUR SCRIPT HERE
///////////////////////////////////////////////////////////////////////////////

console.log('Hello world.')
console.log(`
I was called with arguments:
${process.argv.map((arg, index) => `  $${index}: ${JSON.stringify(arg)}`)}
`)

process.exit(process.argv.length)