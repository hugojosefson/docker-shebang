# docker-shebang

Run any self-contained single-file script, with any interpreter from the Docker ecosystem. Only Docker and `sh` are
required to be installed locally.

No extra file nor runtime to install, besides Docker. Simply choose an example shebang+comment below, to paste at the
top of your script. Your script file will be fully self-contained!

This page has examples for:

  * [Node.js](#nodejs)
  * [Node.js with dependencies](#nodejs-with-npm-dependencies)
  * [Python](#python)
  * [Go (golang)](#go)

These examples don't have access to your file system by default. You can enable files by un-commenting one of the
`DOCKER_EXTRA_ARGS` lines, for read-only or read-write file access.

Exit codes, `stdin`, `stdout` and `stderr` should still work as expected, so you can always pipe data in and out.

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

You can set `DOCKER_IMAGE` to any compatible Docker image with `node`. Suggested: https://hub.docker.com/_/node
                   
Paste this shebang line and comment at the beginning of your `.js` script file:

```js
#!/usr/bin/env sh
/* 2>/dev/null
DOCKER_IMAGE=node:lts
DOCKER_CMD="node"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(readlink -f "$0")";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo -n t) --init -v "$s":"$s":ro ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} ${DOCKER_CMD} "$s" "$@";exit $?

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
*/

```

See also [node-example.js](./node-example.js) for the full example, with code.

### Node.js with npm dependencies

You can set `DOCKER_IMAGE` to any compatible Docker image with `node`. Suggested: https://hub.docker.com/_/node

You can also specify the contents of a `package.json`, which will be installed inside Docker each time your script is
run.
                   
Paste this shebang line and comment at the beginning of your `.js` script file, and edit the `dependencies` to your
needs:

```js
#!/usr/bin/env sh
/* 2>/dev/null
DOCKER_IMAGE=node:lts
DOCKER_CMD="node"

PACKAGE_JSON='{
  "dependencies": {

    // -=> [ YOUR DEPS ] <=- \\
    // -=> [  GO HERE  ] <=- \\

  }
}'

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(readlink -f "$0")";yn="${s}.yarn-and-node";echo "(cd /tmp;yarn>/dev/null 2>&1;[ \$? = 0 ]) && exec ${DOCKER_CMD} \"\$@\";e=\$?;cat yarn-error.log>&2;exit \$e">"$yn";p="${s}.package.json";echo "${PACKAGE_JSON}">"$p";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo -n t) --init -v "$s":"$s":ro -v "$yn":/yarn-and-node:ro -v "$p":/tmp/package.json:ro -e NODE_PATH=/tmp/node_modules ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} sh /yarn-and-node "$s" "$@";e=$?;rm -- "$yn" "$p";exit $e

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
*/

```

See also [node-example-with-dependencies.js](./node-example-with-dependencies.js) for the full example, with code.

### Python
                   
You can set `DOCKER_IMAGE` to any compatible Docker image with `python`. Suggested: https://hub.docker.com/_/python

Paste this shebang line and string literal at the beginning of your `.py` script file:

```python
#!/usr/bin/env sh
''':'
DOCKER_IMAGE=python:3
DOCKER_CMD="python -tt"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(readlink -f "$0")";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo -n t) --init -v "$s":"$s":ro ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} ${DOCKER_CMD} "$s" "$@";exit $?

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
'''

```

See also [python-example.py](./python-example.py) for the full example, with code.

### Go

You can set `DOCKER_IMAGE` to any compatible Docker image with `go`. Suggested: https://hub.docker.com/_/golang

Paste this shebang line and comment at the beginning of your `.go` script file:

```golang
#!/usr/bin/env sh
/* 2>/dev/null
DOCKER_IMAGE=golang:alpine
DOCKER_CMD="go run"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(readlink -f "$0")";ss="${s}.docker-shebang.go";awk "x==1{print}/\*\/$/{x=1}" "$0">"$ss";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo -n t) --init -v "$ss":"$s":ro ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} ${DOCKER_CMD} "$s" "$@";e=$?;rm -- "$ss";exit $e

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
*/

```

See also [golang-example.go](./golang-example.go) for the full example, with code.

