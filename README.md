# docker-shebang

Run any self-contained single-file script using any interpreter, just as long as Docker is installed on the machine.

These examples don't have access to your file system, but `stdin`, `stdout`, `stderr` and exit codes should work as
expected.

## Usage

Remember to make each of your scripts executable:

```bash
chmod +x your-script.js
chmod +x your-script.py
```

Then just run the script:

```bash
./your-script.js
```
```bash
./your-script.py
```

### Node.js

With this header, you can set `NODE_VERSION` to any of the available tags: https://hub.docker.com/_/node
                   
Paste this at the beginning of your `.js` script file:

```js
#!/usr/bin/env bash
/** 2>/dev/null

 NODE_VERSION=lts

 cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init node:${NODE_VERSION} node - "$0" "$@";exit $?

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
#!/usr/bin/env bash
/** 2>/dev/null

 NODE_VERSION=lts

 PACKAGE_JSON='{
   "dependencies": {
   
     // -=> [ YOUR DEPS ] <=- \\
     // -=> [  GO HERE  ] <=- \\
     
   }
 }'

 yn="$(readlink -f "${0}.yarn-and-node")";echo 'yarn >/dev/null 2>&1;[ $? = 0 ] && exec node "$@";e=$?;cat yarn-error.log>&2;exit $e'>"$yn";p="$(readlink -f "${0}.package.json")";echo "${PACKAGE_JSON}">"$p";cat "$0"|awk "x==1{print}/\*\/$/{x=1}"|docker run --rm -i --init -w /app -v "$p":/app/package.json:ro -v "$yn":/app/yarn-and-node:ro node:${NODE_VERSION} sh yarn-and-node - "$0" "$@";e=$?;rm "$p";rm "$yn";exit $e

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

s="$(readlink -f "$0")";docker run --rm -i --init -w "$(dirname "$s")" -v "$s":"$s":ro python:${PYTHON_VERSION} python -tt "$s" "$@";exit $?

This single-file script runner via Docker:
https://github.com/hugojosefson/docker-shebang
'''

```

See also [python-example.py](./python-example.py) for the full example, with code.
