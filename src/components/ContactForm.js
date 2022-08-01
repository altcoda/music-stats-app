import { Form } from './Form';


export const ContactForm = () => {

    const onSubmit = (e) => {
        alert('Thank you for contacting us! We\'ll get back to you shortly!')
    }

    return (
        <Form onSubmit={onSubmit} className={'compact-form'}>
            <label>Email</label>
            <input id="email" type="email" placeholder="email" required />
            <label>Write to us:</label>
            <textarea id="message" type="message" placeholder="message" required />
            <button id="createButton" className="green">Contact us</button>
        </Form>
    );
}
