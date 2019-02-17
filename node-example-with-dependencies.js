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

 s="$(readlink -f "$0")";yn="${s}.yarn-and-node";echo '(cd /tmp;yarn>/dev/null 2>&1;[ $? = 0 ]) && exec node "$@";e=$?;cat yarn-error.log>&2;exit $e'>"$yn";p="${s}.package.json";echo "${PACKAGE_JSON}">"$p";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo -n t) --init -v "$s":"$s":ro -v "$yn":/yarn-and-node:ro -v "$p":/tmp/package.json:ro -e NODE_PATH=/tmp/node_modules ${DOCKER_EXTRA_ARGS} node:${NODE_VERSION} sh /yarn-and-node "$s" "$@";e=$?;rm -- "$yn" "$p";exit $e

 This single-file script runner via Docker:
 https://github.com/hugojosefson/docker-shebang
 */

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

// // Uncomment to read from stdin:
// console.log()
// console.log('stdin says: ')
// process.stdin.setEncoding('utf8');
// process.stdin.on('readable', () => {
//   let chunk; while ((chunk = process.stdin.read()) !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });
// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });
