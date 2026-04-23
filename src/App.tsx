import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import GlowOverlay from './GlowOverlay'
import Nav from './components/Nav'
import Home from './pages/Home'
import Writing from './pages/Writing'
import Essay from './pages/Essay'

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
      <Nav />
      <div className={`page-content ${foldClass}`} onMouseMove={handleMouseMove}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Essay />} />
        </Routes>
      </div>
    </>
  )
}

export default App
