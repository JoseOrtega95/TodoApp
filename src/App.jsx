import { useState , useEffect } from "react";
import Formulario from "./components/forms/Formulario";
import Todos from "./components/todos/Todos";

const App = () => {

  const inicialStateTodo = JSON.parse(localStorage.getItem('todos'))|| [];
  /*Viaje de los props
  
    Vamos a inicializar unos estados en este componente ya que es aqui donde queremos que este div container 
    contenga toda la logica de nuestra app, enviar, eliminar, actualizar los todos. 

    Para poder iterar los TODOS que tenemos en nuestro array de todos, tenemos que hacer un nuevo componente
    encargado de iterar esos TODOS, y los todos tenemos que pasarlos como propos de este componente llamado TODOS para que 
    este los reciba y los itere. 

    Es decir es necesario en este caso tener en el componente padre en este caso este componente el principal es necesario
    tener los dos componente hijos que van a interactuar en este caso el formulario, donde se toma el valor y se lo almacena
    y tambien es necesario tener aqui mismo el otro componente quien trabaja con ese valor, en este caso enviandole estos valores
    por medio de los props. 

});

  */
  const [todos, setTodos] = useState(inicialStateTodo);

   /*UseEfect
  Es un hook que como podemos ver es una IIFE es decir una funcion que se ejecuta
  por si misma, esta se ejecuta cada que se haga un cambio en la pagina, cualquier cosa
  desde el mas minimo ella realiza la accion cada que exista un cambio en la pagina,
  por lo tanto le ponemos esos corchetes al final de la funcion [] para indicarle que solo
  se ejecute una vez solo la primera vez que se ejecute el programa
  pero para hacerlo mas interesante en ese corchete le podemos decir por ejemplo los siguiente
  en el codigo que tenemos lo que nos quiere decir es que, se va a ejecutar esa funcion
  cada que se actualizen los todos
  Ese local storage es el almacenamiento de nuestro propio navegador, solo nuestro google
  no mozila ni nada solo este, se guardan las cosas
  */

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos]);

  /*Funcion agregar todos 
  Creamos una funcion llamada ADDTODO, la cual nos agrega un nuevo TODO a nuestra lista existente de todos, esto lo hace
  primero creando una copia de todos nuestros todos, por medio del operador spread. Despues por medio del setTodo, actualiza
  esta lista y es nuevamente nuestro iterador TODOS quien renderiza estos Todos.

  Como es el viaje de esto?. Aqui en este componente padre creamos esta funcion, ya que por aqui es mas facil actualizar
  el estado de nuestro iterador, al actualizar por aqui mismo la lista de todos. Entonces esta funcion la enviamos por medio de
  props a nuestro formulario. 

  Despues en nuestro formulario aplicamos esta funcion de ADDTODO la cual enviamos por props, la aplicamos y creamos el todo
  el cual ella recibe como parametro, por eso en formulario hacemos esto addTodo({}) y dentro escribimos el nuevo objeto que se 
  va agrear en el formulario la estamos es usando esta funcion.

  Ahora cuando damos clic, esta funcion crea el nuevo Todo y se activa, y aqui en el componente padre se actualiza y se renderiza
  en el iterador. 
  */

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  /*Borrar todo 
  Para realizar este metodo, en cuestion de comunicacion hacemos lo mismo que con
  el agregar todo.

  La logica en este metodo es que con un filter traemos de vuelta toda la informacion
  que no coincida con el ID que enviamos como argumento. Por lo tanto ese nuevo array con el
  todo faltante lo actualizamos con setTodo.

  Lo que hacemos aqui es que, ese metodo de borrar todo, lo pasamos como props
  primero a todos. 
  Por que primero a todo por que este componente es quien mapea y renderiza los todos
  luego se lo pasamos al TODO por que ahi es donde se va a desarrollar la accion cuando
  se le clic en el boton de elminar todo. 
  */
  const deleteTodo = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  /*Udate Todo
  Creamos la logica para actualizar el todo por lo cual creamos la funcion en este mismo componente
  */

  const updateTodo = (id) => {
    const newArray = todos.map((todo) => {
      if (todo.id === id) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(newArray);
  };
  /*Ordenar todo
  Para ordenar los todos vamos a tomar como referencia el valor de prioritario y usamos la funcion sort
  donde decimo que si a es igual a b no pasa nada. Y asi en adelante. 
    const orderTodo = (arrayTodo) => {
    return arrayTodo.sort((a,b) => {
      if(a.priority === b.priority) return 0
      if(a.priority === true) return -1   La envia de primera
      if(a.priority === false) return 1   La deja de ultima
    })
  }
  
  Esto en vez de true o falso se puede escribir de la manera como quedo la funcion en el codigo,
  la ejecucion de este se hace directamente en el prop es decir este no viaja a ninguna parte se lo
  pone en el prop de todos

  */

  const orderTodo = (arrayTodo) => {
    return arrayTodo.sort((a, b) => {
      if (a.priority === b.priority) return 0;
      if (a.priority) return -1;
      if (!a.priority) return 1;
    });
  };

  return (
    <div className="container mb-2">
      <h1 className="my-5">FORMULARIO</h1>

      <Formulario
        addTodo={addTodo}
        orderTodo={orderTodo}
      />
      <Todos
        todos={orderTodo(todos)}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};
export default App;
