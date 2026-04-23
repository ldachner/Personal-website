import React, { useEffect, useState } from 'react';

const EDGE_THRESHOLD = 25; // px
const FADE_DISTANCE = 30; // px - additional distance for fade

type Edge = 'top' | 'bottom' | 'left' | 'right' | null;

export const GlowOverlay: React.FC = () => {
  const [edge, setEdge] = useState<Edge>(null);
  const [visible, setVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setCursorPos({ x: clientX, y: clientY });
      
      // Calculate distance from each edge
      const distanceFromTop = clientY;
      const distanceFromBottom = innerHeight - clientY;
      const distanceFromLeft = clientX;
      const distanceFromRight = innerWidth - clientX;
      
      // Find the closest edge and calculate opacity
      let newEdge: Edge = null;
      let minDistance = Infinity;
      let calculatedOpacity = 0;
      
      if (distanceFromTop < EDGE_THRESHOLD + FADE_DISTANCE) {
        if (distanceFromTop < minDistance) {
          minDistance = distanceFromTop;
          newEdge = 'top';
        }
      }
      if (distanceFromBottom < EDGE_THRESHOLD + FADE_DISTANCE) {
        if (distanceFromBottom < minDistance) {
          minDistance = distanceFromBottom;
          newEdge = 'bottom';
        }
      }
      if (distanceFromLeft < EDGE_THRESHOLD + FADE_DISTANCE) {
        if (distanceFromLeft < minDistance) {
          minDistance = distanceFromLeft;
          newEdge = 'left';
        }
      }
      if (distanceFromRight < EDGE_THRESHOLD + FADE_DISTANCE) {
        if (distanceFromRight < minDistance) {
          minDistance = distanceFromRight;
          newEdge = 'right';
        }
      }
      
      // Calculate opacity based on distance
      if (newEdge && minDistance <= EDGE_THRESHOLD + FADE_DISTANCE) {
        if (minDistance <= EDGE_THRESHOLD) {
          // Full opacity within threshold
          calculatedOpacity = 1;
        } else {
          // Linear fade from threshold to fade distance
          const fadeProgress = (minDistance - EDGE_THRESHOLD) / FADE_DISTANCE;
          calculatedOpacity = 1 - fadeProgress;
        }
      }
      
      setEdge(newEdge);
      setVisible(!!newEdge && calculatedOpacity > 0);
      setOpacity(calculatedOpacity);
    };
    
    const handleMouseLeave = () => {
      setEdge(null);
      setVisible(false);
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!visible || !edge) return null;

  return (
    <div 
      className={`glow-overlay glow-${edge}`}
      style={{
        '--cursor-x': `${cursorPos.x}px`,
        '--cursor-y': `${cursorPos.y}px`,
        '--glow-opacity': opacity,
      } as React.CSSProperties}
    />
  );
};

export default GlowOverlay; 