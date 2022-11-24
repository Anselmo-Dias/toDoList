import styles from "./Main.module.css";

import plusImg from '../assets/plus.svg'
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "./Task";
import { Warning } from "./Warning";


export function Main()  {

    const [tasks, setTasks] = useState([
        'Integaer urna interdum massa liro auasaaaasadsadasdasdasdadadadadaasdsadactorauasdasds vel sed fames integerasdadadsadaddasdsadaddasdasdadsaddasdadasdasdsadasasd.',  
    ])

    const [newTasks, setNewTasks] = useState('');

    const [totalTasks, setTotalTasks] = useState(1);

    const [comparisonQuantity, setComparisonQuantity] = useState(0);

 

    function handleCreateNewTask(event : FormEvent) {
        event.preventDefault()

 
        setTasks([...tasks, newTasks])
        setNewTasks('')
    }

    function handleNewTasksChange(event : ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTasks(event.target.value);
    }

    function deleteTask(onDeleteTaskOne: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task !== onDeleteTaskOne
        })

        setTasks(tasksWithoutDeletedOne)
    }

    function incrementCountInTotaltasks() {
        setTotalTasks((state) => {
            return state + 1
        })
    }

    function DecrementCountInTotalTasks() {
        setTotalTasks((state) => {
            return state - 1
        })
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
    
    const disblaedButton = newTasks.length === 0
        
    

    return (
        <main className={styles.content}>
            <form onSubmit={handleCreateNewTask}>
                <input 
                    type="text" className={styles.inputTasks} 
                    placeholder="Adicione uma nova tarefa" 
                    onChange={handleNewTasksChange}
                    maxLength={70}
                />

                <button type="submit" className={styles.buttonPlus} disabled={disblaedButton} onClick={incrementCountInTotaltasks}>
                    Criar
                    <img src={plusImg} alt="icone de adicionar" />
                </button>
            </form>

            <section className={styles.tasks}>
                <div className={styles.inforTasks}>
                    <p className={styles.textInforOne}>Tarefas criadas <span>{totalTasks}</span></p>
                    <p className={styles.textInforTwo}>Concluidas <span>{comparisonQuantity} de {totalTasks}</span></p>
                </div>

                {totalTasks === 0 ? <Warning /> : <div className={styles.taskList}>
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