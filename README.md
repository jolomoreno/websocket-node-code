# websocket-node-code - Jose Lorenzo Moreno Moreno

## Ejecución y pruebas 

Para arrancar el servidor hay que situarse en la raiz del proyecto y ejecutar los comandos:
* npm install (instala dependencias)
* npm run start (arranca el servidor en el puerto 3000 aunque las peticiones se harán en los puertos 3100 y 3200, chargers y widgets)

Acto seguido, hay que situarse en el directorio **clients** y abrir en el navegador web los archivos **charger.html** y **widget.html** correspondientes al cargador y al avisador, respectivamente.

Se comprueba que el cargador está enviando el estado **charging** y el avisador está recibiendo ese mismo estado **charging**.

Para ejecutar los **Test E2E** hay que situarse en la raiz del proyecto y ejecutar los comandos:
* npm run test (se ejecutan los test E2E)
* npm run test:coverage (se ejecutan los test E2E y, además, se calcula la cobertura de código)

### Cargadores

Los cargadores se conectan a nuestro servidor de este modo:

```javascript
let connection = new WebSocket('ws://localhost:3100/chargers/c1234');
```

donde *c1234* es el id del cargador.

Los mensajes que nos envían los cargadores indicando un nuevo estado (*charging*, *charging80*, y *charged*) son así:

```javascript
connection.send(JSON.stringify(
    {
        "event": "chargingStatus",
        "data": {
            "status": "charging",
        }
    }
));
```

### Avisadores

Los avisadores se conectan a nuestro servidor de este modo:

```javascript
let connection = new WebSocket('ws://localhost:3200/widgets/wABCD');
```

donde *wABCD* es el id del avisador.

Los avisadores reciben por parte del servidor, mensajes exactamente iguales a los enviados por los cargadores.

## A tener en cuenta:

* El código es autexplicativo, se ha organizado el código de la siguiente manera:
    - En el paquete **src** se encuentra toda la lógica del proyecto.
        - En el paquete **events** se encuentran los paquetes **charger** y **widget**.
    - Los tests se encuentran dentro del paquete **e2e**
    - Los clientes se encuentran en **clients**

* Se utiliza el framework NestJs con el lenguaje Typescript. El único requisito era que se utilizase [ws](https://github.com/websockets/ws/) 

* Se han incluido dos **Test E2E** utilizando **Jest** para realizar sendas pruebas de conexión y comunicación entre un cliente y nuestro servidor.

* Si quieres, añade notas explicando las decisiones más importantes que has tomado.
