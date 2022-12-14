import Parse from 'parse/dist/parse.min.js';
import { useState } from "react";
import { Form } from '../components/Forms/Form';
import { Header } from '../components/Header';


export const PasswordReset = () => {
    
    const [email, setEmail] = useState('');
      
    const requestPasswordReset = async(e) => {
        e.preventDefault()

        try {
            await Parse.User.requestPasswordReset(email);
            setEmail('')
            alert(`Success! If the email is correct you will receive a message shortly.`);
        } catch(error) {
            alert(`Error! ${error}`)
        }
    };

    return(
        <Header id="password-reset-header" bgd="url('./img/UI/performance-1.jpg')" className="password-reset container flex-column">
            <Form style={{maxWidth: '300px'}} onSubmit={requestPasswordReset} className="password-reset container flex-column">
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    />
                <button type="submit" className="green">Reset Password</button>
            </Form>
        </Header>
    )
}