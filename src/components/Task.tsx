import styles from "./Task.module.css";

import notCheckImg from "../assets/notCheck.svg";
import CheckImg from "../assets/check.svg";
import { Trash } from "phosphor-react";
import { HTMLAttributes, useState } from "react";

interface TaskProps extends HTMLAttributes<HTMLImageElement> {
    content: string;
    onDeleteTask: (onDeleteTaskOne : string) => void;
    onDecrement: () => void;
    comparisonQuantityTasks: (status : boolean) => void;
}

export function Task({content, onDeleteTask,onDecrement , comparisonQuantityTasks, ...props } : TaskProps) {

    const [countCheckTasks, setcountCheckTasks] = useState(0)
    const [ NewStylesParagraph, setNewStylesParagraph] = useState(0)

    const toExchangeStyle = countCheckTasks == 0
    const differentStyles = toExchangeStyle ? notCheckImg : CheckImg
    const differentStylesParagraph = NewStylesParagraph == 1
    
    function handleDeleteTask() {
        {onDeleteTask(content)}
        {onDecrement()}
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