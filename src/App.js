import { Fragment, useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { getCurrentUser, initParse } from './utils/users';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, routes } from './routes';
import { PrivateRoute } from './components/PrivateRoute';
import { ErrorPage } from './pages/ErrorPage';


export const App = () => {

    const {user, setUser} = useContext(GlobalContext);

    const initUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser)
    }

    useEffect(() => {
        initParse()
        initUser()
    }, [])

    return (
        <Fragment>
            <Router>
                <Navbar />
                <div className="navbar-pad" />
                <Routes>
                    {routes.map((route) => <Route path={route.path} element={route.element} />)}
                    
                    {privateRoutes.map((route) =>
                        <Route path={route.path} element={<PrivateRoute>
                            {route.element}
                        </PrivateRoute>} />
                    )}

                    <Route path='*' element={<ErrorPage />} />
                </Routes>
                <Footer />
            </Router>
        </Fragment>
    )
}