import { PropTypes } from 'prop-types';

export const Form = ({children, ...props}) => {
    return(
        <form id={props.id} onSubmit={props.onSubmit} style={props.style} className={props.className}>
            {children}
        </form>
    )
}

Form.propTypes = {
    id: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
};
