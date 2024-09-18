import { StarIcon } from "hugeicons-react";
import styles from "./AddToFavorite.module.css";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addIdeaToFavorite } from "../../api/ideasApi";
import { notyf } from "../../utils/notyf";

export default function AddToFavorite({ideaId} : {ideaId : string}) {
  const token= useRecoilValue(tokenState) as string
  const queryClient= useQueryClient()
  const mutation = useMutation({
    mutationFn : () => addIdeaToFavorite(token, ideaId),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["ideas", ideaId]})
      notyf.success("Idea Added to your favorites")
    },
    onError : (error) => {
      notyf.error(error.message)
    }
  })
  return (
    <div className={styles.favorite} onClick={() => mutation.mutate()}>
      <StarIcon size={20} className={styles.icon}/>
    </div>
  );
}
