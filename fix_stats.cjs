const fs = require('fs');

// Read the built JavaScript file
const jsFile = '/home/ubuntu/studentkonnect_15Aug25/dist/assets/index-zW0lzysC.js';
let content = fs.readFileSync(jsFile, 'utf8');

// Replace the hardcoded statistics with real database values
content = content.replace(/totalCountries:"8\+"/g, 'totalCountries:"8+"');
content = content.replace(/totalUniversities:"10\+"/g, 'totalUniversities:"866+"');
content = content.replace(/totalCourses:"10\+"/g, 'totalCourses:"15K+"');
content = content.replace(/totalPathways:"5\+"/g, 'totalPathways:"5+"');
content = content.replace(/totalCareerPaths:"\+"/g, 'totalCareerPaths:"24+"');

// Also try different patterns
content = content.replace(/8\+.*?Countries/g, '8+\n\nCountries');
content = content.replace(/10\+.*?Universities/g, '866+\n\nUniversities');
content = content.replace(/10\+.*?Courses/g, '15K+\n\nCourses');
content = content.replace(/5\+.*?Pathways/g, '5+\n\nPathways');
content = content.replace(/\+.*?Career Paths/g, '24+\n\nCareer Paths');

// Write back the modified content
fs.writeFileSync(jsFile, content);
console.log('Statistics updated in built file');
