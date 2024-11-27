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
  const [orderCriteria, setOrderCriteria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // get users todos from db
  useEffect(() => {
    async function fetchTodos() {
      try {
        const usersToDosInDB = await getTodos(currentUser.id); //returns array
        console.log("usersToDosInDB: ", usersToDosInDB);
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
        //the function gets an object
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
      const newCompletionStatus = !completed;
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
  switch (orderCriteria) {
    case "id":
      sortedTodos.sort((todoA, todoB) => todoA.id - todoB.id); //todoA.id<todoB.id (-), todoA before todoB
      break;
    case "alphabetical":
      sortedTodos.sort((todoA, todoB) =>
        todoA.title.localeCompare(todoB.title)
      );
      break;
    case "completed":
      sortedTodos.sort((a, b) => a.completed - b.completed); //false (0) before true (1). incomplete before completed
      break;
    case "random":
      sortedTodos.sort(() => Math.floor(Math.random()));
      break;
    default:
      break;
  }

  // filter todos based on search
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  const filteredTodos = sortedTodos.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(lowercaseSearchTerm) || //title includes?
      `${todo.id}`.includes(searchTerm) || //id to string, does it include?
      (searchTerm === "completed"
        ? todo.completed
        : searchTerm === "not completed"
        ? !todo.completed
        : false) //
    );
  });

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

        {/* Search */}
        <input
          type="text"
          placeholder="Search by ID/title/completion"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inputField"
        />

        {/* Sort */}
        <select
          onChange={(e) => setOrderCriteria(e.target.value)}
          value={orderCriteria}
          className="selectField"
        >
          <option value="id">sort by ID</option>
          <option value="alphabetical">a-z</option>
          <option value="completed">sort by completion</option>
          <option value="random">shuffle</option>
        </select>

        {/* Todos List */}
        <ul className="todosList">{renderTodoItems(filteredTodos)}</ul>
      </div>
    </div>
  );
}

export default Todos;
