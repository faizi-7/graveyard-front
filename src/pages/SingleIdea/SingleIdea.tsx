import { useQuery } from "@tanstack/react-query";
import styles from "./SingleIdea.module.css";
import { getSingleIdea } from "../../api/ideasApi";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { FingerPrintIcon } from "hugeicons-react";

export default function SingleIdea() {
  const { ideaId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["ideas", ideaId],
    queryFn: () => getSingleIdea(ideaId || ""),
  });
  console.log(data);
  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.ideaContainer}>
        <div className={styles.top}>
          <Link to={`/profile/${data.creator._id}`}>
            <div className={styles.creator}>
              <img src={data.creator.profileUrl} className={styles.avatar} />
              <small>{data.creator.fullname}</small>
            </div>
          </Link>
          {data.isOriginal == "true" && (
            <div className={styles.unique}>
              <small>Original</small>
              <FingerPrintIcon size={18} />
            </div>
          )}
        </div>
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <h2>Discussion</h2>
        <input placeholder='What are your thoughts'/>
      </div>
    </div>
  );
}
