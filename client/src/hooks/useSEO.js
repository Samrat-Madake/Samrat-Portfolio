import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "";

const PAGE_META = {
  "/": {
    title: "Samrat Madake - Full Stack / AI Developer",
    description:
      "Samrat Madake — Full Stack / AI Developer specializing in Data Science, backend systems, and AI. Based in Kolhapur, India.",
  },
  "/about": {
    title: "About - Samrat Madake",
    description:
      "Learn about Samrat Madake — B.Tech CSE (Data Science) student and Software Developer.",
  },
  "/projects": {
    title: "Projects - Samrat Madake",
    description:
      "Explore software projects built by Samrat Madake using FastAPI, React, Node.js, and AI workflows.",
  },
  "/skills": {
    title: "Skills - Samrat Madake",
    description:
      "Technical skills of Samrat Madake — Python, Java, FastAPI, LangGraph, RAG Pipelines, AWS, and more.",
  },
  "/experience": {
    title: "Experience - Samrat Madake",
    description:
      "Professional and collegiate experience of Samrat Madake.",
  },
  "/education": {
    title: "Education - Samrat Madake",
    description:
      "Educational background of Samrat Madake — B.Tech in CSE (Data Science) with 8.5 CGPA.",
  },
  "/achievement": {
    title: "Achievements - Samrat Madake",
    description:
      "Hackathon wins, coding competitions, and achievements of Samrat Madake.",
  },
  "/blogs": {
    title: "Blogs - Samrat Madake",
    description:
      "Read blogs on LangChain, LangGraph, and LLM development by Samrat Madake.",
  },
  "/contact": {
    title: "Contact - Samrat Madake",
    description:
      "Get in touch with Samrat Madake for freelance projects, job opportunities, or collaborations.",
  },
};

const FALLBACK_META = {
  title: "Samrat Madake - Data Science Student & Software Developer",
  description:
    "Portfolio of Samrat Madake — Data Science Student & Software Developer.",
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_META[location.pathname] ?? FALLBACK_META;
    const url = `${BASE_URL}${location.pathname}`;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [location.pathname]);
};
