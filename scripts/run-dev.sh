#!/bin/sh

FILE=$1

echo "----------------------------------------"
echo "Running file: ${FILE}"
echo "----------------------------------------"

tsnd --respawn -r @babel/register src/${FILE}.ts