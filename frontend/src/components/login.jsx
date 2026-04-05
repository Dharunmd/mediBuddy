import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Eye, EyeOff, Mail, Lock, CheckCircle, ShieldCheck } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row font-sans">
      {/* Left side - Branding (Modern Dark Panel) */}
      <div className="lg:w-1/2 relative flex flex-col justify-center items-center p-8 lg:p-16 bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <Link to="/" className="flex items-center mb-16 group inline-flex cursor-pointer transition-transform hover:scale-105">
            <div className="bg-gradient-to-tr from-brand-600 to-brand-400 text-white p-2 rounded-xl shadow-lg flex items-center justify-center">
              <div className="h-6 w-6 flex items-center justify-center font-bold text-xl leading-none">
                MB
              </div>
            </div>
            <h1 className="ml-3 font-bold text-2xl tracking-tight text-white">
              medi<span className="text-brand-400">Buddy</span>
            </h1>
          </Link>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Advanced medical <br/> insights, simplified.
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-sm leading-relaxed">
            Securely access patient records, specialized AI analysis, and integrated diagnosis tools in one platform.
          </p>

          <div className="space-y-6">
            <div className="flex items-start group">
              <div className="bg-white/10 p-2.5 rounded-xl mr-4 group-hover:bg-brand-500/20 transition-colors">
                <ShieldCheck size={22} className="text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 mb-1">Bank-grade Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  End-to-end encryption ensures all patient data remains confidential and HIPAA compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form Panel */}
      <div className="lg:w-1/2 flex justify-center items-center p-8 lg:p-16 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Enter your credentials to access your portal.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-500">
                    <Mail size={18} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <a href="#" className="text-brand-600 hover:text-brand-700 text-xs font-semibold transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 focus:outline-none rounded-lg"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-1 pb-2">
                <button
                  type="button"
                  className={`flex items-center justify-center w-5 h-5 rounded-[6px] mr-2.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                    rememberMe
                      ? "bg-brand-600 border-none"
                      : "border border-slate-300 bg-white"
                  }`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <CheckCircle size={14} className="text-white" />}
                </button>
                <label htmlFor="remember-me" className="text-sm text-slate-600 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-brand-500/20 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="relative z-10 flex items-center">
                    Sign in to portal
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  Request access
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center space-x-4">
             <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
             <span className="text-slate-300">•</span>
             <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
