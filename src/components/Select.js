import { Fragment, useContext } from 'react';
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


export const SelectTag = () => {
    const {tagOptions} = useContext(GlobalContext);
    const {query, setQuery} = useContext(GlobalContext);

    return(tagOptions &&
        <Fragment>
            <label htmlFor="tag" className="hidden">Tag</label>
            <Select
                id="select-tags"
                defaultValue={[]}
                placeholder="Select tag..."
                className="select-tags"
                name="tag"
                onChange={(selected) => setQuery({...query, tag: selected.value})}
                options={tagOptions}
            />
        </Fragment>
    )
}
