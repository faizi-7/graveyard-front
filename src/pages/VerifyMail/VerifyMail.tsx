import { useRecoilValue } from "recoil";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import styles from "./VerifyMail.module.css";
import { tokenState } from "../../recoil/atom";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationMail } from "../../api/authApi";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import SuccessBox from "../../components/SuccessBox/SuccessBox";

export default function VerifyMail() {
  const { data, error, isLoading } = useAuth();
  const token = useRecoilValue(tokenState);

  const {
    mutate,
    isPending,
    isError,
    error: sendError,
    isSuccess
  } = useMutation({ mutationFn: () => sendVerificationMail(token || "") });

  function sendMailHandler() {
    mutate();
  }

  if (isLoading) return <Loader />;
  if(error) return <ErrorBox message={error.message}/>
  return (
    <div className={styles.container}>
      <h1>Verify Email</h1>
      <p>
        <strong>Your Email</strong> : {data.email}
      </p>
      <button onClick={sendMailHandler} disabled={isPending || isSuccess}>
        {isPending ? "Sending Mail" : "Send Verification Mail"}
      </button>
      {isError && <ErrorBox message={sendError.message}></ErrorBox>}
      {isSuccess && <SuccessBox message="Verification Mail Sent Check Inbox"/>}
      <small>Check Spam if it is not found in inbox!</small>
      <small>By clicking on the Verification link in your inbox your mail will be verified!</small>
    </div>
  );
}
