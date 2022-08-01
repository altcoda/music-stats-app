import './Pagination.css';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


export const Pagination = () => {
    const {query, setQuery} = useContext(GlobalContext);
    const prevNextSize = new Array(4).map((n, i) => i + 1);

    const onPrevPage = () => {
        if(query && query.page > 1) {
            setQuery({...query, page: Number(query.page) - 1})
        }
    }

    const onPageChange = (e) => {
        setQuery({...query, page:  Number(e.target.value)})
    }

    const onNextPage = () => {
        setQuery({...query, page:  Number(query.page) + 1})
    }

    return(
        <nav id="pagination-nav" class="pagination">
            <ul id="pagination" className="row">
                <li onClick={onPrevPage} id="prev-page" className="box"><FaAngleLeft /></li>
                {prevNextSize.map(num => {
                    return(<li onClick={onPageChange} className="box">{(query.page - num > 1) && query.page - num}</li>)
                })}
                <label htmlFor="page-input" className="hidden">Page:</label>
                <input onChange={onPageChange} id="page-input" value={query.page} className="box"/>
                <li onClick={onNextPage} id="next-page"  className="box"><FaAngleRight /></li>
            </ul>
        </nav>
    )
}