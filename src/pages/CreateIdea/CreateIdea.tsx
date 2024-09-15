import { PaintBoardIcon } from "hugeicons-react";
import styles from "./CreateIdea.module.css";
import CategorySelection from "../../components/CategorySelection/CategorySelection";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createIdea } from "../../api/ideasApi";
import SuccessBox from "../../components/SuccessBox/SuccessBox";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atom";

export default function CreateIdea() {
  const [title, setTitle] = useState<string>("");
  const [ideaDescription, setIdeaDescription] = useState<string>("");
  const [isOriginal, setIsOriginal] = useState<boolean>(true);
  const [source, setSource] = useState<string>("");
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const token = useRecoilValue(tokenState);

  const mutation = useMutation({
    mutationFn : (newIdea : FormData) => createIdea(newIdea, token || ''),
  })


  // Submit Handler :
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", ideaDescription);
    
    formData.append("tags", JSON.stringify(selectedCategories));

      
    formData.append("isOriginal", JSON.stringify(isOriginal));
  
    if (!isOriginal) {
      formData.append("sourceDescription", source);
    }
  
    if (isOriginal && paymentImage) {
      formData.append("image", paymentImage);
    }
  
    mutation.mutate(formData);
  };
  




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setPaymentImage(files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>
          Create Idea <PaintBoardIcon />
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>Give your idea a title *</label>
            <input
              type="text"
              placeholder="Next billion dollar idea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>What's your idea about? *</label>
            <textarea
              placeholder="Describe your idea"
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
            />
          </div>
          <CategorySelection
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className={styles.checkContainer}>
            <label>Is your idea original?</label>
            <input
              type="checkbox"
              checked={isOriginal}
              onChange={(e) => setIsOriginal(e.target.checked)}
            />
          </div>
          {!isOriginal &&

            <div className={styles.inputContainer}>
              <label>Describe the source for your idea</label>
              <textarea
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
          }
          {isOriginal &&
          
            <div className={styles.inputContainer}>
              <label>
                Want to receive donations for your idea? (Upload your Payment
                Image like a QR code)
              </label>
              <input type="file" accept="image/*" name="image" onChange={handleFileChange} />
            </div>
          }
          <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Creating Idea ...' : 'Create Idea'}</button>
        </form>
        {mutation.isSuccess && <SuccessBox message="Idea Created Successfully"/>}
        {mutation.isError && <ErrorBox message={mutation.error.message || ""}/>}
      </div>
    </div>
  );
}
