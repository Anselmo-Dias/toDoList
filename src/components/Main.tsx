import styles from "./Main.module.css";

import plusImg from '../assets/plus.svg'
import { FormEvent, useState } from "react";
import { Task } from "./Task";
import { Warning } from "./Warning";

export interface typeTasksProps {
    id: number
    content: string
}

export function Main()  {

    const [tasks, setTasks] = useState<typeTasksProps[]>([
        {id: Math.random() * 21, content: 'Adicione suas tarefas'},
    ])

    const [newTasks, setNewTasks] = useState('');

    const [comparisonQuantity, setComparisonQuantity] = useState(0);

 

    function handleCreateNewTask(event : FormEvent) {
        event.preventDefault()

        const getNewTask = {id: Math.random() * 21, content: newTasks}
        
        setTasks(state => [...state, getNewTask])
        setNewTasks('')
    }

    function deleteTask(taskOfDelete: typeTasksProps | undefined) {
        const tasksWithoutDeletedOne = tasks.filter(item => {
                return item.id !== taskOfDelete?.id
            })

        setTasks(tasksWithoutDeletedOne)
    }

    function comparisonQuantityTasks( status : boolean) {

        if (status == true ) {
            setComparisonQuantity((states) => states += 1)
        } else if (status == false && comparisonQuantity == 0) {
            setComparisonQuantity((states) => states += 0)

        } else if (status == false && comparisonQuantity > 0) {
            setComparisonQuantity((states) => states -= 1)
        }  
        
    }
    
    const disabledButton = newTasks.length === 0
        
    

    return (
        <main className={styles.content}>
            <form onSubmit={handleCreateNewTask}>
                <input 
                    type="text" className={styles.inputTasks} 
                    placeholder="Adicione uma nova tarefa" 
                    value={newTasks}
                    onChange={e => setNewTasks(e.target.value)}
                    maxLength={70}
                />

                <button type="submit" className={styles.buttonPlus} disabled={disabledButton}>
                    Criar
                    <img src={plusImg} alt="icone de adicionar" />
                </button>
            </form>

            <section className={styles.tasks}>
                <div className={styles.inforTasks}>
                    <p className={styles.textInforOne}>Tarefas criadas <span>{tasks.length}</span></p>
                    <p className={styles.textInforTwo}>Concluidas <span>{comparisonQuantity} de {tasks.length}</span></p>
                </div>

                {tasks.length === 0 ? <Warning /> : <div className={styles.taskList}>
                    {tasks.map(item => {
                        return (
                           <Task 
                                key={item.id}
                                content={item.content}
                                tasks={tasks}
                                onDeleteTask={deleteTask} 
                                comparisonQuantityTasks={comparisonQuantityTasks}
                           />
                        )
                    })}
                </div>  }

                {/* <div className={styles.taskList}>
                    {tasks.map(item => {
                        return (
                           <Task 
                                key={item}
                                content={item}
                                onDeleteTask={deleteTask} 
                                onDecrement={DecrementCountInTotalTasks}
                                comparisonQuantityTasks={comparisonQuantityTasks}
                           />
                        )
                    })}
                </div> */}
            </section>
        </main>
    )
}