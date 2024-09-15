import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  FingerPrintIcon,
} from "hugeicons-react";
import styles from "./IdeaCard.module.css";
import { timeAgo } from "../../services";
import { Link } from "react-router-dom";

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
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>{timeAgo(createdAt)}</div>
          <div className={styles.votes}>
            <div className={styles.upvote}>
              <ArrowUp01Icon /> {votes}
            </div>
            <div className={styles.downvote}>
              <ArrowDown01Icon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
