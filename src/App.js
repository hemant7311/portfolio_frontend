import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import MouseTrail from "./components/Effects/MouseTrail";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`

const CursorOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary + "33"};
  pointer-events: none;
  z-index: 9999;
  transition: transform 60ms ease-out;
  @media (max-width: 768px) { display: none; }
`

const CursorInner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  pointer-events: none;
  z-index: 10000;
  transition: transform 40ms ease-out;
  @media (max-width: 768px) { display: none; }
`
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
        <Navbar />
        <Body>
          <MouseTrail />
          <HeroSection />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
          <CursorOuter style={{ transform: `translate3d(${cursorPos.x - 18}px, ${cursorPos.y - 18}px, 0)` }} />
          <CursorInner style={{ transform: `translate3d(${cursorPos.x - 5}px, ${cursorPos.y - 5}px, 0)` }} />
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
