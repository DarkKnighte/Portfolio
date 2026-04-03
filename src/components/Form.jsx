import { useState } from 'react';
import './Form.scss';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "ce1ce755-5b86-49e7-8c97-c993ac58b775");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="contact-form">
    <input type="text" name="name" placeholder="Votre nom" required />
    <input type="email" name="email" placeholder="Votre email" required />
    <textarea name="message" placeholder="Votre message" required></textarea>
      <button type="submit">Submit</button>
      <p>{result}</p>
    </form>
  );
}
