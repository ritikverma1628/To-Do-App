import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';


export default function TodoApp(){

    let [todoTasks, settodoTasks] = useState([])
    let [task, setTask] = useState('')

    function handletodoTasks(event){
        event.preventDefault();
        settodoTasks((todoTasks)=>[...todoTasks, {taskName:task, id:uuidv4()}]);
        setTask('')
        
    }

    function handleTask(event){
        setTask(event.target.value)
    }

    function deleteTask(id){
        settodoTasks((todoTasks)=>todoTasks.filter((todoTask)=>{
            if(todoTask.id!=id){
                return todoTask;
            }
        }))
    }

    function handleDone(id){
        settodoTasks((todoTasks)=>todoTasks.map((todoTask)=>{
            if(todoTask.id==id){
                todoTask.taskName = <del>{todoTask.taskName}</del>
                return todoTask;
            }
            else{
                return todoTask;
            }
        }))
    }

    function handleAllDone(){
        settodoTasks((todoTasks)=>todoTasks.map((todoTask)=>{
                todoTask.taskName = <del>{todoTask.taskName}</del>
                return todoTask;
            
        }))
    }

    return(
        <>
            <form action="">
                <input type="text" placeholder='Add task' value={task} onChange={handleTask} style={{height:'36px', borderRadius:'8px'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={handletodoTasks}>ADD</button>
            </form>
            <br /><br />
            <hr />
            <p>----------ToDo List----------</p>
            <div>
            
                {todoTasks.map((todoTask)=>
                    <div key={todoTask.id}>
                        <span key={todoTask.id}>{todoTask.taskName}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={()=>deleteTask(todoTask.id)} >Delete</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={()=>handleDone(todoTask.id)}>Mark As Done</button>

                    </div>)
                }

            </div>
            <br /><hr />
            <button onClick={handleAllDone}>Mark As All Done</button>
        </>
    )
}