import {
  FaBehance,
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaPinterest,
  FaReddit,
  FaSnapchat,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Public() {
  return (
    <div className="bg-offwhite text-offblack font-raleway">
      {/* Header with Nav Bar */}
      <header className="bg-primary p-4">
        <nav className="flex flex-col laptop:flex-row justify-between items-center text-center">
          <div className="text-3xl font-bold text-offwhite font-josefin">
            LinkLounge
          </div>
          <div>
            <Link
              to="login"
              className="text-offwhite px-4 py-2 hover:bg-accent rounded font-josefin"
              aria-label="Go to Login page" // Added for better accessibility
            >
              Login
            </Link>
            <Link
              to="signup"
              className="text-offwhite px-4 py-2 hover:bg-accent rounded ml-4 font-josefin"
              aria-label="Go to Sign Up page" // Added for better accessibility
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col laptop:flex-row items-center justify-evenly p-12 bg-highlight">
        <div className="w-full laptop:w-1/2 text-left">
          <h1 className="text-5xl font-bold font-josefin">
            Welcome to LinkLounge
          </h1>
          <p className="mt-4 text-lg">
            A simple way to organize and share everything that matters to you.
            Create lounges for your links and update them whenever you want—easy
            and stress-free.
          </p>
          <Link
            to="signup"
            className="mt-6 inline-block bg-accent text-offwhite px-6 py-3 rounded hover:bg-offwhite hover:text-offblack transition font-josefin"
            aria-label="Start using LinkLounge by signing up"
          >
            Get Started for Free
          </Link>
        </div>
        <div className="w-full laptop:w-1/3 mt-6 laptop:mt-0">
          <img
            src="loungeLogo.png"
            alt="LinkLounge Hero Logo"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="p-12 space-y-12">
        {/* Feature 1 */}
        <div className="flex flex-col laptop:flex-row items-center">
          <div className="w-full laptop:w-1/2 p-4 text-right">
            <h2 className="text-3xl font-semibold font-josefin">
              Organize Your Links
            </h2>
            <p className="mt-4">
              Share all your links—socials, portfolios, business sites—in one
              place. Add as many as you like.
            </p>
          </div>
          <div className="w-full laptop:w-1/2 p-4">
            <div className="grid grid-cols-8 gap-4">
              <FaYoutube size={60} className="bg-highlight p-2 rounded-lg" />
              <FaTwitter size={60} className="bg-highlight p-2 rounded-lg" />
              <FaInstagram size={60} className="bg-highlight p-2 rounded-lg" />
              <FaSnapchat size={60} className="bg-highlight p-2 rounded-lg" />
              <FaTwitch size={60} className="bg-highlight p-2 rounded-lg" />
              <FaTiktok size={60} className="bg-highlight p-2 rounded-lg" />
              <FaLinkedin size={60} className="bg-highlight p-2 rounded-lg" />
              <FaGithub size={60} className="bg-highlight p-2 rounded-lg" />
              <FaFacebook size={60} className="bg-highlight p-2 rounded-lg" />
              <FaPinterest size={60} className="bg-highlight p-2 rounded-lg" />
              <FaWhatsapp size={60} className="bg-highlight p-2 rounded-lg" />
              <FaReddit size={60} className="bg-highlight p-2 rounded-lg" />
              <FaDiscord size={60} className="bg-highlight p-2 rounded-lg" />
              <FaDribbble size={60} className="bg-highlight p-2 rounded-lg" />
              <FaBehance size={60} className="bg-highlight p-2 rounded-lg" />
              <FaMedium size={60} className="bg-highlight p-2 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="flex flex-col laptop:flex-row-reverse items-center">
          <div className="w-1/2 laptop:w-1/2 p-4 text-left">
            <h2 className="text-3xl font-semibold font-josefin">
              Choose a Template
            </h2>
            <p className="mt-4">
              Pick a template that fits your style—no design skills needed.
            </p>
          </div>
          <div className="relative flex justify-center items-center w-full laptop:w-1/2 p-4 gap-3 ">
            <div className="relative w-full laptop:w-1/3 transform z-10">
              <img
                src="themeExample1.png"
                alt="Theme Example 1"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full laptop:w-1/3 transform z-20">
              <img
                src="themeExample2.png"
                alt="Theme Example 2"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full laptop:w-1/3 transform z-30">
              <img
                src="themeExample3.png"
                alt="Theme Example 3"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col laptop:flex-row items-center">
          <div className="w-full laptop:w-1/2 p-4 text-right">
            <h2 className="text-3xl font-semibold font-josefin">
              Unlimited Lounges
            </h2>
            <p className="mt-4">
              Create as many lounges as you want—one for work, one for hobbies,
              or anything in between.
            </p>
          </div>
          <div className="w-full laptop:w-1/2 p-4">
            <img
              src="loungeExample.png"
              alt="Organize all your links"
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-tertiary p-12 text-center">
        <h2 className="text-4xl font-semibold text-offwhite font-josefin">
          Start Your LinkLounge Today
        </h2>
        <p className="text-lg mt-4 text-offwhite">
          Build, share, and update your lounges whenever you want—for free.
        </p>
        <Link
          to="signup"
          className="mt-6 inline-block bg-accent text-offwhite px-6 py-3 rounded hover:bg-offwhite hover:text-offblack transition font-josefin"
          aria-label="Start your LinkLounge journey by signing up"
        >
          Get Started Now!
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-primary p-4 text-center text-offwhite">
        <p className="font-josefin p-4">
          &copy; 2025 LinkLounge | A Personal Project by Noah Park-Nguyen
        </p>
        <p className="text-sm">
          Have feedback?{" "}
          <a href="mailto:noahpn.info@gmail.com" className="underline">
            Let me know!
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Public;
