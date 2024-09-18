import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./TopIdeasCarousel.module.css"; // Assuming you have custom styles
import { getTopIdeas } from "../../api/ideasApi";
import Loader from "../Loader/Loader";
import ErrorBox from "../ErrorBox/ErrorBox";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function TopIdeasCarousel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ideas", "top"],
    queryFn: () => getTopIdeas(),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorBox message="Error Fetching top ideas!" />;

  return (
    <div className={styles.container}>
      <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      
        {data?.map((idea: any) => (
          <SwiperSlide key={idea._id} className={styles.slide}>
            <div className={styles.card}>
              <Link to={`/profile/${idea.creator._id}`} className={styles.profile}>

                <img src={idea.creator.profileUrl}/>
                <label>Creator</label>
                <h3>{idea.creator.fullname}</h3>
              </Link>
              <Link to={`/ideas/${idea._id}`} className={styles.content}>
                <h2>Idea : {idea.title}</h2>
                <span>Votes: <strong>{idea.votes}</strong></span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
