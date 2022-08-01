import { ContactForm } from '../components/ContactForm';
import { Header } from '../components/Header';


export const ContactPage = () => {
    return(
        <Header bgdImage={'./img/UI/guy-music-1.jpg'} bgdImage2={'./img/UI/girl-music-5.jpg'} className="about">
            <ContactForm />
        </Header>
    )
}
