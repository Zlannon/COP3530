import React from 'react';
import "./Switch.css";
import CL from 'classnames';

const Switch = ({rounded = false, as=false, isToggled, onToggle}) => {
    const sliderCL = CL("slider", {
        rounded: rounded
    });
    
    return (
        <label className='switch'>
            <input type="checkbox" checked={isToggled} onChange={onToggle} />
            <span className={sliderCL}/>
        </label>
    );
};

export default Switch;