#!/usr/bin/env bash
function noop() {
    return
}

noop /*
cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i node;exit $?;

Single-file script runner via docker: https://github.com/hugojosefson/docker-shebang
*/

console.log('hello world')
