import { Header } from '../components/Header';
import './AboutPage.css';


export const AboutPage = (props) => {
    return(
        <Header style={{backgroundColor: '#CDC6FF'}} className="about-header">
            <div style={{backgroundImage:`url(${"/img/UI/guy-music-1.jpg"})`}} className="flexImg" />
            <div className="info">
                <h1>About Us</h1>
                <h2>This is a website dedicated to music collections and stats. You are welcome to create an account to enjoy the full functionality such as making lists, adding your own albums and so on.</h2>
            </div>
        </Header>
    )
}
