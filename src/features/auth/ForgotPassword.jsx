import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../auth/authApiSlice.jsx";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onBlur = () => setEmailTouched(true);

  const canSubmit = validEmail && !isLoading;

  const apiErrorMessage = isError
    ? error?.data?.message || "An unexpected error occurred. Please try again."
    : "";

  useEffect(() => {
    if (isSuccess) {
      alert(
        "An email with instructions to reset your password has been sent. Please check your inbox."
      );
      setEmail("");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email);
    setValidEmail(isValid);
    if (emailTouched && !isValid) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

  const onSubmitClicked = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        await forgotPassword({ email });
      } catch (err) {
        if (import.meta.env.MODE === "development") {
          console.error("Forgot Password error:", err);
        }
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-primary p-6">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-offwhite">
          Forgot Password
        </h1>
      </header>
      <main className="w-full max-w-md space-y-6">
        <div className="min-h-[2rem]">
          {isError && (
            <p className="text-center text-error" aria-live="assertive">
              {apiErrorMessage}
            </p>
          )}
        </div>
        <form className="space-y-4" onSubmit={onSubmitClicked}>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-offwhite"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={onEmailChanged}
              onBlur={onBlur}
              required
              className={`w-full px-3 py-2 border rounded-md text-offblack focus:outline-none focus:ring-2 focus:ring-accent ${
                !validEmail && emailTouched && "border-error"
              }`}
            />
            {emailTouched && emailError && (
              <p className="absolute text-error text-sm mt-1">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full px-4 py-2 !mt-8 text-lg font-medium text-offwhite bg-accent disabled:opacity-50 rounded-md hover:bg-highlight transition"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </section>
  );
};

export default ForgotPassword;
