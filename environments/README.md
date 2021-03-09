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

## Variables de entorno por ambiente que son globales y comunes para cada producto
aqui se debe configurar el stage de la api, y cualquier cosa que sea comun entre todos los productos y que cambia por ambiente 
* ./environments/[ambiente].env
* ./environments/[ambiente].env.local

#### Ejemplo:
```
 ./environments/desarrollo.env

VUE_APP_AMBIENTE=desarrollo
```

## Variables de entorno que son globales para cada producto
Aqui debemos configurar los colores de texto imagenes, logos y lo especifico de cada producto
* ./environments/[producto]/.env
* ./environments/[producto]/.env.local

#### Ejemplo:
```
 ./environments/ed/.env
```

##Variables de entorno que son especificas para un ambiente en un producto
aqui debemos configurar lo especifico para un ambiente en un producto, como por ejemplo el dominio al que responde
* ./environments/[producto]/[ambiente].env
* ./environments/[producto]/[ambiente].env.local

#### Ejemplo:
```
 ./environments/ed/desarrollo.env
```

##Variables de entorno que son especificas para un portal en un producto
Si el portal del producto tiene alguna configuracion especifica como imagen de ingreso o otra cosa, la debiesemos configurar aqui
* ./environments/[producto]/[portal].env
* ./environments/[producto]/[portal].env.local

#### Ejemplo:
```
 ./environments/ed/cloud.env
```

Las variables de entorno terminadas en .local no deben agregarse en el .git
