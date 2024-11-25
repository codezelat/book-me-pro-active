"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // Display error message
    } else {
      router.push("/dashboard"); // Redirect to dashboard if login is successful
    }
  };

  return (
    <div
      className="grid place-items-center h-screen"
      style={{
        background:
          "url('https://www.codingnepalweb.com/demos/create-glassmorphism-login-form-html-css/hero-bg.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        padding: "0 10px",
      }}
    >
      <div
        className="w-full max-w-lg p-12 rounded-2xl shadow-xl"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>
        <p className="text-sm text-[#000000] mb-6">
          If you have an account, please login
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="py-4 px-5 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-[#002D74] bg-gray-100"
              required
            />
            <label
              className={`absolute left-5 text-gray-400 text-lg transition-all duration-300 ${
                email ? "top-2 text-xs" : "top-5"
              }`}
            >
              Enter your email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="py-4 px-5 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-[#002D74] bg-gray-100"
              required
            />
            <label
              className={`absolute left-5 text-gray-400 text-lg transition-all duration-300 ${
                password ? "top-2 text-xs" : "top-5"
              }`}
            >
              Enter your password
            </label>
          </div>

          {/* Remember Me and Forgot Password */}
          <div
            className="flex justify-between items-center text-primary"
            style={{ marginBottom: "35px" }}
          >
            <label htmlFor="remember" className="flex items-center">
              <input type="checkbox" id="remember" className="accent-primary" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link href="#" className="text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-3 px-6 rounded-lg text-white font-semibold bg-primary hover:bg-primary transition-all duration-300"
            style={{ width: "100%" }}
          >
            Log In
          </button>

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                padding: "12px",
                marginTop: "20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Google Login */}
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-6 h-6"
              viewBox="0 0 48 48"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              />
            </svg>
            <span className="ml-4">Login with Google</span>
          </button>

          {/* Register Link */}
          <div className="text-sm mt-4">
            <Link
              href="/auth/signup"
              className="text-sm text-[#232424] hover:underline"
            >
              Don&apos;t have an account?{" "}
              <span className="text-primary">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
