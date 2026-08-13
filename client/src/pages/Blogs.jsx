import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

import blog1 from "@/assets/blog/1.png";
import blog2 from "@/assets/blog/2.png";
import blog3 from "@/assets/blog/3.png";
import blog4 from "@/assets/blog/4.png";
import blog5 from "@/assets/blog/5.png";
import blog6 from "@/assets/blog/6.png";

const blogs = [
  {
    id: 1,
    title: "Understanding LLMs and the LangChain Universe",
    image: blog1,
    description: "From Models to Real Applications",
    link: "https://medium.com/@samratmadake21/understanding-llms-and-the-langchain-universe-from-models-to-real-applications-36cd703948e5",
    longDescription: "A deep dive into the world of Large Language Models and how LangChain enables building powerful AI applications.",
    type: "blog",
  },
  {
    id: 2,
    title: "LangChain Components (Overview)",
    image: blog2,
    description: "Key building blocks of LangChain",
    link: "https://medium.com/@samratmadake21/langchain-components-overview-171812b4cec8",
    longDescription: "An overview of the core components that make up the LangChain framework.",
    type: "blog",
  },
  {
    id: 3,
    title: "Models & Prompts in LangChain",
    image: blog3,
    description: "Crafting effective AI interactions",
    link: "https://medium.com/@samratmadake21/models-prompts-in-langchain-6579583de497",
    longDescription: "How to work with different models and design prompts for optimal results in LangChain.",
    type: "blog",
  },
  {
    id: 4,
    title: "Output Parser in Langchain",
    image: blog4,
    description: "Structuring AI responses",
    link: "https://medium.com/@samratmadake21/output-parser-in-langchain-210b434e78a3",
    longDescription: "Getting structured data out of language models using LangChain's output parsers.",
    type: "blog",
  },
  {
    id: 5,
    title: "Chains and Runnables in LangChain",
    image: blog5,
    description: "Composing complex AI workflows",
    link: "https://medium.com/@samratmadake21/chains-and-runnables-in-langchain-9643d8633d99",
    longDescription: "Exploring LangChain Expression Language (LCEL) and how to chain different operations together.",
    type: "blog",
  },
  {
    id: 6,
    title: "Retrieval Augmented Generation (RAG)",
    image: blog6,
    description: "A Complete Guide to RAG",
    link: "https://medium.com/@samratmadake21/retrieval-augmented-generation-rag-a-complete-guide-to-rag-dce3c6931a6d",
    longDescription: "Everything you need to know about building RAG systems to ground AI responses in your data.",
    type: "blog",
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 gradient-text flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          My Blogs
        </h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <ScrollAnimation key={blog.id}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm h-full flex flex-col border border-gray-700/50 hover:border-green-500/50 transition-colors">
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-green-600 font-medium mb-3">{blog.description}</p>
                <p className="text-gray-400 mb-6 flex-grow">
                  {blog.longDescription}
                </p>
                
                <div className="flex justify-center mt-2">
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600/80 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Read Article</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
