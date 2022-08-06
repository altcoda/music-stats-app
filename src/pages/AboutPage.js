import { Header } from '../components/Header';
import './AboutPage.css';


export const AboutPage = () => {
    return(
        <Header style={{backgroundColor: '#CDC6FF'}} className="about-header">
            <div style={{backgroundImage:`url(${"/img/UI/guy-music-1.jpg"})`}} className="flexImg" />
            <div className="info">
                <h1>About Us</h1>
                <section id="about" className="about flex-column">
                    <p><b>This is a website dedicated to music.</b> Browse through popular albums, filter them by tag and search by album/artist name. View details about the albums/artists. Create your account to like albums or submit an album created by you. Customize your profile with live preview.</p>

                    <p>An option to make lists will be added in the future.</p>
                </section>
            </div>
        </Header>
    )
}
