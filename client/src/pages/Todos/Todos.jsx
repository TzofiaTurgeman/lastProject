import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import { getTodos } from "../../functions/getRequest";
import { deleteTodos } from "../../functions/deleteRequest";
import { patchTodo } from "../../functions/patchRequest";
import { addTodos } from "../../functions/postRequest";
// import "../../Todos.css";

function Todos() {
  const { currentUser } = useContext(CurrentUserContext);
  const [todos, setTodos] = useState([]); //todos will be in array
  const [newTodoName, setNewTodoName] = useState("");

  // get users todos from db
  useEffect(() => {
    async function fetchTodos() {
      try {
        const usersToDosInDB = await getTodos(currentUser.id); //returns array
        setTodos(usersToDosInDB);
      } catch (error) {
        console.error("failed to fetch todos:", error);
      }
    }
    fetchTodos();
  }, [currentUser.id]); //changes when the user changes

  // add
  const functionToAddTodo = async () => {
    if (!newTodoName) {
      return; //stops from adding empty
    }
    try {
      const newTodo = await addTodos({
        userId: currentUser.id,
        title: newTodoName,
      });
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodoName(""); //clears input box
    } catch (error) {
      console.error("failed to add:", error);
    }
  };

  // delete
  const functionToDeleteTodo = async (id) => {
    try {
      await deleteTodos(id);
      const updatedTodos = todos.filter((todo) => {
        return todo.id !== id;
      }); //new arr without deleted
      setTodos(updatedTodos);
    } catch (error) {
      console.error("failed to delete:", error);
    }
  };

  // update
  const functionToUpdateTodo = async (id, newTitle) => {
    try {
      await patchTodo(id, { title: newTitle });

      // new array with updated todo items
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          // if this is the todo to update, returns object w/ new title
          return { ...todo, title: newTitle };
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("failed to update:", error);
    }
  };

  // change completion
  const functionToChangeCompletionStatus = async (id, completed) => {
    try {
      let newCompletionStatus =0;
      if(completed==0) newCompletionStatus=1;
      else newCompletionStatus=0;
      await patchTodo(id, { completed: newCompletionStatus });
      // new array of todos with the updated
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: newCompletionStatus };
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("failed to change:", error);
    }
  };

  // sort by criteria
  const sortedTodos = [...todos];
 
      sortedTodos.sort((todoA, todoB) => todoA.id - todoB.id); //todoA.id<todoB.id (-), todoA before todoB
 

  //rendering
  function renderTodoItems(todos) {
    const toDosToShowOnScreen = [];
    todos.forEach((todo) => {
      toDosToShowOnScreen.push(
        <li>
          <span>{todo.id}</span>
          <input
            type="text"
            value={todo.title}
            onChange={(e) => functionToUpdateTodo(todo.id, e.target.value)}
          />
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              functionToChangeCompletionStatus(todo.id, todo.completed)
            }
          />
          <button onClick={() => functionToDeleteTodo(todo.id)}>Delete</button>
        </li>
      );
    });
    return toDosToShowOnScreen;
  }

  return (
    <div className="todosContainer">
      <div className="todosBox">
        {/* Add */}
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          placeholder="New todo"
          className="inputField"
        />
        <button onClick={functionToAddTodo}>Add Todo</button>

        {/* Todos List */}
        <ul className="todosList">{renderTodoItems(todos)}</ul>
      </div>
    </div>
  );
}

export default Todos;
