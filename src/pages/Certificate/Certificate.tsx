import { useParams } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import Loader from "../../components/Loader/Loader";
import styles from "./Certificate.module.css";
import { getSingleIdea } from "../../api/ideasApi";
import { useQuery } from "@tanstack/react-query";
import { Award05Icon } from "hugeicons-react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import SuccessBox from "../../components/SuccessBox/SuccessBox";

export default function Certificate() {
  const { ideaId } = useParams();
  const certificateRef = useRef(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["ideas", ideaId],
    queryFn: () => getSingleIdea(ideaId || ""),
  });
  console.log(data);
  if (isLoading) return <Loader />;
  if (error) return <ErrorBox message={'Certificate Not Valid'} />;
  return (
    <div className={styles.container}>
      <SuccessBox message={'Certificate is Valid'}/>
      <ReactToPrint
        trigger={() => <button className={styles.printBtn}>Download PDF</button>}
        content={() => certificateRef.current}
        documentTitle={`Certificate_${data._id}`}
      />
      <div className={styles.certificate} ref={certificateRef}>
        <h1>Certificate <Award05Icon size= {40}/></h1>
        <p>This certificate is to verify the creation of the following idea:</p>

        <div className={styles.certificateDetails}>
          <h2>Idea : {data.title}</h2>
          <p>
            <strong>Submitted by:</strong> {data.creator.fullname}
          </p>
          <p>
            <strong>Unique ID:</strong> {data._id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Platform:</strong> Eyedea
          </p>
        </div>

        <div className={styles.verification}>
          <p>
            Verified by <strong>idea.ifaiz.xyz</strong>
          </p>
          <p>
            URL:{" "}
            <a href={`https://idea.ifaiz.com/ideas/{ideaId}/certificate`}>
              https://idea.ifaiz.com/ideas/{ideaId}/certificate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
