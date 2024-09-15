import { AlertSquareIcon } from 'hugeicons-react'
import styles from './ErrorBox.module.css'
export default function ErrorBox({message} : { message : string}) {
  return <div className={styles.container}>
    <AlertSquareIcon/> {message}
  </div>  
}