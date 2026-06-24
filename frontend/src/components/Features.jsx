function Features() {
  const features = [
    "ATS Score",
    "Skill Detection",
    "Job Matching",
    "AI Suggestions"
  ];

  return (
    <section className="grid grid-cols-2 gap-6 p-10">
      {features.map((item) => (
        <div
          key={item}
          className="bg-white shadow rounded-xl p-6"
        >
          <h3 className="font-bold text-green-700">
            {item}
          </h3>
        </div>
      ))}
    </section>
  );
}

export default Features;