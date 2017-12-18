#!/bin/sh

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


ps_count=$(( $1 - 1 ))
search_count=$2
for i in $( seq 0 $ps_count )
do
    start=$(($i * $search_count + $offset))
    end=$(($start + $search_count))
    
    echo "$start"
    echo "$end"
done

