import project1 from "@/assets/projects_img/project-1.png";
import project2 from "@/assets/projects_img/project-2.png";
import project3 from "@/assets/projects_img/project-3.png";
import learningImg1 from "@/assets/learnings/1.png";
import learningImg2 from "@/assets/learnings/2.png";
import learningImg3 from "@/assets/learnings/3.jpg";
import learningImg4 from "@/assets/learnings/4.png";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Sanjeevani: Healthcare Interoperability",
    description:
      "Built a consent based FHIR R4 patient record sharing platform using FastAPI, LangGraph, AWS and GraphRAG using Neo4j, with RBAC and JWT authentication. Implemented hybrid retrieval delivering clinical summaries in <3s.",
    image: project1,
    github: "https://github.com/abhay-patil-cse27/healthcare_interoperability_medgraph",
    live: "",
    tags: [
      "FastAPI",
      "LangGraph",
      "AWS",
      "Neo4j",
      "GraphRAG",
    ],
  },
  {
    id: 2,
    title: "Campus Mind: Multi-Tenant SaaS",
    description:
      "Transformed a single-college RAG chatbot into a multi tenant platform with complete data isolation across PostgreSQL, Pinecone and S3. Reduced support response time from 24+ hours to under 2 minutes.",
    image: project3,
    github: "https://github.com/Samrat-Madake/Campus-Mind",
    live: "",
    tags: [
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "Pinecone",
      "AWS",
    ],
  },
  {
    id: 3,
    title: "Department Connect: College Management",
    description:
      "Developed a full-stack departmental portal for colleges enabling role-specific dashboards for announcements, documents and leave requests. Implemented RBAC system with Passport.js.",
    image: project2,
    github: "https://github.com/Samrat-Madake/Department-Connect-",
    live: "",
    tags: ["Node.js", "Express.js", "MongoDB", "Passport.js", "RBAC"],
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-12 gradient-text">
          Featured Projects
        </h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ScrollAnimation key={project.id}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm h-full flex flex-col">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-purple-500/20 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-6 rounded-lg transition-all"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-purple-600/80 hover:bg-purple-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
      <ScrollAnimation>
        <h2 className="text-3xl font-bold mt-24 mb-10 gradient-text">
          Learning & Explorations
        </h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            id: 1,
            title: "LangGraph",
            image: learningImg1,
            description: "Daily learning and implementation of LangGraph workflows including Sequential, Parallel, and Conditional workflows.",
            github: "https://github.com/Samrat-Madake/Langraph",
            tags: ["LangGraph", "Python", "Workflows"]
          },
          {
            id: 2,
            title: "LangSmith",
            image: learningImg2,
            description: "LangSmith learning and tracing simple LLMs, Chains, and Agents.",
            github: "https://github.com/Samrat-Madake/LangSmith",
            tags: ["LangSmith", "LLMOps", "Tracing"]
          },
          {
            id: 3,
            title: "LangChain",
            image: learningImg3,
            description: "In this repo i will be posting my daily learning in Langchain.",
            github: "https://github.com/Samrat-Madake/Langchain",
            tags: ["LangChain", "RAG", "Prompts"]
          },
          {
            id: 4,
            title: "Java-DSA",
            image: learningImg4,
            description: "Java DSA implementations including Arrays, BST, Backtracking, Greedy, and more.",
            github: "https://github.com/Samrat-Madake/Java-DSA.git",
            tags: ["Java", "DSA", "Algorithms"]
          }
        ].map((repo) => (
          <ScrollAnimation key={repo.id}>
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden flex flex-col h-full hover:border-purple-500/50 transition-colors">
              {repo.image && (
                <img
                  src={repo.image}
                  alt={repo.title}
                  loading="lazy"
                  className="w-full h-48 object-cover border-b border-gray-700"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <Github className="w-6 h-6 text-gray-400" />
                  <h3 className="text-lg font-semibold truncate" title={repo.title}>{repo.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4 flex-grow">
                  {repo.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repo</span>
                </a>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Projects;
