#!/bin/bash
APP=$1
ENVIRONMENT=$2
PORTAL=$3
PAIS=$4

available_app=(ED Narvi)
available_environments=(desarrollo pruebas certificacion produccion)

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
if [ $(contains "${available_app[@]}" "${APP}") == "n" ]; then
  echo "App no valido"
  exit 0
fi


BUILD_COMMAND="./deploy${APP}.sh ${ENVIRONMENT} ${PORTAL}"
$BUILD_COMMAND
echo "Listo!"

