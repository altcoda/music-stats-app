import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import './Footer.css';
import { FaGithub } from 'react-icons/fa';


export const Footer = () => {
    
    const {siteName} = useContext(GlobalContext);

    return (
        <footer id="footer" className="footer">
            {siteName} App 2022©. Created by <a href="https://github.com/altcoda">altcoda</a> <FaGithub />
        </footer>
    );
}
