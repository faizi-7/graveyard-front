import { useQuery } from '@tanstack/react-query'
import { getIdeasByUser } from '../../api/ideasApi'
import styles from './UserIdeas.module.css'
import ErrorBox from '../ErrorBox/ErrorBox'

export default function UserIdeas({userId} : {userId : string}) {
  const { data, isLoading, error }= useQuery({
    queryKey : ['ideas', userId],
    queryFn : () => getIdeasByUser(userId)
  })
  if(isLoading) return <></>
  if(error) return <ErrorBox message={error.message}/>
  return <div className={styles.container}>
    {data?.map((idea:any) => {
      return <div className={styles.item}>
        <p>{idea.title}</p>
        <small>Votes : {idea.votes}</small>
      </div>
    })}
  </div>
}