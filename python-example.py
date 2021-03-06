#!/usr/bin/env sh
''':'
DOCKER_IMAGE=python:3
DOCKER_CMD="python -tt"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo t) --init -v "$s":"$s":ro ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} ${DOCKER_CMD} "$s" "$@";exit $?

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
'''

import os
import sys

print("Hello world.")
print("This is the name of the script: ", sys.argv[0])
print("Number of arguments: ", len(sys.argv))
print("The arguments are: ", str(sys.argv))
print("Current directory contains:")
for name in os.listdir('.'):
  print("  " + name)

## Uncomment to read from stdin:
# print("stdin says:")
# for line in sys.stdin:
#    print("  " + line.rstrip('\n'))
