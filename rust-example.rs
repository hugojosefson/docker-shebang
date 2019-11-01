#!/usr/bin/env sh
/* 2>/dev/null
DOCKER_IMAGE=rust:1
ARGS="$@"

## Optionally, un-comment one of these lines to give access to current directory, read-only or read-write:
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):ro"
# DOCKER_EXTRA_ARGS="-w $(pwd) -u $(id -u):$(id -g) -v $(pwd):$(pwd):rw"

s="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")";ss="${s}.docker-shebang.rs";awk "x==1{print}/\*\/$/{x=1}" "$0">"$ss";docker run --rm -a stdin -a stdout -a stderr -i$([ -t 0 ] && echo t) -v "$ss":"/main.rs":ro --init ${DOCKER_EXTRA_ARGS} ${DOCKER_IMAGE} sh -c "cd / && USER=root cargo new -q --bin app && cd app && cp ../main.rs src/ && cargo run -q --release -- ${ARGS}";e=$?;rm -- "$ss";exit $e

This self-contained script runner for Docker via:
https://github.com/hugojosefson/docker-shebang
*/
use std::env;

fn main() {
  println!("Hello rust!");
  println!("These are the arguments I was called with:");
  // Prints each argument on a separate line
  for (i, argument) in env::args_os().enumerate() {
    println!("{:?}: {:?}", i, argument);
  }
}
