#!/bin/bash
./deploy.sh desarrollo $1
./deploy.sh pruebas $1
./deploy.sh certificacion $1
./deploy.sh produccion $1

