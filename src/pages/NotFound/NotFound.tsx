import styles from './NotFound.module.css'
import notfound from '../../assets/images/notfound.png'

export default function NotFound() {
  return <div className={styles.container}>
    <h1>404 Page not found!</h1>
    <img src={notfound}/>
  </div>
}