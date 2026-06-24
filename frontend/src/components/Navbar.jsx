function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-green-700">
        ResumeAI
      </h1>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </nav>
  );
}

export default Navbar;