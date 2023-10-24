
Importante a considerar donde poner a cargar el estado global, en este caso user$.

El lugar debe cargarse una vez, y como en este caso en particular se está utilizando para obtener el perfil del usuario logueado, el lugar donde se coloque esta función será más optimo si se carga solo cuando ya se han hecho las validaciones para el ingreso mediante el loguin.


Es decir, por ejemplo el caso de colocar el estado global en el app.component cumple el hecho de que se carga solo una vez al principio de la aplicación, no obstante, se carga esté logueado o no el usuario.

Dado lo anterior, en este caso es más recomendable hacerlo en el layout, ya que dada la arquitectura de esta aplicación, el layout solo se carga cuando el usuario ha sido logueado.



Respecto al observable, todo observable necesita un estado inicial.
En este caso el tipado del Observable quedó como User o null. Esto porque como corresponde al usuario que está logueado, el tema es que es posible tener un usuario no logueado, de ahí que su valor pueda ser null.
Para resolver el requerimiento del estado inicial del observable, lo haremos desde el navbar en html, haciendo una subscripción a ese observable desde el template.

Para lo anterior, ingresaremos todo el template en una etiqueta ng-container, en el cual haremos una validación con la directiva ngIf y crearemos una variable user que podremos user en el template.

En el caso de esta aplicación tuvimos que colocar otro subscribe para la tabla de usuarios, idependiente de la puesta en el layout a fin de que al saludar en el la tabla se colocara el nombre del usuario que está logueado. No obstante, como es una subscripción no cuenta como un request al servidor.


