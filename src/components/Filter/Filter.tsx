import { PreferenceHorizontalIcon } from "hugeicons-react";
import { useState } from "react";
import styles from "./Filter.module.css";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../api/ideasApi";
import Loader from "../Loader/Loader";
import ErrorBox from "../ErrorBox/ErrorBox";

interface FilterProps {
  setVotes: (val: string) => void;
  setTags: (val: string) => void;
  setIsOriginal: (val: boolean) => void;
}

export default function Filter({
  setVotes,
  setTags,
  setIsOriginal,
}: FilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isOriginalChecked, setIsOriginalChecked] = useState(false);
  const { data, error, status } = useQuery({
    queryKey: ["ideas", "tags"],
    queryFn: getTags,
  });
  const toggleFilters = () => setShowFilters(!showFilters);

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(options);
    setTags(options.join(","));
  };

  const handleOriginalChange = () => {
    setIsOriginalChecked(!isOriginalChecked);
    setIsOriginal(!isOriginalChecked); // Update parent state with toggled value
  };

  return (
    <div className={styles.filterContainer}>
      {status == "pending" ? (
        <Loader />
      ) : status == "error" ? (
        <ErrorBox message={error.message} />
      ) : (
        <div className={styles.filterHeader} onClick={toggleFilters}>
          Filters <PreferenceHorizontalIcon />
        </div>
      )}

      {showFilters && (
        <div className={styles.filterOptions}>
          <div className={styles.filterGroup}>
            <label>Sort by:</label>
            <select onChange={(e) => setVotes(e.target.value)}>
              <option value="">Default</option>
              <option value="votes">Votes</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Tags (select multiple items by clicking ctrl):</label>
            <select
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              className={styles.multiSelect}
            >
              <option value="">None</option>
              {data.map((tag: string) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterCheck}>
            <input
              type="checkbox"
              checked={isOriginalChecked}
              onChange={handleOriginalChange}
              className={styles.inputCheck}
            />
            <label>Show Original Ideas Only</label>
          </div>
        </div>
      )}
    </div>
  );
}
