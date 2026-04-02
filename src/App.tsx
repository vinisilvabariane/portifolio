import { AnimatePresence, motion } from 'framer-motion'
import { Box } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.015, y: -8 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: '100svh',
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <Box sx={{ minHeight: '100svh' }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/projetos"
            element={
              <AnimatedPage>
                <Projects />
              </AnimatedPage>
            }
          />
          <Route
            path="/sobre"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/contato"
            element={
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
    </Box>
  )
}

export default App
