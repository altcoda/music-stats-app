import { PropTypes } from 'prop-types';

export const Container = ({children, ...props}) => {
    <div id={props.id} style={props.style} className={props.className}>
        {children}
    </div>
}

Container.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};
