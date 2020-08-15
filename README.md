# Febos-AMI
Aplicación web de Febos mas moderna, y con VUE

# Ejecucion
Dependiento del servicio (febos o narvi) y el ambiente (desarrollo, pruebas, certificacion o produccion) y el portal (cloud, proveedores o clientes) se ejeucta el comando
npm run serve/<servicio>/<ambiente>/<portal>

ej: para ejecutar el portal cloud de febos en el ambiente de produccion:
npm run serve/febos/produccion/cloud

# archivos de layot de config

# hay que crear estos registros en la tabla host, para cambiar el look&feel segun corresponda
127.0.0.1 vue.portal.narvi.cl
127.0.0.1 vue.portal.febos.cl
120.0.0.1 vue.portal.escritoriodigital.cl

#quitar el prefijo vue. paras subirlo al ambiente que corresponda
#narvi
aws s3 cp vue.narvi.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.narvi.cl.json

#Febos
aws s3 cp vue.febos.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.febos.cl.json

#escritorio digital (ed)
aws s3 cp vue.ed.config.portal.json s3://archivos.febos.io/cl/produccion/portales/vue.portal.febos.cl.json
