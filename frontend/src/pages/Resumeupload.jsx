import { useState } from "react";
import API from "../services/api";
import SkillChart from "../components/SkillChart";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-green-700">
          AI Resume Analyzer
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Upload your resume and get instant ATS analysis
        </p>

        {/* Upload Area */}
        <label
          className="
            mt-8
            border-2
            border-dashed
            border-green-400
            rounded-xl
            h-56
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            bg-green-50
            hover:bg-green-100
            transition
          "
        >
          <div className="text-6xl">📄</div>

          <h3 className="text-xl font-semibold text-gray-700 mt-3">
            Upload Your Resume
          </h3>

          <p className="text-gray-500 mt-1">
            Click to browse PDF or DOCX
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Selected File */}
        {file && (
          <div className="mt-4 bg-green-100 border border-green-300 p-4 rounded-xl">
            <p className="font-semibold text-green-700">
              Selected Resume
            </p>

            <p className="text-gray-700 text-sm mt-1">
              {file.name}
            </p>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="
            mt-6
            w-full
            py-4
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-bold
            text-lg
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8">

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-green-100 p-4 rounded-xl text-center">
                <h3 className="font-bold">ATS Score</h3>
                <p className="text-3xl font-bold text-green-700">
                  {result.ats_score}%
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl text-center">
                <h3 className="font-bold">Skills</h3>
                <p className="text-3xl font-bold text-blue-700">
                  {result.skills_found}
                </p>
              </div>

              <div className="bg-purple-100 p-4 rounded-xl text-center">
                <h3 className="font-bold">Education</h3>
                <p className="text-xl font-bold text-purple-700">
                  {result.education?.length || 0}
                </p>
              </div>

              <div className="bg-orange-100 p-4 rounded-xl text-center">
                <h3 className="font-bold">Experience</h3>
                <p className="font-bold text-orange-700">
                  {result.experience}
                </p>
              </div>

            </div>

            {/* Basic Info */}
            <div className="mt-6 bg-green-100 border border-green-300 rounded-xl p-5">
              <h2 className="text-2xl font-bold text-green-700">
                Resume Analysis
              </h2>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>📧 Email:</strong> {result.email}
                </p>

                <p>
                  <strong>📱 Phone:</strong> {result.phone}
                </p>

                <p>
                  <strong>📄 File:</strong> {result.filename}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold mb-3">
                Skills Detected
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-6 bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold mb-3">
                Education
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.education?.map((edu) => (
                  <span
                    key={edu}
                    className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full"
                  >
                    {edu}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-6">
  <SkillChart skills={result.skills} />
</div>
            <div className="mt-6 bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold text-red-600 mb-3">
                AI Suggestions
              </h3>

              <ul className="space-y-2">
                {result.suggestions?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-red-50 p-3 rounded-lg"
                  >
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resume Preview */}
            <div className="mt-6 bg-white border rounded-xl p-5">
              <h3 className="text-xl font-bold mb-3">
                Resume Preview
              </h3>

              <div className="bg-gray-50 border rounded-lg p-4 max-h-72 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {result.text}
                </pre>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ResumeUpload;