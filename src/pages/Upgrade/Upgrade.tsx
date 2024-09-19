import styles from "./Upgrade.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenState } from "../../recoil/atom";
import { upgradeUserProfile } from "../../api/authApi";
import { useRecoilState } from "recoil";
import { notyf } from "../../utils/notyf";
import { Link } from "react-router-dom";

const Upgrade = () => {
  const [fullname, setFullname] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [token] = useRecoilState(tokenState);
  const queryClient = useQueryClient();
  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: (formData: FormData) =>
      upgradeUserProfile(formData, token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      setFullname("");
      setAbout("");
      setImage(null);
      notyf.success("Account Upgraded Successfully");
    },
    onError: (error: any) => {
      setFullname("");
      setAbout("");
      setImage(null);
      notyf.error(error.message);
    },
  });

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullname);
    if (about !== "") formData.append("about", about);
    if (image) {
      formData.append("image", image);
    }

    mutate(formData);
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitForm}>
          <h2>Upgrade your account</h2>
          <div>
            <label>Enter Full Name *</label>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <label>Enter About Yourself (Optional)</label>
            <textarea
              placeholder="Enter About yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div>
            <label>Upload/Change your Profile Pic (Optional)</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Upgrading..." : "Upgrade"}
          </button>
          {isSuccess &&  <Link to='/create' className="link">Go to create idea page</Link>}
        </form>
      </div>
    </div>
  );
};

export default Upgrade;
