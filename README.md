# Febos-AMI
Aplicación web de Febos mas moderna, y con VUE

## Contenido
- [Ejecución](#ejecución)
- [Configuración](#configuración)
- [Deploy](#deploy)
- [Template](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/components/timeline)

## Ejecución

Dependiento del servicio (febos o narvi), el ambiente (desarrollo, pruebas, certificacion o produccion) y el portal (cloud, proveedores o clientes) se ejeucta el comando
```
npm run serve:<servicio>-<portal>:<ambiente>
```

> ej: para ejecutar el portal cloud de febos en el ambiente de produccion:
```
npm run serve:febos-cloud:production
```

## Configuración

> hay que crear estos registros en la tabla host, para cambiar el look&feel segun corresponda

```
127.0.0.1 vue.portal.narvi.cl
127.0.0.1 vue.portal.febos.cl
127.0.0.1 vue.portal.escritoriodigital.cl
```

## Deploy

> quitar el prefijo vue. paras subirlo al ambiente que corresponda

+ narvi
```
aws s3 cp vue.narvi.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.narvi.cl.json
```

+ Febos
```
aws s3 cp vue.febos.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.febos.cl.json
```

+ escritorio digital (ed)
```
aws s3 cp vue.ed.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.febos.cl.json
```
para deployar la web de escritorio digital:
(hay que tener instalado AWS-CLI con los permisos para subir archivos a S3 y borrar cache de cloudfront)
```
./deployED.sh desarrollo cloud
```


# SSL LOCAL
en MAC instalar mkcert
```
brew install mkcert
```

instalar el CA
```
mkcert -install
```

crear un certificado valido para todos los dominios:
```
mkcert "vue.portal.febos.cl" "vue.portal.febos.co" "vue.www.narvi.cl" "vue.portal.narvi.cl" "vue.portal.escritoriodigital.cl" localhost 127.0.0.1 ::1
```
Luego de generar los certificados, debes buscarlos al home de tu usuario, cargarlo en la
carpeta certs y renombrarlos a:
```
 key: fs.readFileSync('./certs/cert.dev.key.pem')
 cert: fs.readFileSync('./certs/cert.dev.pem')
```
#### Para que los productos de jetbrain reconoscan las rutas con alias @ se debe agregar el webpack config a la configuracion
https://www.jetbrains.com/help/idea/using-webpack.html#ws_webpack_before_you_start


ir a preferencias > lenguaje > javascript > webpack   y configurar 


[ruta al proyecto]/node_modules/@vue/cli-service/webpack.config.js

