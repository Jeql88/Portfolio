import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center">Projects</h2>
        {/* Add project components here */}
      </section>
      <ContactForm />
    </motion.div>
  );
};

export default Home;