#!/bin/sh
cd /Users/banli/Desktop/blog-demo/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log