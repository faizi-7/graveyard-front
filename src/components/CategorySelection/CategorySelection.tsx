import React from "react";
import styles from "./CategorySelection.module.css";
import { getTags } from "../../api/ideasApi";
import { useQuery } from "@tanstack/react-query";
import ErrorBox from "../ErrorBox/ErrorBox";

interface CategorySelectionProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[] | any) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const { data, error, status } = useQuery({
    queryKey: ["ideas", "tags"],
    queryFn: getTags,
  });
  if(status == 'pending') return <></>
  if(error) return <ErrorBox message={error.message || 'Error Getting Categories'}/>
  return (
    <div>
      <label>Select Category/ies *</label>
      <div className={styles.categoryList}>
        {data.map((category:string) => (
          <div
            key={category}
            className={`${styles.categoryItem} ${
              selectedCategories.includes(category) ? styles.selected : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
