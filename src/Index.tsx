import Navbar from "./routes/Navbar";
import Footer from "./routes/Footer";

import { Outlet, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from "motion/react";

function Index() {

  const location = useLocation();

  return (
    <main className="bg-colorBack w-full h-full">
      <Navbar />
      <AnimatePresence mode="wait">
        <section className="overflow-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
            transition={{
              type: "spring", // Tipo de transição: mola
              stiffness: 115, // Controla a "rigidez" da mola (maior = menos oscilação)
              damping: 10, // Controla o "atrito" (menor = mais oscilação)
            }}
            className="max-md:pt-20 pt-28 pb-8 max-md:px-4 px-24 min-h-96"
          >
            <Outlet />
          </motion.div>
        </section>
      </AnimatePresence>
      <Footer />
    </main>
  )
}

export default Index;
