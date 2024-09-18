import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from './UpdateIdea.module.css';
import { updateIdea } from "../../api/ideasApi"; 
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atom";
import { notyf } from "../../utils/notyf";

export default function UpdateIdea({ ideaId, initialValues, onClose }: any) {
  const [implemented, setImplemented] = useState(initialValues.implemented);
  const [donationQrCode, setDonationQrCode] = useState<File | null>(null);
  const token = useRecoilValue(tokenState) 
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateIdea(ideaId, formData, token || ""),
    onSuccess: () => {

      notyf.success('Idea Updated Successfully')
      queryClient.invalidateQueries({queryKey :['ideas', ideaId]});
      onClose();
    },
    onError: (error: any) => {
      notyf.error(error.message)
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('implemented', implemented);
    if (donationQrCode) {
      formData.append('image', donationQrCode);
    }

    mutation.mutate(formData);
  };

  return (
    <div className={styles.container}>
      <h2>Update Idea</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="implemented">
          Implemented:
          <select
            id="implemented"
            value={implemented}
            onChange={(e) => setImplemented(e.target.value)}
            className={styles.select}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label htmlFor="donationQrCode">
          Upload Donation QR Code:
          <input
            type="file"
            id="donationQrCode"
            onChange={(e) => setDonationQrCode(e.target.files?.[0] || null)}
            className={styles.inputFile}
          />
        </label>

        <button type="submit" className={styles.updateButton} disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
