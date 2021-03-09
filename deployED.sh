#!/bin/bash
ENVIRONMENT=$1
PORTAL=$2

available_environments=(desarrollo pruebas certificacion produccion)
available_portals=(cloud)

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

# shellcheck disable=SC2046
if [ $(contains "${available_environments[@]}" "$ENVIRONMENT") == "n" ]; then
  echo "Ambiente no valido"
  exit 0
fi

# shellcheck disable=SC2046
if [ $(contains "${available_portals[@]}" "$PORTAL") == "n" ]; then
  echo "Portal no valido"
  exit 0
fi

BUILD_COMMAND="vue-cli-service build --mode ed.$ENVIRONMENT.$PORTAL"
$BUILD_COMMAND

echo "* Subiendo Portal"
UPLOAD_COMMAND="aws s3 cp dist/ s3://portal.escritoriodigital.cl/$ENVIRONMENT/$PORTAL/ --only-show-errors --recursive"
$UPLOAD_COMMAND

case $ENVIRONMENT in
    desarrollo)
        DISTRIBUTION_ID=E3T22DB8Q95W3N
        ;;
    pruebas)
        DISTRIBUTION_ID=E1BQ7WP179UK31
        ;;
    produccion)
        DISTRIBUTION_ID=E1NB4DXZ5KSJL6
        ;;
esac

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "* Borrando Cache"
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/$ENVIRONMENT/*" > /dev/null 2>&1
  $CLEAR_COMMAND
else
  echo "No se tiene id de distribución para este ambiente, no se puede borrar el cache"
fi

echo "Listo!"

