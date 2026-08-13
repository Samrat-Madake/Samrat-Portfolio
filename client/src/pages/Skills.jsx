import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Terminal,
  GitBranch,
  Layers,
  Repeat,
  Timer,
  Shield,
  Gauge,
  Activity,
  Box,
  Map,
  Network,
  Search
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  JavaScriptLogo,
  ReactLogo,
  VSCodeLogo,
  GitLogo,
  JWTLogo,
  PostmanLogo
} from "@/components/TechLogos";
import {
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiGithub,
  SiApachemaven,
  SiIntellijidea,
  SiEclipseide,
  SiHtml5,
  SiCss,
  SiTailwindcss
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
  {
    category: "Programming Languages",
    icon: <Code2 className="w-6 h-6" />,
    items: [
      { name: "Java", icon: <FaJava className="w-5 h-5 text-blue-400" /> },
      { name: "Python", icon: <Code2 className="w-5 h-5 text-yellow-400" /> },
      { name: "JavaScript", icon: <JavaScriptLogo /> },
      { name: "SQL", icon: <Database className="w-5 h-5 text-gray-400" /> },
      { name: "C", icon: <Code2 className="w-5 h-5 text-blue-500" /> },
    ],
  },
  {
    category: "AI & LLM",
    icon: <Activity className="w-6 h-6" />,
    items: [
      { name: "LangChain", icon: <Terminal className="w-5 h-5 text-green-400" /> },
      { name: "LangGraph", icon: <Network className="w-5 h-5 text-blue-400" /> },
      { name: "RAG Pipelines", icon: <Layers className="w-5 h-5 text-purple-400" /> },
      { name: "Prompt Engineering", icon: <Terminal className="w-5 h-5 text-gray-300" /> },
      { name: "MCP", icon: <Network className="w-5 h-5 text-purple-300" /> },
      { name: "HuggingFace", icon: <Activity className="w-5 h-5 text-yellow-400" /> },
      { name: "N8N", icon: <Network className="w-5 h-5 text-orange-400" /> },
    ],
  },
  {
    category: "Web & Backend Development",
    icon: <Server className="w-6 h-6" />,
    items: [
      { name: "Node.js", icon: <Server className="w-5 h-5 text-green-500" /> },
      { name: "Express.js", icon: <Server className="w-5 h-5 text-gray-300" /> },
      { name: "FastAPI", icon: <Terminal className="w-5 h-5 text-teal-400" /> },
      { name: "React.js", icon: <ReactLogo /> },
      { name: "REST APIs", icon: <Network className="w-5 h-5 text-blue-300" /> },
    ],
  },
  {
    category: "Frontend Development",
    icon: <Layout className="w-6 h-6" />,
    items: [
      { name: "React.js", icon: <ReactLogo /> },
      { name: "HTML", icon: <SiHtml5 className="w-5 h-5 text-orange-500" /> },
      { name: "CSS", icon: <SiCss className="w-5 h-5 text-blue-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5 text-teal-400" /> },
    ],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6" />,
    items: [
      { name: "MongoDB", icon: <Database className="w-5 h-5 text-green-500" /> },
      { name: "MySQL", icon: <SiMysql className="w-5 h-5 text-blue-500" /> },
      { name: "Neo4j", icon: <Network className="w-5 h-5 text-blue-400" /> },
    ],
  },
  {
    category: "Cloud (AWS)",
    icon: <Cloud className="w-6 h-6" />,
    items: [
      { name: "EC2", icon: <Server className="w-5 h-5 text-orange-500" /> },
      { name: "S3", icon: <Database className="w-5 h-5 text-red-500" /> },
      { name: "RDS", icon: <Database className="w-5 h-5 text-blue-500" /> },
      { name: "IAM", icon: <Shield className="w-5 h-5 text-gray-400" /> },
      { name: "Bedrock", icon: <Activity className="w-5 h-5 text-purple-500" /> },
    ],
  },
  {
    category: "Developer Tools",
    icon: <GitBranch className="w-6 h-6" />,
    items: [
      { name: "Git", icon: <GitLogo /> },
      { name: "GitHub", icon: <SiGithub className="w-5 h-5 text-white" /> },
      { name: "Postman", icon: <PostmanLogo /> },
      { name: "GitHub Copilot", icon: <Code2 className="w-5 h-5 text-blue-400" /> },
      { name: "Cursor", icon: <Layout className="w-5 h-5 text-gray-300" /> },
    ],
  },
  {
    category: "Relevant Coursework",
    icon: <Layers className="w-6 h-6" />,
    items: [
      { name: "DSA", icon: <Database className="w-5 h-5 text-gray-400" /> },
      { name: "DBMS", icon: <Database className="w-5 h-5 text-blue-400" /> },
      { name: "Machine Learning", icon: <Activity className="w-5 h-5 text-yellow-400" /> },
      { name: "NLP", icon: <Network className="w-5 h-5 text-green-400" /> },
      { name: "Deep Learning", icon: <Activity className="w-5 h-5 text-purple-400" /> },
      { name: "Software Engineering", icon: <Layout className="w-5 h-5 text-orange-400" /> },
    ],
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Technical Skills
        </h2>
      </ScrollAnimation>

      <ScrollAnimation>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Technologies and engineering concepts I use to build scalable, secure, and resilient software systems.
        </p>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <ScrollAnimation key={skillGroup.category}>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-gray-700/50 px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all group border border-white/5"
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300 flex items-center">
                      {skill.icon}
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Skills;
