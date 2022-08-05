import './Form.css';
import { PropTypes } from 'prop-types';


export const Form = ({children, ...props}) => {
    return(
        <form action={props.action} id={props.id} onSubmit={props.onSubmit} style={props.style} className={props.className}>
            {children}
        </form>
    )
}

Form.propTypes = {
    action: PropTypes.string,
    id: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
};
