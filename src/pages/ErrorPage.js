import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './ErrorPage.css';


export const ErrorPage = () => {
    return(
        <Header bgd="url('/img/UI/cassette-1.jpg')" className="error">
            <div className="container flex-column">
                <h1>404</h1>

                <button id="not-found-button">
                    <Link to='/'><b>Back to Home</b></Link>
                </button>
            </div>
        </Header>
    )
}
