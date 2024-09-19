import {
  FingerPrintIcon,
} from "hugeicons-react";
import styles from "./IdeaCard.module.css";
import { timeAgo, truncateHtml } from "../../services";
import { Link } from "react-router-dom";
import Vote from "../Vote/Vote";

interface ideaCardProps {
  ideaId: string;
  title: string;
  description: string;
  votes: number;
  creator: any;
  isOriginal: string;
  createdAt: string;
}
export default function IdeaCard({
  ideaId,
  title,
  description,
  votes,
  creator,
  isOriginal,
  createdAt,
}: ideaCardProps) {
  const truncatedDescription = truncateHtml(description, 100);
  return (
    <Link to={`/ideas/${ideaId}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link to={`/profile/${creator._id}`}>
            <div className={styles.creator}>
              <img src={creator.profileUrl} className={styles.avatar} />
              <small>{creator.fullname}</small>
            </div>
          </Link>
          {isOriginal == "true" && (
            <div className={styles.unique}>
              <small>Original</small>
              <FingerPrintIcon size={18} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>{timeAgo(createdAt)}</div>
        <Vote votes= {votes} ideaId={ideaId}/>
        </div>
      </div>
    </Link>
  );
}
