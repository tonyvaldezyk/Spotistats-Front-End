import React from 'react';
import { RiExpandLine, RiCloseLine } from 'react-icons/ri';

export const Widget = ({ 
  title, 
  children, 
  className = '', 
  onExpand, 
  expanded = false 
}) => {
  return (
    <div 
      className={`widget ${className} ${expanded ? 'expanded' : ''}`}
      style={{
        position: expanded ? 'fixed' : 'relative',
        top: expanded ? '0' : 'auto',
        left: expanded ? '0' : 'auto',
        right: expanded ? '0' : 'auto',
        bottom: expanded ? '0' : 'auto',
        zIndex: expanded ? 1000 : 1,
        width: expanded ? '100vw' : '100%',
        height: expanded ? '100vh' : '100%',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        transform: 'scale(1)',
        cursor: 'pointer'
      }}
    >
      <div className="widget-header">
        <h3>{title}</h3>
        <button 
          className="expand-button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand?.();
          }}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <RiCloseLine /> : <RiExpandLine />}
        </button>
      </div>
      <div 
        className="widget-content"
        style={{
          height: expanded ? 'calc(100vh - 60px)' : '100%',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};
