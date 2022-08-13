import Select from 'react-select';
import { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalProvider';
import { genres } from '../../data/genres';


export const SelectTags = ({setTags, defaultTags}) => {
    const selectedOptions = defaultTags && genres.filter(tag => defaultTags.includes(tag.value));

    return(genres &&
        <Fragment>
            <label htmlFor="tags">Tags</label>
            <Select
                id="select-tags"
                defaultValue={selectedOptions}
                options={genres}
                placeholder="Select tags..."
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
    const {query, setQuery} = useContext(GlobalContext);

    return(genres &&
        <Fragment>
            <label htmlFor="tag" className="hidden">Tag</label>
            <Select
                id="select-tags"
                defaultValue={[]}
                options={genres}
                placeholder="Select tag..."
                className="select-tags"
                name="tag"
                onChange={(selected) => setQuery({...query, tag: selected.value})}
            />
        </Fragment>
    )
}
