#!/bin/bash

get-graphql-schema https://api.tarkov.dev/ > schema.graphql
echo "Schema downloaded"