#!/bin/sh

set -e

if [ "$2" = 'functional-tests' ]; then
  {
    $1 $2 && yarn cy:report:create

    exit 0
} || {
  echo "Test failed error: $?"
  yarn cy:report:create

  exit 1
}
fi

exec "$@"