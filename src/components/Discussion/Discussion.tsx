import { useState } from "react";
import styles from "./Discussion.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getComments, postComment } from "../../api/commentApi";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atom";
import ErrorBox from "../ErrorBox/ErrorBox";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { timeAgo } from "../../services";

export default function Discussion({ ideaId, ideaCreatorId }: { ideaId: string, ideaCreatorId : string }) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const token = useRecoilValue(tokenState) as string;

  // Query
  const { data, error, isLoading } = useQuery({
    queryKey: ["comment", ideaId],
    queryFn: () => getComments(ideaId),
  });
  console.log(data);

  // Mutation for adding a comment
  const commentMutation = useMutation({
    mutationFn: (inputComment: string) =>
      postComment(ideaId, token, {
        content: inputComment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", ideaId] });
      setComment("");
    },
    onError: (err: any) => {
      setComment("");
      setErr(err.message);
    },
  });

  // Mutation for adding a reply
  const replyMutation = useMutation({
    mutationFn: ({
      inputComment,
      parentId,
    }: {
      inputComment: string;
      parentId: string;
    }) =>
      postComment(ideaId, token, {
        content: inputComment,
        parentId,
      }),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ["comment", ideaId] });
      setReplyContent(""); 
      setReplyCommentId(null); 
    },
    onError: (err: any) => {
      setReplyContent("");
      setErr(err.message);
    },
  });

  const addComment = () => {
    if (!comment.trim()) return; // Check if comment is not empty
    commentMutation.mutate(comment);
  };

  const addReply = (parentId: string) => {
    if (!replyContent.trim()) return; // Check if replyContent is not empty
    replyMutation.mutate({ inputComment: replyContent, parentId });
  };

  if (isLoading) return <Loader />;
  if(error) return <ErrorBox message={error.message || "Error Occured"}/>
  return (
    <>
      <h2>Discussion</h2>
      <div className={styles.inputComment}>
        <input
          placeholder="What are your thoughts..."
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
        />
        <button onClick={addComment} disabled={commentMutation.isPending} className={styles.postBtn}>
          {commentMutation.isPending ? "Posting..." : "Post"}
        </button>
      </div>
      <div className={styles.container}>
        {err && <ErrorBox message={err} />}
        {data.map((comment: any) => (
          <div key={comment._id} className={styles.comment}>
            <div className={styles.avatar}>
              <Link to={`/profile/${comment.creator._id}`}>
                <img src={comment.creator.profileUrl} alt="Profile" />
              </Link>
            </div>
            <div className={styles.commentContent}>
              <div className={styles.header}>
                <strong>@{comment.creator.username}</strong> {comment.creator._id == ideaCreatorId ? <small style={{"color" : "var(--secondary-color)"}}>founder</small> : <></>} &bull;{" "}
                {timeAgo(comment.createdAt)}
              </div>
              <p>{comment.content}</p>
              <div>
                <button onClick={() => setReplyCommentId(comment._id)}>
                  Reply
                </button>&bull;{" "}
                <small>{comment.replies.length} replies</small>
              </div>
              {replyCommentId === comment._id && (
                <div className={styles.replyInput}>
                  <input
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button className={styles.cancelBtn} onClick={() => setReplyCommentId("")}>Cancel</button>
                  <button
                    onClick={() => addReply(comment._id)}
                    disabled={replyMutation.isPending}
                  >
                    {replyMutation.isPending
                      ? "Posting Reply..."
                      : "Post Reply"}
                  </button>

                </div>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <div className={styles.commentContent}>
                  {comment.replies.map((reply: any) => (
                    <div key={reply._id} className={styles.replyComment}>
                      <div className={styles.avatar}>
                        <Link to={`/profile/${reply.creator._id}`}>
                          <img src={reply.creator.profileUrl} alt="Profile" />
                        </Link>
                      </div>
                      <div className={styles.commentContent}>

                        <div>
                        <strong>@{reply.creator.username}</strong> {reply.creator._id == ideaCreatorId ? <small style={{"color" : "var(--secondary-color)"}}>founder</small> : <></>} &bull;{" "}
                          {timeAgo(reply.createdAt)}
                        </div>
                        <p>{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
