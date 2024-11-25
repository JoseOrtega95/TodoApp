import Todo from "./Todo";

const Todos = ({ todos, deleteTodo, updateTodo}) => {
  /*Crear Todo
          Ahora vamos a crear un componente llamado todo, el cual sera el que va a tomar todos los valores que necesitemos
          y lo va a pintar como un todo bien hecho y con estilos, para que sea iterado en este iterador.

          Por medio de prop enviamos a este componente Todo el todo que tenemos aqui de la iteracion, lo recibimos en el 
          componente Todo y lo podemos ir desglozando sus propiedades para irlas usando como queramos
          */
  return (
    <div className="mt-5">
      <h2 className="text-center mb-5">Todos</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo = {updateTodo}
          />
        ))}
        {todos.length === 0 && (
          <li className="list-group-item text-center">Sin datos</li>
        )}
      </ul>
    </div>
  );
};

export default Todos;
