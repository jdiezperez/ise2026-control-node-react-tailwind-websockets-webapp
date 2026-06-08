import React, { useState } from 'react';
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import Layout from './components/Layout';
import ModeButton from './components/ModeButton';
import LedWallGrid from './components/LedWallGrid';
import AssetLibrary, { Asset } from './components/AssetLibrary';

const ASSETS = [
    {
        id: "main_loop",
        src: "/control/images/videos/framemov_info.png",
        video: "framemov_info.mp4",
        label: "FRAMEMOV"
    },
    {
        id: "vertical_1",
        src: "/control/images/videos/framemov_vertical_3.png",
        video: "framemov_vertical_1.mp4",
        label: "IMMERSIVE"
    },
    {
        id: "vertical_2",
        src: "/control/images/videos/framemov_vertical_1.png",
        video: "framemov_vertical_2.mp4",
        label: "INTERACTIVE"
    },
    {
        id: "vertical_3",
        src: "/control/images/videos/framemov_vertical_2.png",
        video: "framemov_vertical_2.mp4",
        label: "CREATIVE IA"
    },
    {
        id: "video_1",
        src: "/control/images/videos/video_1.png",
        video: "video_1.mp4",
        label: "FRAMEROOM"
    },
    {
        id: "video_2",
        src: "/control/images/videos/video_2.png",
        video: "video_2.mp4",
        label: "FRAMEID"
    }
];

function App() {
    const [activeMode, setActiveMode] = useState('presentation'); // 'presentation' | 'experience'
    const [ledContent, setLedContent] = useState({
        'cell-1': null,
        'cell-2': null,
        'cell-3': null,
    });
    const [activeDragId, setActiveDragId] = useState(null);

    // Sensors for better touch/mouse handling
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const sendOsc = async (address, args = []) => {
        try {
            await fetch('/api/osc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, args })
            });
        } catch (err) {
            console.error('Failed to send OSC:', err);
        }
    };

    const handleDragStart = (event) => {
        setActiveDragId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { over, active } = event;
        setActiveDragId(null);

        if (over && active.data.current) {
            setLedContent(prev => ({
                ...prev,
                [over.id]: active.data.current.src
            }));

            // Send OSC command for video drop
            const droppedAsset = ASSETS.find(a => a.id === active.id);
            if (droppedAsset && droppedAsset.video) {
                sendOsc('/video', [droppedAsset.video]);
            }
        }
    };

    const activeAsset = activeDragId ? ASSETS.find(a => a.id === activeDragId) : null;

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Layout>
                <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                    <ModeButton
                        title="PRESENTATION"
                        isActive={activeMode === 'presentation'}
                        color="primary"
                        onClick={() => {
                            setActiveMode('presentation');
                            sendOsc('/presentation');
                        }}
                    />
                    <ModeButton
                        title="EXPERIENCE"
                        isActive={activeMode === 'experience'}
                        color="secondary"
                        onClick={() => {
                            setActiveMode('experience');
                            sendOsc('/experience');
                        }}
                    />
                </div>

                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    opacity: activeMode === 'experience' ? 1 : 0.2,
                    pointerEvents: activeMode === 'experience' ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
                }}>
                    <LedWallGrid contentMap={ledContent} />
                    <AssetLibrary assets={ASSETS} />
                </div>
            </Layout>

            <DragOverlay>
                {activeAsset ? <Asset id={activeAsset.id} src={activeAsset.src} label={activeAsset.label} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}

export default App;
