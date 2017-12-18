#!/bin/sh

# for five zeros: the answer is 254575


if [ "$1" == "" ]; then
    echo "Pass process count as first param"
    exit 1
fi


if [ "$2" == "" ]; then
    echo "Pass search count as second param"
    exit 1
fi

offset=$3
if [ "$3" == "" ]; then
    offset=0
fi

./list.sh $1 $2 $offset | xargs -L 2 -P $1 ./search.sh