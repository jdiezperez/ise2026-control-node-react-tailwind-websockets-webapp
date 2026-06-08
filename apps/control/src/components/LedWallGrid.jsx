import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const GridCell = ({ id, content, isDisabled }) => {
    // Only register droppable if not disabled
    const { isOver, setNodeRef } = useDroppable({
        id: id,
        disabled: isDisabled
    });

    const style = {
        flex: '1 1 0',
        minWidth: '0',
        height: 'auto',
        aspectRatio: '1/1', // Square cells as per check
        backgroundColor: '#000000',
        border: '2px solid #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        opacity: isDisabled ? 1 : 1, // Keep full opacity but style differently
    };

    const finalRef = isDisabled ? null : setNodeRef;

    return (
        <div ref={finalRef} style={style}>
            {isDisabled ? (
                // White X for disabled/occupied cells
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    background:
                        `linear-gradient(to top right, transparent calc(50% - 1.5px), #ffffff calc(50% - 1.5px), #ffffff calc(50% + 1.5px), transparent calc(50% + 1.5px)),
                         linear-gradient(to bottom right, transparent calc(50% - 1.5px), #ffffff calc(50% - 1.5px), #ffffff calc(50% + 1.5px), transparent calc(50% + 1.5px))`
                }} />
            ) : (
                <>
                    {content && (
                        <img
                            src={content}
                            alt="Content"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: 1
                            }}
                        />
                    )}
                    <span style={{
                        fontSize: '3rem',
                        color: '#ffffff',
                        zIndex: 0,
                        opacity: content ? 0 : 1
                    }}>+</span>
                </>
            )}
        </div>
    );
};

const LedWallGrid = ({ contentMap }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // Center grid
            gap: '0', // No gap
            width: '100%',
            // Remove fixed height to allow aspect ratio to dictate
            marginBottom: '20px',
            padding: '0 10px', // Reduced padding for better mobile fit
            maxWidth: '600px', // Ensure it doesn't stretch too wide on huge screens if flex grows
            margin: '0 auto 20px auto' // Center block
        }}>
            {['cell-1', 'cell-2', 'cell-3'].map((id) => (
                <GridCell
                    key={id}
                    id={id}
                    content={contentMap[id]}
                    isDisabled={id !== 'cell-3'} // Only cell-3 is enabled
                />
            ))}
        </div>
    );
};

export default LedWallGrid;
