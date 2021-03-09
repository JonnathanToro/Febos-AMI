#Variables de entorno
Las variables de entorno se utilizan para dividir configuraciones segun el modo

para esto, podemos tener variables que son *globales* por ambiente que van en la rais de la carpeta 
* desarrollo.env
* pruebas.env
* certificacion.env
* produccion.env



#Modos
Los modos se reconoceran para utilizar las variables de entorno,
para esto la estructura de los modos debe ser 

```
[producto].[ambiente].[portal]
``` 

este se descompondra y cargaran las variables asociadas en el siguiente orden:

* ./environments/[ambiente].env
* ./environments/[ambiente].env.local
* ./environments/[producto]/.env
* ./environments/[producto]/.env.local
* ./environments/[producto]/[ambiente].env
* ./environments/[producto]/[ambiente].env.local
* ./environments/[producto]/[portal].env
* ./environments/[producto]/[portal].env.local

Las variables de entorno terminadas en .local no deben agregarse en el .git
