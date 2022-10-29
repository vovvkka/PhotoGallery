import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import './Spinner.css';

const Spinner = ({show}) => {
    return (
        <>
            <Backdrop show={show}/>
            <div className="spinner" style={{opacity: show? '1' : '0'}}>
                <div className="cube1"></div>
                <div className="cube2"></div>
            </div>
        </>
    );
};

export default Spinner;