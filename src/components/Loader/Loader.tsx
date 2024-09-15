import styles from './Loader.module.css'
export default function Loader() {
  return <p className={styles.container}>
      <div className={styles.loader}/>
    </p>
}