import { useQuery } from "@tanstack/react-query";
import styles from "./SingleIdea.module.css";
import { getSingleIdea } from "../../api/ideasApi";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {
  Certificate01Icon,
  FingerPrintIcon,
  QrCodeIcon,
  Settings01Icon,
} from "hugeicons-react";
import { timeAgo } from "../../services";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import Discussion from "../../components/Discussion/Discussion";
import Vote from "../../components/Vote/Vote";
import AddToFavorite from "../../components/AddToFavorite/AddToFavorite";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UpdateIdea from "../../components/UpdateIdea/UpdateIdea";
import Modal from "../../components/Modal/Modal";

export default function SingleIdea() {
  const { ideaId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["ideas", ideaId],
    queryFn: () => getSingleIdea(ideaId || ""),
  });
  const { data: user, isLoading: userLoading, error: userError } = useAuth();
  // Modal States
  const [isQrModalOpen, setQrModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const isIdeaCreator = user?.userId === data?.creator._id;

  console.log(data);
  if (isLoading || userLoading) return <Loader />;
  if (error || userError)
    return <ErrorBox message={error?.message || userError?.message || ""} />;
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
          <div className={styles.rightTop}>
            {data.isOriginal == "true" && (
              <div className={styles.unique}>
                <small>Original</small>
                <FingerPrintIcon size={18} />
              </div>
            )}
            <Link to="certificate">
              <Certificate01Icon size={22} className={styles.certificateIcon} />
            </Link>
            <AddToFavorite ideaId={ideaId || ""} />
          </div>
        </div>
        <div className={styles.content}>
          <h1>{data.title}</h1>
          <div className={styles.midContent}>
            <div className={styles.date}>{timeAgo(data.createdAt)}</div>&bull;{" "}
            <strong>Status :</strong>
            <div className={styles.status}>
              <span className={styles.statusText}>
                {data.implemented === "false" ? "Open" : "Closed"}
              </span>
              <span
                className={`${styles.statusDot} ${
                  data.implemented === "false"
                    ? styles.statusOpen
                    : styles.statusClosed
                }`}
              ></span>
            </div>
          </div>

          <div
            className=""
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
        <div className={styles.footer}>
          <div className={styles.btns}>
            <button onClick={() => setQrModalOpen(true)}>
              Donate <QrCodeIcon size={20} />
            </button>
            {isIdeaCreator && (
              <button
                onClick={() => setUpdateModalOpen(true)}
                className={styles.updateBtn}
              >
                Update <Settings01Icon size={20} />
              </button>
            )}
          </div>

          <Vote votes={data.votes} ideaId={ideaId || ""} />
        </div>
      </div>
      <div className={styles.comments}>
        <Discussion
          ideaId={ideaId || ""}
          ideaCreatorId={data.creator._id || ""}
        />
      </div>
      <Modal isOpen={isQrModalOpen} onClose={() => setQrModalOpen(false)}>
        <h2>Donate to {data.creator.fullname}</h2>
        <img src={data.donationQrCodeUrl} className={styles.qrImage} />
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <UpdateIdea
          ideaId={ideaId}
          initialValues={{
            implemented: data.implemented,
            donationQrCodeUrl: data.donationQrCodeUrl,
          }}
          onClose={() => setUpdateModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
