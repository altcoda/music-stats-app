import { Header } from '../components/Header';
import './AboutPage.css';


export const AboutPage = () => {
    return(
        <Header style={{backgroundColor: '#CDC6FF'}} className="about-header">
            <div style={{backgroundImage:`url(${"/img/UI/guy-music-1.jpg"})`}} className="flexImg" />
            <div className="info">
                <h1>About Us</h1>
                <p>This is a website dedicated to music collections and stats.</p>
                <ul className="flex-column">
                    <li>
                        <h2>Profiles</h2>
                        <p>After you create your account you can make lists and edit your profile.</p>
                    </li>
                    <li>
                        <h2>Add your album</h2>
                        <p>Are you an artist? Add your own albums.</p>
                    </li>
                </ul>
            </div>
        </Header>
    )
}
