import { useState } from "react";
/*Formularios CONTROLADOS
Este tipo de formularios se controlan solos sin necesidad de darle click a un
boton, se van validando por asi decirlo inmediatamente como se van entrando los
valores a los inputs. 
*/
/*Que son los hooks en REACT
Los hooks son una forma de gestionar el estado en los componentes funcionales link donde se explica cada uno de los
hooks integrados en js (https://www.youtube.com/watch?v=jaLl4ErmU44).
*/

const FormControlado = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /*Evento onChange
  Este evento lo que hace es que asocia nuestro estado actual de nuestra entrada
  lo asocia con el setter de esos estados directamente desde la entrada
  
  Para evitar hacer un use State aparte para cada entrada como lo tenemos el codigo
  mostrado a continuacion.

  const [tittle, setTittle] = useState("Todo #01");
  const [description, setDescription] = useState("Descripcion #01");
  const [state, setState] = useState("pendiente");

  Vamos hacer un codigo mas compacto como se ve en el codigo que quedara definitivamente
  en nuestro form
  */

  /*UseState como objeto
  Como podemos ver aqui, usamos el useState como objeto para poder acceder a las variables
  de manera mas facil y poder hacer la desestructuracion del objeto y hacer una sintaxis mas
  legible y entendible. 
  */
  const [todo, setTodo] = useState({
    tittle: "todo #01",
    description: "todo #01",
    state: "pendiente",
    priority: true
    
  });

  const { tittle, description, state, priority} = todo;

  /*Reutilizacion del codigo onchange
  Antes de este metodo teniamos un onchange con las siguiente propiedades PARA CADA UNA  de las entradas
  como vemos a continuacion
  onChange={(e) => setTodo({ ...todo, tittle: e.target.value })}
  onChange={(e) => setTodo({ ...todo, description: e.target.value })}
  onChange={(e) => setTodo({ ...todo, state: e.target.value })}
  Asi que en el siguiente codigo que va a quedar en el formulario vamos a remplazar esto para poder tener un
  codigo mas limpio.
  Lo primero que hacemos es crear una funcion llamada handleChange, a la cual le pasamos dos argumentos
  importanten que son el nombre de la entrada a manipular y el valor de esta. 
  Dentro de esta funcion podemos enviar nuestro SetTodo, para actualizar el valor de nuestro estado actual
  realizando una copia un enviando el valor de nuestro nombre de nuestra entrada y su valor. 

  Antes de añadir el checkbox el codigo que funcionaba perfectamente para nuestros valores era el siguiente
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  pero como ahora el valor del checked ya no es e.target.value, si no que es e.target.checked, tenemos que 
  hacer un operador ternario para poder enviar el valor correcto dependiendo del tipo de nuestro input, el cual
  se lo obtiene con e.target.type.
  */
  const handleChange = (e) => {
    const {name,type,checked,value} = e.target
    setTodo({
      ...todo,
      [name]:type ==='checkbox' ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        /*Manipulacion de las entradas
        Para trabajar con formularios controlados lo que se hace es hacer estados para cada una de nuestras entradas
        Asociamos cada uno de los estados creados usando la propiedad value de cada entrada
        para enviarle el estado actual en que se encuentran.
        Entonces para esto pondemos en cada entrada esta funcion Onchange, la cual se le envia un argumento a esa funcion
        flecha que es el llamado ('evento' o la letra "e"), la cual toma la target es decir el valor de esa entrada y la envia
        como actualizacion como set al estado de nuestra variable.
        
       */
        type="text"
        placeholder="Ingrese Todo"
        className="form-control mb-2"
        name="tittle"
        value={tittle}
        /*Uso De SETODO
        Aqui al set todo solo le estamos enviando un String que es el valor que toma
        de esta entrada el (e.target.value).
        Asi que lo que hacemos es en primer lugar queremos hacerle saber a nuestro useRef que
        este SetTodo corresponde por ejemplo en el primer caso a nuestro Tittle.
        Asi que lo que hacemos es que abrir las llaves por que vamos hacer un objeto y pasarle
        por medio del spread operator una copia de lo que tenemos en este objeto, y a esa copia
        solo le modificamos como se indica ahi, el estado del tittle, enviandole el valor
        del e.target.value-
        */
        onChange={handleChange}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Ingrese descripcion"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <div className="form-check">
        <input
        /*Trabajar con checkBox
        Para trabajar con check box no se puede hacerlo como lo veniamos haciendo ya que estos no tienen
        la propiedad de value, si no que estos trabajan con  checked que toman un valor falso o verdadero, por lo tanto el termino para 
        tratar estos datos es como veremos en el codigo. 
        Ahora para el onchaing tenemos que
       */
          type="checkbox"
          name="priority"
          className="form-check-input"
          id = "inputCheck"
          checked={priority}
          onChange={handleChange}
        />
        <label htmlFor="inputCheck">Dar prioridad</label>
      </div>
      <select
        className="form-select mb-2"
        name="state"
        value={state}
        onChange={handleChange}
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
    </form>
  );
};

export default FormControlado;
