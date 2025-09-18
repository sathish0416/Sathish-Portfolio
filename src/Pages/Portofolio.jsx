import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Award, Boxes, Code2, FolderGit2 } from "lucide-react";
import Projects from "../components/Projects";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className="relative"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }} className="relative z-10">
          <div className="space-y-6 relative">{children}</div>
          {index === 0 && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014] pointer-events-none z-20 h-20 -bottom-20" />
          )}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks - Using skillicons.dev for beautiful colored icons
const techStacks = [
  // Frontend Technologies
  { language: "HTML" },
  { language: "CSS" },
  { language: "JavaScript" },
  { language: "Tailwind CSS" },
  { language: "ReactJS" },
  { language: "Bootstrap" },
  { language: "Vite" },
  
  // Backend Technologies
  { language: "NodeJS" },
  { language: "ExpressJS" },
  { language: "PHP" },
  
  // Programming Languages
  { language: "Python" },
  { language: "Java" },
  { language: "C" },
  { language: "C++" },
  
  // Mobile Development
  { language: "Flutter" },
  { language: "Dart" },
  
  // Databases
  { language: "MongoDB" },
  { language: "MySQL" },
  
  // Cloud & Services
  { language: "AWS" },
  { language: "Firebase" },
];

export default function FullWidthTabs() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        mass: 0.8
      }
    }
  };
  
  // Scroll animation function
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const projectCards = document.querySelectorAll('.sticky-container > div');
    
    projectCards.forEach((card, index) => {
      const offset = scrollY - (index * 60);
      if (offset > 0) {
        // Apply transform to create stacking effect
        card.style.transform = `translateY(${Math.min(offset * 0.1, 30)}px) scale(${Math.max(1 - offset * 0.0005, 0.95)})`;
      } else {
        card.style.transform = 'translateY(0) scale(1)';
      }
    });
  };
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-out-cubic',
      delay: 100,
    });
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order('id', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    }
    fetchProjects();
    
    // Add scroll event listener for project card animations
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    async function fetchCertificates() {
      try {
        console.log('Fetching certificates...');
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("id", { ascending: true });

        console.log('Supabase response:', { data, error });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data || data.length === 0) {
          console.log('No certificates found in the response');
        }

        console.log('Setting certificates:', data);
        setCertificates(data || []);
      } catch (err) {
        console.error('Error in fetchCertificates:', err);
        console.error('Error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
      }
    }
    fetchCertificates();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%", mt: 4 }}>
        {/* AppBar and Tabs section - unchanged */}
        <Box
          sx={{
            bgcolor: "transparent",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            border: 0,
            boxShadow: "none",
            "& .MuiTabs-root": {
              borderBottom: 0,
              minHeight: "unset",
              boxShadow: "none"
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
              border: 0
            }
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              borderBottom: 0,
              '& .MuiTabs-root': {
                borderBottom: 0,
              },
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<FolderGit2 className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={`Projects (${projects.length})`}
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={(index) => setValue(index)}
          style={{ padding: '1rem 0' }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-gradient-to-r from-[#2A0E61] to-[#7B4DFF] blur-[120px] rounded-full w-[500px] h-[500px] -z-10 opacity-30"></div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container mx-auto relative pb-20 flex flex-col px-4 max-w-3xl overflow-visible"
              style={{ height: 'auto' }}
            >
              <div className="sticky-container" style={{ position: 'relative', height: projects.length > 0 ? `${projects.length * 400}px` : 'auto' }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    className="w-full transition-all duration-500"
                    style={{
                      position: 'sticky',
                      top: `${index * 60}px`,
                      zIndex: projects.length - index,
                      marginBottom: '20px'
                    }}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <CardProject
                      id={project.id}
                      Title={project.title}
                      Description={project.description}
                      Img={project.thumbnail_url || '/placeholder-project.jpg'}
                      tech_stack={project.tech_stack}
                      github_url={project.github_url}
                      Link={project.live_url}
                    />
                  </motion.div>
                ))}
              {projects.length === 0 && (
                  <div className="text-center py-20 text-gray-500">
                    <Code2 className="w-10 h-10 mx-auto mb-4 opacity-50" />
                    <p>No projects available yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate
                      ImgSertif={certificate.Img}
                      Title={certificate.Title}
                      Issuer={certificate.Issuer}
                      Date={certificate.Date}
                      Type={certificate.Type}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-6 p-4">
              {techStacks.map((tech, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="500"
                  data-aos-delay={index * 50}
                >
                  <TechStackIcon Language={tech.language} />
                </div>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}