import { useRef, useState } from "react";
/*Formularios NO CONTROLADOS
Este tipo de formularios son controlados por el mismo DOM por lo cual es
necesario usar una referencia (EN JS "ID" EN REACT UN HOOK REF) para que se obtengan los valores del formulario
desde el DOM.
*/
/*Que son los hooks en REACT
Los hooks son una forma de gestionar el estado en los componentes funcionales link donde se explica cada uno de los
hooks integrados en js (https://www.youtube.com/watch?v=jaLl4ErmU44).
*/

const FormNoControlado = () => {
  /*Hook useRef
  Use Ref es solo una referencia que se hace a un elemento de nuestro componente hace referencia a el
  en este caso por ejemplo vamos a hacer un USEREF para hacer referencia a nuestro form y asi podemos 
  tomar los valores de este y manipularlos.
  Es lo mismo que haciamos antes por ejemplo al poner un ID a nuestro form y podiamos seleccionarlo con
  document.queryselector id etc.

  En nuestro ejemplo ponemos nuestro useRef con valor inicial null, puesto que cuando se inicia la app
  nuestro form aun no esta renderizado

  En pocas palabras cada vez que queramos manipular de manera manual un elemento o valor de nuestro DOM
  tenemos que pasarle una referencia con useRef
  */
  const form = useRef(null);
  /*Hook useState
  Este sirve para darle dinamismo a la pagina dependiendo de los estados en que se encuentren los elementos
  a los que referencian.
  Es decir react reacciona antes los cambios y renderiza cuando cambia la variable de estado reaccion 
  renderizando nuevamente la pagina.
  El useref tiene dos elementos el estado actual y el valor que se envia o el nuevo estado que se le envia
  se declara de una manera desestructurada y dandole un valor inicial a nuestra variable de estado actual
  */
  const [error, setError] = useState("");
  /*Evento onSubmit y funcion handleSubmit
  El evento onSubmit puesto en el formulario es precisamente un evento que recibe una funcion, en esta
  funcion van todas las cosas que se deben hacer cuando se envie la informacion del formulario al precionar
  el boton por eso este formulario es no controlado
  */
  const handleSubmit = (e) => {
    //Limpiamos el formulario
    setError("");
    /*PreventDefault
    Este metodo el cual lo pasamos a traves del argumento "e" sirve para que a la hora de enviar el formulario
    no se nos muestre en la barra superior del navegador en el buscador, no se nos muestra el nombre del atributo
    por ejemplo tittle = "valor que enviemos".
    */
    e.preventDefault();
    /*Form Data
    
    Ahora para entender este form data, tenemos que saber que si recordamos lo de la referencia llamara {form}
    esta si la mostramos con console.log nos va a mostrar todo un poco de cosas,pero sin imprimimos el
    form.current nos muestra exactamente los valores de nuestro formulario.
    
    Asi que para usar nuestro form data osea el manupular los datos por un recorrido a todo nuestro formulario
    creamos esa variable con ese valor.
    
    const data = new FormData(form.current);
    console.log(data);
    
    Si nosotros hacemos un clg de esa variable nos va a dar una lista de elementos y entre esa lista hay una
    parte llamada entries, ahi estan las entradas de todos nuestros elementos de nuestro formulario que esta referenciado
    ahora como accedemos a esos valores, pues con el siguiente codigo.
    
    console.log(...data.entries())

    SPREAD OPERATION QUE ES ? (...data.entries)
    
    El Spread operation o operador de propagacion, o esos 3 puntos ... es un operador que sirve para descomponer arrays
    copiarlos concatenarlos o demas. 

    
    Con este codigo si lo vemos en consola nos va a motrar unos arrays de cada entrada, donde en el primer lugar del array
    tendremos el nombre de nuestra entrada y en el segundo lugar tendremos el valor de la entrada.
    
    */
    const data = new FormData(form.current);
    /*Form Entries
    Lo que hace esto es que toma una lista de pares con clave valor y lo vuelve un objeto, con esta
    logica podemos desestructurar estos datos ya que son un objeto y se puede hacer esto. 
    */
    const { title, description, state } = Object.fromEntries([
      ...data.entries(),
    ]);
    //Validar los datos
    if (!title.trim() || !description.trim() || !state.trim()) {
      return setError("LLena todos los campos");
    }
    console.log(title, description, state);
  };
  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
    >
      <input
        /*Manipulacion de estos inputs
      Para manipular los inputs lo podemos hacer de dos maneras una manera es poniendo un ID a cada input
      y llamando este ID para procesar esa entrada, pero tambien se puede hacer con form data, que hace un
      recorrido por todos las entradas y captura los valores de cada uno de ellos y de igual manera los podemos
      manipular.
      Muy importante, para poder usar este formdata es indispensable poner en cada input el atributo name
      */
        type="text"
        placeholder="Ingrese Todo"
        className="form-control mb-2"
        name="title"
        defaultValue="todo #01"
      />
      <textarea
        className="form-control mb-2"
        placeholder="Ingrese descripcion"
        name="description"
        defaultValue="descripcion #01"
      />
      <select
        className="form-select mb-2"
        name="state"
        defaultValue="completado"
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>
      <button
        type="submit"
        className="btn btn-primary"
      >
        Procesar
      </button>
      {error != "" && "LLena todos los campos"}
      
    </form>
  );
};

export default FormNoControlado;

/*Operador && en deciciones Este nos sirve como condicional if, se podria
  hacer como el operador ternario pero cuando no necesitamos la respuesta
  negativa, se puede hacer solamente asi. Esto dice que si error no existe,
  entonces imprima eso en el renderizado. 
 */