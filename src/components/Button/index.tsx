import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
    const classes = disabled ? 'bg-disabledGray text-disabledGrayText' : 'bg-brand text-white';
    const onClickHandler = () => {
        !disabled && onClick();
    };
    return (
        <button className={`w-full font-bold p-3 rounded-md ${classes}`} onClick={onClickHandler}>
            {children}
        </button>
    );
};

export default Button;