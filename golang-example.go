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

package main

import "os"
import "fmt"

func main() {
  fmt.Println("Hello world.")
  fmt.Println("I was called with arguments:")
  fmt.Printf("%#v\n", os.Args)
}
