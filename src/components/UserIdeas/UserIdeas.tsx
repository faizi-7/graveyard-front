import { useQuery } from "@tanstack/react-query";
import { getIdeasByUser } from "../../api/ideasApi";
import styles from "./UserIdeas.module.css";
import ErrorBox from "../ErrorBox/ErrorBox";
import { Link } from "react-router-dom";
import nothinghere from '../../assets/images/nothinghere.png'
import { Settings01Icon } from "hugeicons-react";

export default function UserIdeas({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ideas", userId],
    queryFn: () => getIdeasByUser(userId),
  });

  if (isLoading) return <></>;
  if (error) return <ErrorBox message={error.message} />;
  return (
    <div className={styles.container}>
      {data?.length > 0 ? data?.map((idea: any) => {
        return (
          <div className={styles.item}>

            <Link to={`/ideas/${idea._id}`} className={styles.item1}>
              <div>
                <p>{idea.title}</p>
                <small>Votes : <strong>{idea.votes}</strong></small>
              </div>
            </Link>
            <div className={styles.item2}><Settings01Icon/></div>
          </div>
        );
      }) : <img src={nothinghere} className={styles.nothinghere}/>}
    </div>
  );
}
