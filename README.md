# docker-shebang

Run any self-contained single-file script, with any interpreter from the Docker ecosystem. Only Docker and `sh` are
required to be locally installed.

No extra file to install. Just choose an example header below, to paste at the top of your script file. Each of your
script files will be fully self-contained.

These examples don't have access to your file system by default. You can enable files by un-commenting one of the
`DOCKER_EXTRA_ARGS` lines, for read-only or read-write file access.

Exit codes, `stdin`, `stdout` and `stderr` should still work as expected, so you can always pipe data in and out!

## Usage

Remember to make each of your scripts executable:

```sh
chmod +x your-script.js
chmod +x your-script.py
```

Then just run the script:

```sh
./your-script.js
```
```sh
./your-script.py
```

### Node.js

With this header, you can set `NODE_VERSION` to any of the available tags: https://hub.docker.com/_/node
                   
Paste this at the beginning of your `.js` script file:

```js
#!/usr/bin/env sh
/** 2>/dev/null

 NODE_VERSION=lts

 ## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
 # DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
 # DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

 cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init ${DOCKER_EXTRA_ARGS} node:${NODE_VERSION} node - "$0" "$@";exit $?

 This single-file script runner via Docker:
 https://github.com/hugojosefson/docker-shebang
 */
process.argv.splice(1, 1) // Fixes arguments to be as expected.

///////////////////////////////////////////////////////////////////////////////
////  YOUR JS CODE BEGINS HERE:
///////////////////////////////////////////////////////////////////////////////

```

See also [node-example.js](./node-example.js) for the full example, with code.

### Node.js with npm dependencies

With this header, you can also specify the contents of a `package.json`, which will be installed inside Docker each
time your script is run.
                   
Paste this at the beginning of your `.js` script file, and edit the `dependencies` to your needs:

```js
#!/usr/bin/env sh
/** 2>/dev/null

 NODE_VERSION=lts

 PACKAGE_JSON='{
   "dependencies": {
   
     // -=> [ YOUR DEPS ] <=- \\
     // -=> [  GO HERE  ] <=- \\
     
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

```

See also [node-example-with-dependencies.js](./node-example-with-dependencies.js) for the full example, with code.

### Python
                   
With this header, you can set `PYTHON_VERSION` to any of the available tags: https://hub.docker.com/_/python

Paste this at the beginning of your `.py` script file:

```python
#!/bin/sh
''':'
PYTHON_VERSION=3

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(readlink -f "$0")";docker run --rm -i --init -w "$(dirname "$s")" -v "$s":"$s":ro ${DOCKER_EXTRA_ARGS} python:${PYTHON_VERSION} python -tt "$s" "$@";exit $?

This single-file script runner via Docker:
https://github.com/hugojosefson/docker-shebang
'''

```

See also [python-example.py](./python-example.py) for the full example, with code.
