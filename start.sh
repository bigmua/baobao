#!/bin/bash
docker build -t baobao:v1  .
docker run -d -p 80:80 baobao:v1