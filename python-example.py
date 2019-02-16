#!/bin/sh
''':'
PYTHON_VERSION=3

s="$(readlink -f "$0")";docker run --rm -i --init -w "$(dirname "$s")" -v "$s":"$s":ro python:${PYTHON_VERSION} python -tt "$s" "$@";exit $?

This single-file script runner via Docker:
https://github.com/hugojosefson/docker-shebang
'''

import sys

print("Hello world.")
print("This is the name of the script: ", sys.argv[0])
print("Number of arguments: ", len(sys.argv))
print("The arguments are: ", str(sys.argv))

