import React, {useCallback, useContext, useEffect, useState} from 'react';
import { GlobalContext } from '../../context/GlobalProvider';


export const ThemeSwitch = () => {

    const {user} = useContext(GlobalContext);
    const [dataTheme, setDataTheme] = useState();

    useEffect(() => {
        if(user.dataTheme) {
            setDataTheme(user.dataTheme)
            document.documentElement.setAttribute('data-theme', dataTheme);
        }
    }, []);

    const onThemeChange = useCallback(() => {
        setDataTheme(dataTheme === 'light' ? 'dark' : 'light');
    }, [dataTheme]);

    return (
        <div id='theme-switch' className={'theme-switch'}>
            <label className={'toggle-theme'} htmlFor="switch">Theme</label>
            <input type='checkbox' onClick={onThemeChange} />
        </div>
    );
}
