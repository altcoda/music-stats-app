import { Fragment, useContext, useEffect, useState } from 'react';
import { Albums } from '../components/Albums';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';


export const HorizScroll = ({children}) => {
    const [mousePos, setMousePos] = useState({isDown: false, startX: null, scrollLeft: null})
    
    const handleMouseDown = (e) => {
        const element = e.target.querySelector('div');
        console.log(e.target)
        setMousePos(prevState => ({...prevState, isDown: true}))
        element.classList.add('active');
        setMousePos(prevState => ({...prevState, startX: e.pageX - element.offsetLeft}))
        setMousePos(prevState => ({...prevState, scrollLeft: element.scrollLeft}))
    };
    
    const handleMouseLeave = (e) => {
        const element = e.target.querySelector('div');
        setMousePos(prevState => ({...prevState, isDown: false}))
        element.classList.remove('active');
    };
    
    const handleMouseUp = (e) => {
        const element = e.target.querySelector('div');
        setMousePos(prevState => ({...prevState, isDown: false}))
        element.classList.remove('active');
    };
    
    const handleMouseMove = (e) => {
        if(!mousePos.isDown) return;
        e.preventDefault();

        const element = e.target.querySelector('div');
        const x = e.pageX - element.offsetLeft;
        const walk = (x - mousePos.startX);
        element.scrollLeft = mousePos.scrollLeft - walk;
        console.log(walk);
    };

    return(
        <div
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
                {children}
        </div>
    )
}

export const HomePage = () => {

    const {user} = useContext(GlobalContext);
    const {siteName} = useContext(GlobalContext);

    return(
        <Fragment>
            <Header id="main-header" className="main-header" bgd="linear-gradient(rgba(255, 36, 241, 0.2), rgba(0, 4, 255, 0.2)), url(/img/UI/girl-music-2.jpg)">
                <h1>{user ? `hello, ${user.username}!` : `Welcome to ${siteName}`}</h1>
                <section className={`join ${user && 'hidden'}`}>
                    <h2>Want to add your own albums/make lists?</h2>
                    <Link to='/register'>
                        <button className="highlight">Join us</button>
                    </Link>
                </section>
            </Header>

            <Header id="albums-header" className="albums-header h-scroll reset-height" style={{backgroundColor: '#FFFFFF'}}>
                <Albums limit="12" className="albums"/>
            </Header>

            <Header id="info-header" className="info-header sharpen" bgd="linear-gradient(rgba(0, 4, 255, 0.3), rgba(92, 0, 255, 0.3)), url(/img/UI/vinyl-1.jpg)">
            
            </Header>
        </Fragment>
    )
}