import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="text-center py-24">
      <h1 className="text-6xl font-bold text-green-700">
        AI Resume Analyzer
      </h1>

      <p className="mt-6 text-xl text-gray-600">
        Upload your resume and get ATS score,
        skill analysis and job matching.
      </p>
<Link to="/upload">
  <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl">
    Upload Resume
  </button>
</Link>
    </section>
  );
}

export default Hero;