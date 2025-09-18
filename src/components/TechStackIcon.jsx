import React from 'react';

const TechStackIcon = ({ Language }) => {
  // Map languages to skillicons.dev format
  const getIconName = (language) => {
    const iconMap = {
      'HTML': 'html',
      'CSS': 'css', 
      'JavaScript': 'js',
      'ReactJS': 'react',
      'NodeJS': 'nodejs',
      'ExpressJS': 'express',
      'PHP': 'php',
      'Python': 'python',
      'Java': 'java',
      'C': 'c',
      'C++': 'cpp',
      'Flutter': 'flutter',
      'Dart': 'dart',
      'MongoDB': 'mongodb',
      'MySQL': 'mysql',
      'AWS': 'aws',
      'Firebase': 'firebase',
      'Tailwind CSS': 'tailwind',
      'Bootstrap': 'bootstrap',
      'Vite': 'vite'
    };
    return iconMap[language] || 'js';
  };

  const iconName = getIconName(Language);
  const iconUrl = `https://skillicons.dev/icons?i=${iconName}`;

  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <img 
          src={iconUrl}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 