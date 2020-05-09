#!/bin/bash
cd dist
aws s3 sync . s3://experimental.febos.cl/v2/produccion/cloud 
cd ..
