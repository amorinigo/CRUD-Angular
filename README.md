{
	"products": [
		{
			"image": "../assets/img/products/1.png",
			"name": "Daenerys Targaryen",
			"price": 2000,
      "description": "Funko POP | Game Of Thrones - Daenerys 25",
      "inOffer": true,
      "id": "EJ27471"
		},
    {
			"image": "../assets/img/products/2.png",
			"name": "Davos Seaworth",
			"price": 3000,
      "description": "Funko POP | Game Of Thrones - Davos 62",
      "inOffer": false,
      "id": "EJ27472"
		},
    {
			"image": "../assets/img/products/3.png",
			"name": "Tormund Giantsbane",
			"price": 4000,
      "description": "Funko POP | Game Of Thrones - Tormund 53",
      "inOffer": false,
      "id": "EJ27473"
		},
    {
			"image": "../assets/img/products/4.png",
			"name": "Tyrion Lannister",
			"price": 5000,
      "description": "Funko POP | Game Of Thrones - Tyrion 50",
      "inOffer": true,
      "id": "EJ27474"
		},
    {
			"image": "../assets/img/products/5.png",
			"name": "Jon Snow",
			"price": 3500,
      "description": "Funko POP | Game Of Thrones - Jon 49",
      "inOffer": false,
      "id": "EJ27475"
		},
    {
			"image": "../assets/img/products/6.png",
			"name": "Night King",
			"price": 5300,
      "description": "Funko POP | Game Of Thrones - Night 44",
      "inOffer": false,
      "id": "EJ27476"
		},
    {
			"image": "../assets/img/products/7.png",
			"name": "Brienne of Tarth",
			"price": 7600,
      "description": "Funko POP | Game Of Thrones - Brienne 13",
      "inOffer": true,
      "id": "EJ27477"
		},
    {
			"image": "../assets/img/products/8.png",
			"name": "Ghost",
			"price": 8000,
      "description": "Funko POP | Game Of Thrones - Ghost 19",
      "inOffer": true,
      "id": "EJ27478"
		}
	]
}




# FUNCIONALIDADES AÑADIDAS:

## /CATÁLOGO:
- SELECT PARA FILTRAR.
- SELECT PARA ORDENAR.
- CÁLCULOS AUTOMÁTICOS DEL PRECIO FINAL Y DE LAS CUOTAS, DEPENDIENDO SI ESTÁ EN OFERTA O NO.
- PAGINACIÓN DINÁMICA ( NGX-PAGINATION ).
- BOTÓN PARA SUBIR AL INICIO DE LA APLICACIÓN.

## /LISTA:
- CUANDO SE SELECCIONA UN PRODUCTO DESDE EL CATÁLOGO, SE MUESTRA LA LISTA CON ESE PERSONAJE. TAMBIÉN SE ACTIVA UN BOTÓN PARA MOSTRAR TODOS LOS PRODUCTOS ( SOLO CUANDO SE TRAJO UN PRODUCTO DEL CATÁLOGO )
- BUSCADOR EN LA LISTA ( BUSCA POR NOMBRE O ID ). PARA EL ID, SE DEBEN RESPETAR MAYÚSCULAS Y MINÚSCULAS, PARA EL NOMBRE NO.
- EL ID ES COLOCADO AUTOMÁTICAMENTE POR LA 'BASE DE DATOS' ( JSON-SERVER ) , EXCEPTO LOS CREADOS MANUALMENTE.
- MENSAJES EN /LISTA Y /CATÁLOGO CUANDO NO HAY MÁS PRODUCTOS.

## /FORMULARIO:
- VALIDACIONES REACTIVAS UTILIZANDO REACTIVE FORMS, EN TODOS LOS CAMPOS (INCLUSIVE EN LA URL).
- SI EL CAMPO TIENE ALGÚN ERROR, SE MUESTRA UN MENSAJE PERSONALIZADO SEGÚN EL TIPO DE ERROR.
- SI LA URL DE LA IMAGEN ES CORRECTA, LA IMAGEN SE MUESTRA AUTOMÁTICAMENTE EN EL RECUADRO.
- PARA AÑADIR UN NUEVO PRODUCTO O MODIFICAR UNO EXISTENTE, SE UTILIZA EL MISMO FORMULARIO/COMPONENTE.

## /DETALLES:
- DESDE /DETALLES SE PUEDE MODIFICAR O ELIMINAR EL PRODUCTO ACTUAL.

## RUTAS:
- SE CREARON 4 RUTAS, /CATÁLOGO, /DETALLES, /LISTA, /FORMULARIO. A 3 RUTAS SE LES PASA UN PARÁMETRO.
- TODAS LAS RUTAS TIENEN PROTECCIÓN. SI EL USUARIO LAS MANIPULA, E INTENTA ALTERAR LOS DATOS ( INCLUSO EN LAS RUTAS QUE TIENEN UN PARÁMETRO "CARGADO" ), LA APLICACIÓN ESTÁ PROGRAMADA PARA QUE SAQUE AL USUARIO DE ESA RUTA "ROTA", Y LO LLEVE A /CATÁLOGO.

## GENERAL:
- CUANDO SE AÑADE, MODIFICA O ELIMINA UN PRODUCTO, SE MUESTRA UN MENSAJE ( SWEETALERT2 ).
- ANIMACIÓN SUAVE CUANDO SE NAVEGA ENTRE RUTAS ( ANIMATE CSS ).

## PARA REALIZAR ESTE DESAFÍO, UTILICÉ LAS SIGUIENTES TECNOLOGÍAS/HERRAMIENTAS:
- Angular 11.
- RxJS.
- TypeScript.
- JavaScript ES6.
- Bootstrap.
- SASS.
- CSS 3.
- HTML 5.
- GIT.
