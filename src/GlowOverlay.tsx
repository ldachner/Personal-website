import React, { useEffect, useState } from 'react';

const EDGE_THRESHOLD = 25;
const FADE_DISTANCE = 30;

type Edge = 'top' | 'bottom' | 'left' | 'right' | null;

export const GlowOverlay: React.FC = () => {
  const [edge, setEdge] = useState<Edge>(null);
  const [visible, setVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      setCursorPos({ x: clientX, y: clientY });

      const distFromDocTop = scrollY + clientY;
      const distFromDocBottom = docHeight - scrollY - clientY;
      const distFromLeft = clientX;
      const distFromRight = window.innerWidth - clientX;

      let newEdge: Edge = null;
      let minDistance = Infinity;

      if (distFromDocTop < EDGE_THRESHOLD + FADE_DISTANCE && distFromDocTop < minDistance) {
        minDistance = distFromDocTop;
        newEdge = 'top';
      }
      if (distFromDocBottom < EDGE_THRESHOLD + FADE_DISTANCE && distFromDocBottom < minDistance) {
        minDistance = distFromDocBottom;
        newEdge = 'bottom';
      }
      if (distFromLeft < EDGE_THRESHOLD + FADE_DISTANCE && distFromLeft < minDistance) {
        minDistance = distFromLeft;
        newEdge = 'left';
      }
      if (distFromRight < EDGE_THRESHOLD + FADE_DISTANCE && distFromRight < minDistance) {
        minDistance = distFromRight;
        newEdge = 'right';
      }

      let calculatedOpacity = 0;
      if (newEdge) {
        calculatedOpacity = minDistance <= EDGE_THRESHOLD
          ? 1
          : 1 - (minDistance - EDGE_THRESHOLD) / FADE_DISTANCE;
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
