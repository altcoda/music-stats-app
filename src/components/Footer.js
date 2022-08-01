import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import './Footer.css';


export const Footer = () => {

    const {siteName} = useContext(GlobalContext);

    return (
        <footer id="footer" className="footer">
            <small>All Rights Reserved - {siteName} App 2022©.</small>
        </footer>
    );
}
