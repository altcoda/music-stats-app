import { Fragment, useContext } from 'react';
import { Albums } from '../components/Albums';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { ContactForm } from '../components/ContactForm';


export const HomePage = () => {

    const {user} = useContext(GlobalContext);
    const {albumsList} = useContext(GlobalContext);
    const {siteName} = useContext(GlobalContext);

    return(
        <Fragment>
            <Header id="main-header" className="main-header" bgd="linear-gradient(rgba(255, 36, 241, 0.2), rgba(160, 161, 255, 0.2)), url(/img/UI/girl-music-2.jpg)">
                <h1>{user ? `hello, ${user.username}!` : `Welcome to ${siteName}`}</h1>
                <section className={`join ${user && 'hidden'}`}>
                    <h2>Want to add your own albums/make lists?</h2>
                    <Link to='/register'>
                        <button className="highlight">Join us</button>
                    </Link>
                </section>
            </Header>

            <Header id="albums-header" className="albums-header reset-height" style={{backgroundColor: '#FFFFFF'}}>
                {/* {albumsList ?
                <Albums limit="12" className="albums"/> :
                <div style={{display: 'flex', alignItems: 'center', height:'80px', padding:'20px'}}>We apologise, there was a problem obtaining the albums data.</div>} */}
            </Header>

            <Header id="info-header" className="info-header sharpen" bgd="linear-gradient(rgba(0, 4, 255, 0.3), rgba(92, 0, 255, 0.3)), url(/img/UI/vinyl-1.jpg)">
                <ContactForm />
            </Header>
        </Fragment>
    )
}