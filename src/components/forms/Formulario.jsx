import { useState } from "react";
import Swal from "sweetalert2";

const Formulario = ({addTodo}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    /* Codigo de validacion
    Ponemos el if, y el return para asegurar de que no continue con el codigo
    en caso de que se encuentra con algun error. Y salte la alerta recordar que hay que importar 
    el swal.
    */

    if (!tittle.trim() || !description.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Titulo y descripcion obligatorios"
      });
    }

    addTodo({
      /*Date.now 
      es una funcion que nos devuelve un numero desde 1970 en milesimas
       de segundo asi que este id no se va a repetir
      */
      /*State ternario
      Esta funcion del state es para que este tome el valor de true en caso de que sea completado o falso en el otro caso
      no es necesario poner el signo de ? y los dos puntos, ya que cuando hay un operador ternario que solo pueda retornar
      verdadero o falso esto se obvia y el reotrnara verdadero en caso verdadero o falso en cualquier otro caso. 
      
      */
       id : Date.now(),
      ...todo, state:state === "completado"
    })
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Todo agregado",
      showConfirmButton: false,
      timer: 1500
    });

    console.log(tittle,description,state);
  };

  const [todo, setTodo] = useState({
    tittle: "todo #01",
    description: "todo #01",
    state: "pendiente",
    priority: true,
  });

  const { tittle, description, state, priority } = todo;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingrese Todo"
        className="form-control mb-2"
        name="tittle"
        value={tittle}
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
          type="checkbox"
          name="priority"
          className="form-check-input"
          id="inputCheck"
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

export default Formulario;
