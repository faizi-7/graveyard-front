import {  Tick03Icon } from 'hugeicons-react'
import styles from './SuccessBox.module.css'
export default function SuccessBox({message} : { message : string}) {
  return <div className={styles.container}>
    <Tick03Icon/> {message}
  </div>  
}