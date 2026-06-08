import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export const Asset = ({ id, src, label, isOverlay }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: id,
        data: { src }
    });

    const style = {
        width: '140px',
        height: '180px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        boxSizing: 'border-box',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        // Touch Optimization
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        ...(isOverlay && {
            cursor: 'grabbing',
            transform: 'scale(1.05)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
            zIndex: 9999
        })
    };

    const content = (
        <>
            <div style={{
                flex: 1,
                backgroundColor: '#eee',
                marginBottom: '10px',
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} />
            <div style={{
                color: '#000000',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '1.2',
                textTransform: 'uppercase',
                textAlign: 'left'
            }}>
                {label || id.replace(/_/g, ' ')}
            </div>
        </>
    );

    if (isOverlay) {
        return <div style={style}>{content}</div>;
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {content}
        </div>
    );
};

const AssetLibrary = ({ assets }) => {
    return (
        <div style={{
            padding: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            flex: 1,
            alignContent: 'flex-start',
            justifyContent: 'center'
        }}>
            {assets.map((asset) => (
                <Asset key={asset.id} id={asset.id} src={asset.src} label={asset.label} />
            ))}
        </div>
    );
};

export default AssetLibrary;
