import 'react'
import Create from '../components/Create'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BsCircleFill,BsFillTrashFill ,BsFillCheckCircleFill} from "react-icons/bs";
// import { BsFillTrashFill } from "react-icons/bs";


function Home() {
    const [todos,setTodos] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/get')
        .then(result => setTodos(result.data))
        .catch(err=>console.log(err))
    },[])

    const handleEdit= (id)=>{
        axios.put('http://localhost:3000/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id)=>{
     axios.delete('http://localhost:3000/delete/'+id)
     .then(result => location.reload())
     .catch(err => console.log(err))
    }
    return (
        <>
        <div className='home'>
            <div>Todo List</div>
            <Create />
            {
                todos.length===0 ? <div><h2>No Record</h2></div>: todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className="checkbox" onClick={()=> handleEdit(todo._id)}>
                            {todo.done ? <BsFillCheckCircleFill  /> :<BsCircleFill className='icon' />}
                            {/* <BsCircleFill className='icon' /> */}
                                <span className={todo.done ? 'line_through':""}>
                                    {todo.task}
                                </span>                            
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
                        </div>
                        {/* <p> */}
                        {/* </p> */}
                    </div>
                )
            )
            }
        </div>
        </>
    )
}

export default Home