import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default Home;