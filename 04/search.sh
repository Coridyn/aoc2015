#!/bin/sh

# Search for md5 hashes matching certain criteria
# https://adventofcode.com/2015/day/4

if [ "$1" == "" ]; then
    echo "Pass starting number as first param"
    exit 1
fi

if [ "$2" == "" ]; then
    echo "Pass count as second param"
    exit 1
fi



key="bgvyzdsv"

count=$1
max=$2

echo "Searching to: ${max}"

while [ $count -lt $max ]; do
    str="${key}${count}"
    result=$(md5 -qs "$str")
    
    progress=$(($count % 1000))
    
    head="${result:0:5}"
    if [ $head == "00000" ]; then
        echo "${str} ($count): $result"
        break
    elif [ $progress -eq 0 ]; then
        echo "Progress: $count"
    # else
    #     echo "${str}: $result"
    fi
    
    ((count++))
done
