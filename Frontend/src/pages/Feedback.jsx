import { useState } from "react";
import { useSendFeedbackMutation } from "../features/auth/authApiSlice.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

function Feedback() {
  const { username } = useAuth();
  const [type, setType] = useState("");
  const [body, setBody] = useState("");
  const [sendFeedback, { isLoading, isSuccess, isError, error }] =
    useSendFeedbackMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFeedback({ username, type, body });
      alert("Feedback sent successfully!");
      setType(""); // Reset type
      setBody(""); // Reset body
      navigate(-1);
    } catch (err) {
      console.error("Failed to send feedback:", err);
    }
  };

  const errorContent = error?.data?.message || "";

  // Disable submit button if `type` is empty, `body` is empty, or exceeds 500 characters
  const canSubmit = type && body && body.length <= 500 && !isLoading;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-highlight p-6 font-raleway">
      <BackButton />
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offblack font-josefin">
          Send Us Your Feedback
        </h1>
        <p className="text-offblack mt-2">Your thoughts help us improve!</p>
      </header>

      <main className="w-full max-w-md space-y-6">
        <div className="min-h-[2rem]">
          {isError && errorContent && (
            <p className="text-center text-error" aria-live="assertive">
              {errorContent}
            </p>
          )}
          {isSuccess && (
            <p className="text-center text-accent">
              Feedback submitted successfully!
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Feedback Type Selection */}
          <div className="relative">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-offblack"
            >
              Feedback Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">-- Select Feedback Type --</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="UI/UX Feedback">UI/UX Feedback</option>
              <option value="Performance Issue">Performance Issue</option>
              <option value="Security Concern">Security Concern</option>
              <option value="Account Issue">Account Issue</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Content Feedback">Content Feedback</option>
              <option value="Question/Help Request">
                Question/Help Request
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message Body */}
          <div className="relative">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-offblack mt-8"
            >
              Message
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, 500))}
              required
              rows="5"
              className="w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-sm text-offblack mt-1">
              {500 - body.length} characters remaining
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="disabled:opacity-50 w-full !mt-8 px-4 py-2 text-lg font-medium text-offwhite bg-secondary rounded-md hover:bg-accent transition font-josefin"
          >
            {isLoading ? (
              <span>Submitting...</span>
            ) : (
              <span>Send Feedback</span>
            )}
          </button>
        </form>
      </main>
    </section>
  );
}

export default Feedback;
