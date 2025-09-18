import React from 'react';
import PropTypes from 'prop-types';
import { Github, ExternalLink } from 'lucide-react';

const CardProject = ({ Title, Description, Link: ProjectLink, github_url, tech_stack, id }) => {
  
  const handleLinkClick = (e, link, message) => {
    if (!link) {
      console.log(message);
      e.preventDefault();
      alert(message);
    }
  };

  return (
    <div className="group relative w-full mb-8 scroll-mt-6" id={`project-${id}`}>
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-[#4F2B89]/50 border-0 outline-0 bg-[#0F0F2A]">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3A1E91]/30 via-[#5F3B99]/20 to-[#8B5FFF]/30 opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="relative p-6 z-20 text-center">
          <h3 className="text-2xl font-bold text-white group-hover:text-[#b79dff] transition-all duration-300 transform group-hover:translate-y-[-2px]">
            {Title}
          </h3>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {/* Process tech stack items */}
            {(() => {
              if (!tech_stack) return null;
              
              const techItems = tech_stack.split(',');
              const result = [];
              let bracketGroup = [];
              let inBracket = false;
              let bracketContent = '';
              
              // Process each tech item
              techItems.forEach((tech, idx) => {
                const trimmedTech = tech.trim();
                
                // Check if this item contains an opening bracket
                if (trimmedTech.includes('(') && !inBracket) {
                  inBracket = true;
                  bracketContent = trimmedTech;
                  
                  // If there's a closing bracket in the same item
                  if (trimmedTech.includes(')')) {
                    result.push(
                      <span key={`bracket-${idx}`} className="px-3 py-1.5 text-xs font-medium bg-[#2A0E61]/50 text-[#9d71ff] rounded-md hover:bg-[#2A0E61]/70 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-[#7B4DFF]/20">
                        {trimmedTech}
                      </span>
                    );
                    inBracket = false;
                    bracketContent = '';
                  }
                }
                // If we're inside a bracket and this item contains the closing bracket
                else if (inBracket && trimmedTech.includes(')')) {
                  bracketContent += ', ' + trimmedTech;
                  result.push(
                    <span key={`bracket-${idx}`} className="px-3 py-1.5 text-xs font-medium bg-[#2A0E61]/50 text-[#9d71ff] rounded-md hover:bg-[#2A0E61]/70 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-[#7B4DFF]/20">
                      {bracketContent}
                    </span>
                  );
                  inBracket = false;
                  bracketContent = '';
                }
                // If we're inside a bracket but this item doesn't have the closing bracket
                else if (inBracket) {
                  bracketContent += ', ' + trimmedTech;
                }
                // Regular tech stack item
                else if (trimmedTech !== '') {
                  result.push(
                    <span key={`tech-${idx}`} className="px-2 py-1 text-xs font-medium bg-[#2A0E61]/50 text-[#9d71ff] rounded-md hover:bg-[#2A0E61]/70 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-[#7B4DFF]/20">
                      {trimmedTech}
                    </span>
                  );
                }
              });
              
              return result;
            })()}
          </div>

          <p className="text-gray-300/80 text-sm leading-relaxed mt-4 group-hover:text-white/90 transition-all duration-300">
            {Description}
          </p>

          <div className="pt-6 flex items-center justify-center gap-4">
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${Title} on GitHub`}
                title={`View ${Title} on GitHub`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#2A0E61]/50 hover:bg-[#2A0E61]/70 text-[#9d71ff] transition-all duration-300 hover:translate-y-[-2px] hover:scale-105 active:scale-95 group"
                onClick={(e) => handleLinkClick(e, github_url, "GitHub link is not available")}
              >
                <Github className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            )}
            {ProjectLink && (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${Title} live demo`}
                  title={`View ${Title} live demo`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#2A0E61]/50 hover:bg-[#2A0E61]/70 text-[#9d71ff] transition-all duration-300 hover:translate-y-[-2px] hover:scale-105 active:scale-95 group"
                  onClick={(e) => handleLinkClick(e, ProjectLink, "Live demo is not available")}
                >
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Link: PropTypes.string,
  github_url: PropTypes.string,
  tech_stack: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CardProject.defaultProps = {
  Link: '',
  github_url: '',
  tech_stack: '',
  id: null,
};

export default CardProject;
