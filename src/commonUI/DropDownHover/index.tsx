import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style.css';

interface DropDownHoverProps {
  label?: any;
  align?:
    | 'start'
    | 'end'
    | { sm: 'start' | 'end' }
    | { md: 'start' | 'end' }
    | { lg: 'start' | 'end' }
    | { xl: 'start' | 'end' }
    | { xxl: 'start' | 'end' };
  items?: any[];
  children?: React.ReactNode;
  style?: any;
}

export default function DropDownHover({
  label,
  items,
  align = 'start',
  children,
  style,
}: DropDownHoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <DropdownButton
      className="dropdown-wrapper"
      style={style}
      drop="down"
      align={align}
      show={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={label}
    >
      <div>{children}</div>
    </DropdownButton>
  );
}