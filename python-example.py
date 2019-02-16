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

import os
import sys

print("Hello world.")
print("This is the name of the script: ", sys.argv[0])
print("Number of arguments: ", len(sys.argv))
print("The arguments are: ", str(sys.argv))
print("Current directory contains:")
for name in os.listdir('.'):
  print("  " + name)
