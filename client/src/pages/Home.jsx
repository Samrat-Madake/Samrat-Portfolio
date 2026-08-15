
import { VercelLogo } from "@/components/TechLogos";
import { CONTACT_INFO } from "@/config/contact";
import { fetcher, formatRepoCount, isTouchDevice } from "@/utils/helpers";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  FileDown,
  Code,
  Github,
  Linkedin,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

const GITHUB_API = `https://api.github.com/users/${import.meta.env.VITE_GITHUB_USERNAME || "Samrat-Madake"}`;

const Home = () => {
  const [copied, setCopied] = useState(false);

  const { data: githubData } = useSWR(GITHUB_API, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
    shouldRetryOnError: true,
    errorRetryCount: 3,
  });

  const displayRepos = formatRepoCount(githubData?.public_repos ?? 0);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  };

  const handleEmailClick = () => {
    if (isTouchDevice()) {
      window.location.href = `mailto:${CONTACT_INFO.email}`;
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-7 sm:mt-0 md:mt-3 lg:mt-5">
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 relative tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Samrat Madake
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 relative tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          I build scalable software systems.
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-4 sm:mb-5 max-w-2xl mx-auto px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CSE (Data Science & AIML) Student 
          <br></br>
          Experience in building scalable backend systems using the MERN stack and REST APIs. Built production
          style AI powered applications using Large Language Models (LLMs), RAG pipelines, LangGraph, vector databases, and LLMs.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <a
              href="https://drive.google.com/file/d/1hLTCFH4FYoi7Eu6ICb0Wvp4wb0NnBMaS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              Download CV
            </a>
            <Link
              to="/about"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white rounded-full text-sm sm:text-base font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              About Me
            </Link>
          </div>

          <button
            onClick={handleEmailClick}
            className="group relative flex items-center gap-2 py-2 pl-8 pr-4 hover:bg-transparent transition-all cursor-copy sm:cursor-pointer"
            aria-label={`Email: ${CONTACT_INFO.email}`}
          >
            <div className="absolute left-0 flex items-center">
              <div className="w-3 text-gray-500 group-hover:text-white transition-colors">
                <VercelLogo />
              </div>
              <span className="text-lg font-mono text-gray-400 ml-3 group-hover:text-white transition-colors">
                ~
              </span>
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors ml-4 sm:text-base">
              {CONTACT_INFO.email}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hidden sm:block">
              {copied ? (
                <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
              ) : (
                <Copy
                  className="w-4 h-4 text-gray-400 hover:text-white transition-colors"
                  aria-hidden="true"
                />
              )}
            </div>
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 justify-items-center gap-6 mt-8 sm:mt-12 max-w-xs sm:max-w-none mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group w-full"
            aria-label="GitHub Projects"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="p-3 rounded-xl transition-colors mb-2 w-full max-w-[200px]">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors mx-auto" />
              </div>
              <span className="text-base sm:text-lg font-semibold">
                20+
              </span>
              <span className="text-xs sm:text-sm text-gray-400">
                GitHub Repo
              </span>
            </motion.div>
          </a>

          <a
            href={CONTACT_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group w-full"
            aria-label="LeetCode Profile"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="p-3 rounded-xl transition-colors mb-2 w-full max-w-[200px]">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors mx-auto" />
              </div>
              <span className="text-base sm:text-lg font-semibold">
                350+
              </span>
              <span className="text-xs sm:text-sm text-gray-400">
                DSA Problems
              </span>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
