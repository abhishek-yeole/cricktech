import React, { useState, useEffect } from 'react';
import './layout.css'

const Loader = ({time}) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, time);

        return () => {
            clearTimeout(timer);
        };
    }, [time]);

    const [showLoaderBlur, setShowLoaderBlur] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoaderBlur(true);
        }, time-1000);

        return () => {
            clearTimeout(timer);
        };
    }, [time]);

    return (
        <div>
            {showLoader && (
                <div>
                    <div className={`loader ${showLoaderBlur ? 'blur' : ''}`}>
                        <div className="custom-loader"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loader;