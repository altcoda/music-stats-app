import './ContactForm.css';
import { Form } from './Form';


export const ContactForm = () => {

    const onSubmit = (e) => {
        alert("Thank you for contacting us! We'll get back to you shortly!");
    };

    return (
    <Form action='/' onSubmit={onSubmit} id="contact-form" className="form contact-form" style={{maxWidth:'600px'}}>
        <h2>Contact Us</h2>
        <label htmlFor="name">Name</label>
        <input 
            id="name"
            type="text"
            name="name"
            placeholder="name"
            required
        />
        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            required
        />
        <label htmlFor="message">Your message</label>
        <textarea
            id="message"
            type="message"
            name="message"
            placeholder="message"
            required
        />
        <button id="contact-button" className="green">Submit</button>
    </Form>
    );
};
