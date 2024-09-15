import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../api/authApi'
import Loader from '../../components/Loader/Loader'
import { AnonymousIcon } from 'hugeicons-react'
import UserIdeas from '../../components/UserIdeas/UserIdeas'

export default function Profile() {
  const {userId}= useParams()
  if(!userId) return <div>Page not found!</div>
  const { data, isLoading, error }= useQuery({
    queryKey : ['auth', userId],
    queryFn : () => getUser(userId)
  })
  console.log(data)
  if(isLoading) return <Loader/>
  return <div className={styles.container}>
    <div className={styles.profileItem}>
      <img src= {data.profileUrl}/>
      <div>
        <h1>{data.fullname ? data.fullname : <AnonymousIcon/>}</h1>
        <p>@{data.username}</p>
        {data.about ? <p>{data.about}</p> : <></>}
      </div>
    </div>
    <div className={styles.ideasItem}>
      <h3>Ideas Posted by User</h3>
      <UserIdeas userId={userId}/>

    </div>
    <div className={styles.favoriteItem}>
      <h3>Favorite Ideas of User</h3>
    </div>
  </div>
}