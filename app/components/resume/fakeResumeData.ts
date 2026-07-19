import { ResumeData } from "./types";

export const fakeResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "github.com/alexj",
    summary: "Passionate and results-driven Software Engineer with over 8 years of experience in designing and developing scalable web applications. Proven ability to lead cross-functional teams, optimize performance, and deliver high-quality software solutions on time.",
  },
  experience: [
    {
      id: "exp1",
      company: "TechNova Solutions",
      position: "Senior Full Stack Developer",
      startDate: "2020-03",
      endDate: "",
      current: true,
      description: "- Architected and deployed a microservices-based web platform, reducing latency by 40%.\n- Mentored a team of 5 junior developers, improving code quality and team velocity.\n- Spearheaded the migration from a monolithic architecture to Dockerized microservices.",
    },
    {
      id: "exp2",
      company: "InnovateTech",
      position: "Software Engineer",
      startDate: "2016-06",
      endDate: "2020-02",
      current: false,
      description: "- Developed and maintained multiple React-based single page applications.\n- Integrated RESTful APIs and optimized database queries in PostgreSQL.\n- Collaborated with UX designers to implement responsive, accessible user interfaces.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2012-08",
      endDate: "2016-05",
      current: false,
      description: "Graduated with Honors. Focus on Software Engineering and Algorithms.",
    },
  ],
  skills: [
    { id: "s1", name: "TypeScript", level: "Expert" },
    { id: "s2", name: "React / Next.js", level: "Expert" },
    { id: "s3", name: "Node.js", level: "Intermediate" },
    { id: "s4", name: "Python", level: "Intermediate" },
    { id: "s5", name: "AWS", level: "Intermediate" },
    { id: "s6", name: "Docker & CI/CD", level: "Intermediate" },
  ],
  projects: [
    {
      id: "p1",
      name: "E-Commerce Micro-Frontend",
      url: "ecommerce-demo.example.com",
      description: "- Built a modular micro-frontend architecture using Webpack Module Federation.\n- Improved page load times by 2 seconds globally.",
    },
    {
      id: "p2",
      name: "Open Source UI Library",
      url: "github.com/alexj/ui-lib",
      description: "- Created and published an accessible React UI component library used by 10k+ developers.\n- Achieved 100% test coverage using Jest and Testing Library.",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      id: "2",
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2022",
    },
  ],
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "Native",
    },
    {
      id: "2",
      name: "Spanish",
      proficiency: "Fluent",
    },
    {
      id: "3",
      name: "French",
      proficiency: "Intermediate",
    },
  ],
};
