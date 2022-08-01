import { Fragment, useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { getCurrentUser, initParse } from './utils/users';


export const App = ({children}) => {

    const {setUser} = useContext(GlobalContext);

    useEffect(() => {
        initParse()
        const initUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser)
        }
        initUser()
    }, [])
    
    return (
        <Fragment>
            <Navbar />
            <div className="navbar-pad" />
                {children}
            <Footer />
        </Fragment>
    )
}
