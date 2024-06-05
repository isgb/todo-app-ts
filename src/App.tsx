import { useState } from "react";
import { Todos } from "./components/Todos";
import { FilterValue, TodoId, type Todo  as TodoType, TodoTitle } from './types';
import { TODO_FILTERS } from "./consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const mockTodos = [
  {
    id:'1',
    title:'Ver el twitch de midu',
    completed: true,
  },
  {
    id:'2',
    title:'Aprender React con Typescript',
    completed: false,
  },
  {
    id:'3',
    title:'Sacar ticket de la miduFest',
    completed: false,
  }
];

const App: React.FC = () => {

  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

  const handleRemove = ({id}:TodoId):void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

const handleRemoveAllCompleted = ():void => {
  const newTodos = todos.filter(todo => !todo.completed)
  setTodos(newTodos)
}

const handleCompleted = ({id,completed}: Pick<TodoType, 'id' | 'completed'>):void => {
  const newTodos = todos.map(todo =>{
    if(todo.id === id){
      return {
        ...todo,
        completed
      }
    }

    return todo
  })

  setTodos(newTodos)
}

const hanldeFilterChange = (filter: FilterValue):void => {
  setFilterSelected(filter)
}

const activeCount = todos.filter(todo => !todo.completed).length
const completedCount = todos.length - activeCount

const filteredTodos = todos.filter(todo => {
  if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
  if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
  return todo
})

const handleTodoAddTodo = (title: string) :void => {
  const newTodo = {
    title,
    id:crypto.randomUUID(),
    completed:false
  }
console.log(newTodo);

  const newTodos = [...todos, newTodo]
  setTodos(newTodos)
}

  return (
    <>
      <div className="todoapp">
        <Header saveTodo={handleTodoAddTodo}/>
        <Todos 
          onToggleCompleteTodo={handleCompleted}
          onRemoveTodo={handleRemove}
          todos={filteredTodos}
        />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleRemoveAllCompleted}
          handleFilterChange={hanldeFilterChange}
        />
      </div>
    </>
  )
}

export default App
