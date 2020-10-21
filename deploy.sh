#!/bin/bash
AMBIENTE=$1
PORTAL=$2

ambientes_disponibles=("desarrollo" "pruebas" "certificacion" "produccion")
portales_disponibles=("cloud")
function contains() {
    local n=$#
    local value=${!n}
    for ((i=1;i < $#;i++)) {
        if [ "${!i}" == "${value}" ]; then
            echo "y"
            return 0
        fi
    }
    echo "n"
    return 1
}

if [ $(contains "${ambientes_disponibles[@]}" "$AMBIENTE") == "n" ]; then
  echo "Ambiente no valido"
  exit 0
fi

if [ $(contains "${portales_disponibles[@]}" "$PORTAL") == "n" ]; then
  echo "Portal no valido"
  exit 0
fi

COMANDO="vue-cli-service build --mode narvi.$AMBIENTE.$PORTAL"
$COMANDO
echo "* Subiendo Portal"
aws s3 cp dist/ s3://narvi.cl/$AMBIENTE/$PORTAL/ --only-show-errors --recursive
echo "* Borrando Cache"
aws cloudfront create-invalidation --distribution-id EK96US4D2LAMT --paths "/desarrollo/*" > /dev/null 2>&1
echo "Listo!"

