import React, { useCallback } from 'react';
import { editUser } from '../../utils/users';


export const IconStyleSwitch = ({user, userId, setUser}) => {

    const onBorderStyleChange = useCallback((e) => {
        const iconBorderStyle = e.target.value;
        if(user) {
            editUser(userId, {iconBorderStyle: iconBorderStyle})
            setUser(prevUser => ({...prevUser, iconBorderStyle: iconBorderStyle}))
        }
    }, []);

    return (
        <div onChange={onBorderStyleChange} id="switch-icon-style" className="switch-icon-style">
            <label>icon shape</label>
            <div className="row">
                <input type="radio" name="icon-shape" value="square" />square
                <input type="radio" name="icon-shape" value="circle" />circle
            </div>
        </div>
    );
}
