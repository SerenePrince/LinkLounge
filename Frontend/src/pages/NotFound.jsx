function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-semibold text-offwhite">
        Oops! Page Not Found
      </h1>
      <p>
        The page you&apos;re trying to access doesn&apos;t exist. Please
        double-check the URL or{" "}
        <a href="/" className="underline">
          return to the homepage.
        </a>
      </p>
    </div>
  );
}

export default NotFound;
