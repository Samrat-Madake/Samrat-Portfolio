import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { Award, Trophy, Code } from "lucide-react";

import img1 from "@/assets/achievment/1.jpeg";
import img2 from "@/assets/achievment/2.jpeg";
import img3 from "@/assets/achievment/3.jpg";

import compImg1 from "@/assets/coding comp/1.jpeg";
import compImg2 from "@/assets/coding comp/2.jpeg";
import compImg3 from "@/assets/coding comp/3.jpeg";

const hackathons = [
    {
    id: 1,
    title: "Top 5 out of 5,500+ teams at the Cognizant Technoverse Hackathon: May 2026",
    image: img3,
    description: "MedGraph AI HIPAA-Compliant Healthcare Interoperability Platform Developed an AI-powered healthcare platform for consent-based patient record sharing across providers, addressing fragmented EHR data.",
  },
  {
    id: 2,
    title: "Winner in the Blockchain Domain at Hackathon held at TSEC Mumbai",
    image: img1,
    description: "Used n8n workflow automation to streamline backend processes and automate key project tasks.",
  },
  {
    id: 3,
    title: "Runner-up in Hackathon held at SKN COE, Pandharpur",
    image: img2,
    description: "Made a platform for municipal corporation to solve the problem of waste management",
  }

];

const competitions = [
  {
    id: 1,
    title: "Winner at Coding Competition by CSBS dept",
    image: compImg1,
    description: "45 min : 10 MCQ on CORE subject + 5 DSA questions",
  },
  {
    id: 2,
    title: "Winner at Coding Competition by Sanjay ghodawat college",
    image: compImg2,
    description: "2 Round of DSA questions",
  },
  {
    id: 3,
    title: "Winner at Project Presentaion at sanjeeven college kolhapur",
    image: compImg3,
    description: "Project Presentaion",
  }
];

const Certificates = () => {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Award className="w-8 h-8" />
          <h2 className="text-4xl font-bold gradient-text">Achievements</h2>
        </motion.div>
      </ScrollAnimation>

      {/* Hackathons Section */}
      <ScrollAnimation>
        <div className="flex items-center gap-2 mb-8 mt-12">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-bold">Hackathons</h3>
        </div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {hackathons.map((cert) => (
          <ScrollAnimation key={`hackathon-${cert.id}`}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5 h-full flex flex-col">
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-4">{cert.title}</h3>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{cert.description}</p>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Coding Competitions Section */}
      <ScrollAnimation>
        <div className="flex items-center gap-2 mb-8 mt-12">
          <Code className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold">Coding Competitions & Presentations</h3>
        </div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((cert) => (
          <ScrollAnimation key={`comp-${cert.id}`}>
            <div className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5 h-full flex flex-col">
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-4">{cert.title}</h3>
                <p className="text-gray-300 text-sm">{cert.description}</p>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>

    </div>
  );
};

export default Certificates;
