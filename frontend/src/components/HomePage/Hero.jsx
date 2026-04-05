import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = [
    "AI precision",
    "Faster reports",
    "Smart alerts",
    "Doctor empowerment",
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center relative bg-[#fafafa] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand-300/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-300/30 blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container relative z-10 mx-auto px-4 max-w-[1200px] flex items-center justify-center">
        <div className="flex gap-8 py-16 items-center justify-center flex-col text-center w-full">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-100 shadow-sm text-brand-700 text-sm font-medium mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>Next-gen healthcare intelligence</span>
          </motion.div>

          <div className="flex gap-6 flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-slate-900 text-center font-bold leading-[1.1] max-w-4xl">
              Your diagnosis journey 
              <br className="hidden md:block" /> begins with{" "}
              <span className="relative inline-flex flex-col h-[1.1em] overflow-hidden align-bottom">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent font-extrabold"
                    initial={{ opacity: 0, y: "100%" }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? "-100%" : "100%", opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
                <span className="invisible">AI precision</span>
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl text-center mx-auto mt-4"
            >
              <strong className="text-slate-900 font-semibold">mediBuddy</strong> enhances healthcare with AI-powered scan analysis, real-time alerts, and seamless integration—helping you detect diseases faster.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            >
              <button 
                onClick={() => navigate("/login")} 
                className="relative cursor-pointer overflow-hidden text-white font-medium bg-brand-600 hover:bg-brand-700 px-8 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(99,102,241,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(99,102,241,0.4)] flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                <span className="relative z-10 font-semibold text-lg">Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </button>
              
              <button 
                className="relative cursor-pointer text-slate-700 font-medium bg-white hover:bg-slate-50 border border-slate-200 px-8 py-3.5 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-lg">View Demo</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}