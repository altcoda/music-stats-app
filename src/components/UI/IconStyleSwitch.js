import React, { useCallback } from 'react';


export const IconStyleSwitch = ({setIconBorderStyle}) => {

    const onBorderStyleChange = useCallback((e) => {
        setIconBorderStyle(e.target.value)
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
