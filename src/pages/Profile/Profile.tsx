import { Link, useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/authApi";
import Loader from "../../components/Loader/Loader";
import { AnonymousIcon } from "hugeicons-react";
import UserIdeas from "../../components/UserIdeas/UserIdeas";
import nothinghere from '../../assets/images/nothinghere.png'
import ErrorBox from "../../components/ErrorBox/ErrorBox";

export default function Profile() {
  const { userId } = useParams();
  if (!userId) return <div>Page not found!</div>;
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth", userId],
    queryFn: () => getUser(userId),
  });
  console.log(data);
  if (isLoading) return <Loader />;
  if(error) return <ErrorBox message={error.message || "Error Occured"}/>
  return (
    <div className={styles.container}>
      <div className={styles.profileItem}>
        <img src={data.profileUrl} />
        <div>
          <h1>
            {data.fullname ? (
              data.fullname
            ) : (
              <div className={styles.stranger}>
                <AnonymousIcon size={36} /> Pixel{userId.slice(-4)}
              </div>
            )}
          </h1>
          <p>@{data.username}</p>
          {data.about ? <p>{data.about}</p> : <></>}
        </div>
      </div>
      <div className={styles.ideasItem}>
        <h3>Ideas Posted by User</h3>
        <UserIdeas userId={userId} />
      </div>
      <div className={styles.favoriteItem}>
        <h3>Favorite Ideas of User</h3>
        <div className={styles.favItemContainer}>
          {data.favorites?.length > 0 ? data.favorites?.map((idea: any) => {
            return (
              <Link to={`/ideas/${idea._id}`}>
                <div className={styles.favItemItem}>
                  <p>{idea.title}</p>
                  <small>Votes : {idea.votes}</small>
                </div>
              </Link>
            );
          }) : <img src={nothinghere} className={styles.nothinghere}/>}
        </div>
      </div>
    </div>
  );
}
