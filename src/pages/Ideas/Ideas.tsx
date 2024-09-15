import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./Ideas.module.css";
import { getAllIdeas } from "../../api/ideasApi";
import IdeaCard from "../../components/IdeaCard/IdeaCard";
import Loader from "../../components/Loader/Loader";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useState } from "react";
import Filter from "../../components/Filter/Filter";
import { Loading01Icon, Loading02Icon, Loading03Icon } from "hugeicons-react";

export default function Ideas() {
  const [sortBy, setSortBy] = useState<string | undefined>("");
  const [tags, setTags] = useState<string | undefined>("");
  const [isOriginal, setIsOriginal] = useState<boolean | undefined>(false);
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["ideas", { sortBy, tags, isOriginal }],
    queryFn: ({ pageParam = 0 }) =>
      getAllIdeas({ pageParam, sortBy, tags, isOriginal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div className={styles.container}>
      <Filter setVotes= {setSortBy} setTags= {setTags} setIsOriginal= {setIsOriginal}/>
      {status === "pending" ? (
        <Loader />
      ) : status === "error" ? (
        <ErrorBox message={error.message} />
      ) : (
        <>
          <div className={styles.ideasContainerContainer}>
            {data.pages.map((group, i) => (
              <div key={i} className={styles.ideasContainer}>
                {group.data.map((idea: any) => (
                  <IdeaCard
                    key={idea._id}
                    ideaId= {idea._id}
                    title={idea.title}
                    description={idea.description}
                    votes={idea.votes}
                    creator={idea.creator}
                    isOriginal={idea.isOriginal}
                    createdAt={idea.createdAt}
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <button
              className={styles.loadBtn}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
                <Loading03Icon/>
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </>
      )}
    </div>
  );
}
