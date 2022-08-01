import './Header.css';
import { PropTypes } from 'prop-types';


export const Header = ({children, ...props}) => {
    return (
        <header 
            id={props.id}
            className={props.className}
            style={{
                ...props.style,
                backgroundImage: props.bgd && props.bgd
            }}>
            {children}
        </header>
    )
}

Header.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    bgd: PropTypes.string
};
