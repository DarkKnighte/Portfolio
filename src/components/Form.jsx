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
  <div className="form-group">
    <label htmlFor="name">Nom complet</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Votre nom"
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Adresse email</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="exemple@domaine.com"
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="message">Votre message</label>
    <textarea
      id="message"
      name="message"
      placeholder="Votre message ici..."
      required
    ></textarea>
  </div>
  <button type="submit">Envoyer</button>
  <p>{result}</p>
</form>
  );
}
