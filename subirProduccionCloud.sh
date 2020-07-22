#!/bin/bash
cd dist
aws s3 sync . s3://experimental.febos.io/v2/pruebas/cloud
cd ..
