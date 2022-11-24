import styles from "./Warning.module.css";

import listImg from '../assets/list.svg'
import { Clipboard, ClipboardText } from "phosphor-react";

export function Warning() {
    return (
        <div className={styles.notHaveTasks}>
            <ClipboardText color="gray" size={72} />
            <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        </div>
    )
}