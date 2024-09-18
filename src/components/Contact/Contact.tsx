import React, { useState } from 'react';
import styles from './Contact.module.css'
import { useMutation } from '@tanstack/react-query';
import { sendContactMail } from '../../api/authApi';
import SuccessBox from '../SuccessBox/SuccessBox';
import ErrorBox from '../ErrorBox/ErrorBox';
import contact from '../../assets/images/connect.png'
const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // useMutation hook for submitting the contact form
  const mutation = useMutation({
    mutationFn: sendContactMail,
    onSuccess: () => {
      setSuccessMessage('Your message has been sent successfully!');
      setFormErrors(null);
      setFormValues({ name: '', email: '', message: '' }); // Reset form values
    },
    onError: (error: Error) => {
      setFormErrors(error.message);
      setSuccessMessage(null);
    },
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formValues); 
  };

  return (
    <section className={styles.container}>
      <div className={styles.formImage}>

        <img src={contact} className={styles.image}/>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formValues.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            ></textarea>
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </button>
        {formErrors && <SuccessBox message={formErrors}/>}
        {successMessage && <ErrorBox message={successMessage}/>}
      </form>
    </section>
  );
};

export default Contact;
