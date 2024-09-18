import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import styles from "./Vote.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteIdea } from "../../api/ideasApi";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atom";
import { notyf } from "../../utils/notyf";

export default function Vote({votes, ideaId} : {votes : number, ideaId : string}) {
  const token= useRecoilValue(tokenState)
  const queryClient= useQueryClient()
  const mutation= useMutation({
    mutationFn : (vote : string) => voteIdea(token || "", vote, ideaId),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["ideas", ideaId]})
      notyf.success('Vote Added!')
    },
    onError : (error) => {
      notyf.error(error.message)
    }
  })
  return (
    <div className={styles.votes}>
      <div className={styles.upvote} onClick={() => mutation.mutate("upvote")}>
        <ArrowUp01Icon className={styles.icon} /> {votes}
      </div>
      <div className={styles.downvote} onClick={() => mutation.mutate("downvote")}>
        <ArrowDown01Icon className={styles.icon}/>
      </div>
    </div>
  );
}
