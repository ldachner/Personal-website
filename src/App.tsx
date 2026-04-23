import { useState } from 'react'
import './App.css'
import GlowOverlay from './GlowOverlay'

function App() {
  const [foldClass, setFoldClass] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const threshold = 20;
    
    let newFoldClass = '';
    if (clientY < threshold && clientX < threshold) newFoldClass = 'fold-top-left';
    else if (clientY < threshold && clientX > innerWidth - threshold) newFoldClass = 'fold-top-right';
    else if (clientY > innerHeight - threshold && clientX < threshold) newFoldClass = 'fold-bottom-left';
    else if (clientY > innerHeight - threshold && clientX > innerWidth - threshold) newFoldClass = 'fold-bottom-right';
    
    setFoldClass(newFoldClass);
  };

  return (
    <>
      <GlowOverlay />
      <div className={`page-content ${foldClass}`} onMouseMove={handleMouseMove}>
        <h1>Liam's Personal Website</h1>
        <p>More coming soon!</p>
      </div>
    </>
  )
}

export default App
