import styles from "./Task.module.css";

import notCheckImg from "../assets/notCheck.svg";
import CheckImg from "../assets/check.svg";
import { Trash } from "phosphor-react";
import { HTMLAttributes, useState } from "react";
import { typeTasksProps } from "./Main";




interface TaskProps extends HTMLAttributes<HTMLImageElement> {
    key: number
    content: string
    onDeleteTask: (taskOfDelete : typeTasksProps | undefined) => void
    comparisonQuantityTasks: (status : boolean) => void
    tasks: typeTasksProps[]
}

export function Task({tasks,content, onDeleteTask , comparisonQuantityTasks } : TaskProps) {

    const [countCheckTasks, setcountCheckTasks] = useState(0)
    const [ NewStylesParagraph, setNewStylesParagraph] = useState(0) 

    const toExchangeStyle = countCheckTasks === 0
    const differentStyles = toExchangeStyle ? notCheckImg : CheckImg
    const differentStylesParagraph = NewStylesParagraph === 1
    
    function handleDeleteTask() {
        const tasksWithoutDeletedOne = tasks.find(item => {
            return item.content === content
        })
        console.log(tasksWithoutDeletedOne)


        {onDeleteTask(tasksWithoutDeletedOne)}
        {differentStyles === CheckImg ? comparisonQuantityTasks(false) : null}
    }

    function handleNewStyleThisCheckImgTask() {
        setcountCheckTasks((states) => {
            
            if (states <= 0) {
                states += 1
            } else {
                states -= 1
            }
            
            return states
        })

        setNewStylesParagraph((states) => {
            
            if (states <= 0) {
                states += 1
            } else {
                states -= 1
            }
            
            return states
        })
        {comparisonQuantityTasks(toExchangeStyle)}
    }

    return (
        <div className={styles.task}>
            <img src={differentStyles} alt="icone para fazer checking na tarefa" onClick={handleNewStyleThisCheckImgTask} />
            <p className={differentStylesParagraph ? styles.paragraphDashed : styles.paragraphNotDashed}>{content}</p>
            <i>
                <Trash  className={styles.trash} size={32}  onClick={handleDeleteTask}/>
            </i>
        </div>
    )
}