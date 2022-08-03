import Select from 'react-select';
import { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';


export const SelectTags = ({setTags, defaultTags}) => {
    const {tagOptions} = useContext(GlobalContext);

    return(tagOptions &&
        <Fragment>
            <label htmlFor="tags">Tags</label>
            <Select
                id="select-tags"
                defaultValue={defaultTags && defaultTags}
                options={tagOptions}
                className="select-tags"
                isMulti
                name="tags"
                onChange={(selected) => {
                    const tags = selected.map(tag => tag.value)
                    setTags(tags)
                }}
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
                options={tagOptions}
                placeholder="Select tag..."
                className="select-tags"
                name="tag"
                onChange={(selected) => setQuery({...query, tag: selected.value})}
            />
        </Fragment>
    )
}
