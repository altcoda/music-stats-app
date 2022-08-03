import './Pagination.css';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


export const Pagination = ({pages}) => {
    const {query, setQuery} = useContext(GlobalContext);

    const onPrevPage = () => {
        setQuery({...query, page: Number(query.page) - 1})
    }

    const onPageChange = (e) => {
        setQuery({...query, page: Number(e.target.value)})
    }

    const onNextPage = () => {
        setQuery({...query, page: Number(query.page) + 1})
    }

    return (
        <nav id="pagination-nav" className="pagination">
            <ul id="pagination" className="row">
                {(query && query.page > 1) && <li onClick={onPrevPage} id="prev-page" className="box"><FaAngleLeft /></li>}
                <label htmlFor="page-input" className="hidden">Page:</label>
                <input type="number" onChange={onPageChange} id="page-input" value={query.page} className="box"/>
                {(query && query.page !== pages) && <li onClick={onNextPage} id="next-page" className="box"><FaAngleRight /></li>}
            </ul>
        </nav>
    )
}