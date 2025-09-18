import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import NotFoundPage from "./Pages/404";
import ThankYouPage from "./Pages/ThankYou";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="#" className="hover:underline">
                  Sathish Madanu
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Sathish Madanu
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return <RouterProvider router={router} />;

}

export default App;