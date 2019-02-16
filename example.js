#!/bin/bash -x
function noop() {
    return
}

function dockerShebang() {
    noop /*
    cat example.js | awk "x==1 {print} /^${FUNCNAME[0]}$/ {x=1}" | docker run --rm -i node
    exit $?
    */
}

dockerShebang


console.log('hello world')

