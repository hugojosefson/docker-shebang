#!/usr/bin/env sh
/* 2>/dev/null
DOCKER_IMAGE=node:lts
DOCKER_CMD="node"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo t) --init -v "$s":"$s":ro ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} ${DOCKER_CMD} "$s" "$@";exit $?

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
*/

const listOfArgs = process.argv
  .map((arg, index) => `  process.argv[${index}]=${JSON.stringify(arg)}`)
  .join('\n')

console.log('Hello world.')
console.log(`I was called with arguments:\n${listOfArgs}`)

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
