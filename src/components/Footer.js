import './Footer.css';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { getYear } from '../utils/global';


export const Footer = () => {
    
    const {siteName} = useContext(GlobalContext);
    const year = getYear();

    return (
        <footer id="footer" className="footer">
            {siteName} App {year} ©
        </footer>
    );
}
