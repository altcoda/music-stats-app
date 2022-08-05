import React, {useCallback, useContext, useEffect, useState} from 'react';
import { GlobalContext } from '../../context/GlobalProvider';


export const ThemeSwitch = () => {

    const {user} = useContext(GlobalContext);
    const [dataTheme, setDataTheme] = useState();

    const onThemeChange = useCallback(() => {
        setDataTheme(dataTheme === 'light' ? 'dark' : 'light');
    }, [dataTheme]);

    useEffect(() => {
        if(user) {
            setDataTheme(user.dataTheme)
        }
        document.documentElement.setAttribute('data-theme', dataTheme);
    }, [user]);


    return (
        <div id='switch-data-theme' className={'theme-switch'}>
            <input type='checkbox' onClick={onThemeChange} />
            <label className={'toggle-theme'} htmlFor="switch">Switch Theme</label>
        </div>
    );
}
