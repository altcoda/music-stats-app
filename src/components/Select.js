import { Fragment, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { GlobalContext } from '../context/GlobalProvider';
import Select from 'react-select';


export const SelectTags = ({setTags}) => {
    const {tagOptions} = useContext(GlobalContext);

    return(tagOptions &&
        <Fragment>
            <label htmlFor="tags">Tags</label>
            <Select
                id="select-tags"
                defaultValue={[]}
                className="select-tags"
                isMulti
                name="tags"
                onChange={(selected) => setTags(selected.map(tag => tag.value))}
                options={tagOptions}
            />
        </Fragment>
    )
}

SelectTags.propTypes = {
    setTags: PropTypes.func.isRequired
}


export const SelectTag = () => {
    const {tagOptions} = useContext(GlobalContext);
    const {query, setQuery} = useContext(GlobalContext);

    return(tagOptions &&
        <Fragment>
            <label htmlFor="tags">Tags</label>
            <Select
                id="select-tags"
                defaultValue={[]}
                className="select-tags"
                name="tags"
                onChange={(selected) => setQuery({...query, tag: selected.value})}
                options={tagOptions}
            />
        </Fragment>
    )
}
