import { useState ,useEffect} from 'react'
import Navbar from './assets/components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App(){

   
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString= localStorage.getItem("todos")
    if(todoString ){
    let todos = JSON.parse(todoString)
    setTodos(todos)
    }
  }, [])
  const saveTols = (params) => {
localStorage.setItem("todos", JSON.stringify(todos))
  }
const handleAdd = () => {
  setTodos([...todos,{id: uuidv4(), todo, iscompleted: false}])
  setTodo("")
  saveTols()
}
const handleChange = (e) => {
  setTodo(e.target.value)
}

const handleEdit = (e,id) => {
  let t=todos.filter(i=>i.id === id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item => {
  return item.id !== id
  saveTols()
})

setTodos(newTodos)
  
}
const handleDelete = (e,id) => {
let newTodos = todos.filter(item => {
  return item.id !== id
})

setTodos(newTodos)
saveTols()

} 
const toggleFinished = (e) => {
  setShowFinished(!showFinished)
}
const handleCheckbox = (e) => {
let id = e.target.name
let index = todos.findIndex(item => {
  return item.id === id
})
let newTodos = [...todos];
newTodos[index].iscompleted = !newTodos[index].iscompleted
setTodos(newTodos)
saveTols()
} 
  return (
    <>
     <Navbar />
     <div className="mx:3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 ">
     <h1 className="text-xl text-center font-bold">iTask - Manage Your todos at one place</h1>
      <div className="addtodo my-5 flex flex-col gap-5">
        <h2 className="text-2xl font-bold">
Add a todo
        </h2>
        <div className="flex">
       <input onChange={handleChange} value={todo} type="text" className="w-full bg-white rounded-lg px-5 py-1"/>
       <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 disabled:cursor-not-allowed text-white rounded-full font-bold p-4 py-2 mx-2">
    Save
       </button>
       </div>
      </div>
      <input className="mr-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
      <label className="mx-2 html" htmlFor='show'>Show Finished</label>
      <div className="h-px bg-black opacity-15 w-90% mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <p className="text-gray-500">No todos yet</p>}
          {todos.map(item => {
            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex md:w-full justify-between my-3 ">
                <div className="flex gap-5">
                  <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.iscompleted}  id="" />
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
<div className="buttons flex h-full">
  <button onClick={(e) => handleEdit(e,item.id)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold p-2 py-1 mx-1"><FaEdit /></button>
    <button onClick={(e) => handleDelete(e, item.id)} className="bg-red-500 hover:bg-red-600 text-white rounded-md font-bold p-2 py-1 mx-1"><MdDeleteOutline /></button>
          </div>
        </div>
        })}
        </div>

     </div>
    </>
  )
}

export default App
