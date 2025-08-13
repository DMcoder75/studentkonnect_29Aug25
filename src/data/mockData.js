// Mock data for StudentKonnect platform
export const mockData = {
  countries: [
    { country_id: 1, country_name: "United States of America", country_code: "US" },
    { country_id: 2, country_name: "United Kingdom", country_code: "UK" },
    { country_id: 3, country_name: "Singapore", country_code: "SG" },
    { country_id: 4, country_name: "Ukraine", country_code: "UA" },
    { country_id: 5, country_name: "Canada", country_code: "CA" },
    { country_id: 6, country_name: "Germany", country_code: "DE" },
    { country_id: 7, country_name: "Ireland", country_code: "IE" },
    { country_id: 8, country_name: "Australia", country_code: "AU" }
  ],
  
  universities: [
    {
      university_id: 1,
      university_name: "Harvard University",
      city: "Cambridge",
      state_province: "Massachusetts",
      country_id: 1,
      country_name: "United States of America",
      country_code: "US",
      university_type: "Private Research University",
      ranking: 1,
      student_count: 23000,
      established_year: 1636,
      programs_count: 350,
      official_member: "Yes"
    },
    {
      university_id: 2,
      university_name: "Stanford University",
      city: "Stanford",
      state_province: "California",
      country_id: 1,
      country_name: "United States of America",
      country_code: "US",
      university_type: "Private Research University",
      ranking: 2,
      student_count: 17000,
      established_year: 1885,
      programs_count: 300,
      official_member: "Yes"
    },
    {
      university_id: 3,
      university_name: "Massachusetts Institute of Technology",
      city: "Cambridge",
      state_province: "Massachusetts",
      country_id: 1,
      country_name: "United States of America",
      country_code: "US",
      university_type: "Private Research University",
      ranking: 3,
      student_count: 11000,
      established_year: 1861,
      programs_count: 280,
      official_member: "Yes"
    },
    {
      university_id: 4,
      university_name: "University of Oxford",
      city: "Oxford",
      state_province: "England",
      country_id: 2,
      country_name: "United Kingdom",
      country_code: "UK",
      university_type: "Public Research University",
      ranking: 1,
      student_count: 24000,
      established_year: 1096,
      programs_count: 400,
      official_member: "Yes"
    },
    {
      university_id: 5,
      university_name: "University of Cambridge",
      city: "Cambridge",
      state_province: "England",
      country_id: 2,
      country_name: "United Kingdom",
      country_code: "UK",
      university_type: "Public Research University",
      ranking: 2,
      student_count: 23000,
      established_year: 1209,
      programs_count: 380,
      official_member: "Yes"
    },
    {
      university_id: 6,
      university_name: "Imperial College London",
      city: "London",
      state_province: "England",
      country_id: 2,
      country_name: "United Kingdom",
      country_code: "UK",
      university_type: "Public Research University",
      ranking: 3,
      student_count: 19000,
      established_year: 1907,
      programs_count: 200,
      official_member: "Yes"
    },
    {
      university_id: 7,
      university_name: "National University of Singapore",
      city: "Singapore",
      state_province: "Singapore",
      country_id: 3,
      country_name: "Singapore",
      country_code: "SG",
      university_type: "Public Research University",
      ranking: 1,
      student_count: 38000,
      established_year: 1905,
      programs_count: 250,
      official_member: "Yes"
    },
    {
      university_id: 8,
      university_name: "University of Toronto",
      city: "Toronto",
      state_province: "Ontario",
      country_id: 5,
      country_name: "Canada",
      country_code: "CA",
      university_type: "Public Research University",
      ranking: 1,
      student_count: 97000,
      established_year: 1827,
      programs_count: 700,
      official_member: "Yes"
    },
    {
      university_id: 9,
      university_name: "University of British Columbia",
      city: "Vancouver",
      state_province: "British Columbia",
      country_id: 5,
      country_name: "Canada",
      country_code: "CA",
      university_type: "Public Research University",
      ranking: 2,
      student_count: 66000,
      established_year: 1908,
      programs_count: 500,
      official_member: "Yes"
    },
    {
      university_id: 10,
      university_name: "Technical University of Munich",
      city: "Munich",
      state_province: "Bavaria",
      country_id: 6,
      country_name: "Germany",
      country_code: "DE",
      university_type: "Public Research University",
      ranking: 1,
      student_count: 45000,
      established_year: 1868,
      programs_count: 180,
      official_member: "Yes"
    }
  ],
  
  courses: [
    {
      course_id: 1,
      program_name: "Computer Science",
      university_id: 1,
      university_name: "Harvard University",
      degree_level: "Bachelor",
      duration: "4 years",
      tuition_fee: 54000,
      country_name: "United States of America",
      city: "Cambridge",
      state_province: "Massachusetts"
    },
    {
      course_id: 2,
      program_name: "Medicine",
      university_id: 1,
      university_name: "Harvard University",
      degree_level: "Doctor",
      duration: "4 years",
      tuition_fee: 65000,
      country_name: "United States of America",
      city: "Cambridge",
      state_province: "Massachusetts"
    },
    {
      course_id: 3,
      program_name: "Engineering",
      university_id: 2,
      university_name: "Stanford University",
      degree_level: "Bachelor",
      duration: "4 years",
      tuition_fee: 56000,
      country_name: "United States of America",
      city: "Stanford",
      state_province: "California"
    },
    {
      course_id: 4,
      program_name: "Business Administration",
      university_id: 2,
      university_name: "Stanford University",
      degree_level: "Master",
      duration: "2 years",
      tuition_fee: 75000,
      country_name: "United States of America",
      city: "Stanford",
      state_province: "California"
    },
    {
      course_id: 5,
      program_name: "Artificial Intelligence",
      university_id: 3,
      university_name: "Massachusetts Institute of Technology",
      degree_level: "Master",
      duration: "2 years",
      tuition_fee: 58000,
      country_name: "United States of America",
      city: "Cambridge",
      state_province: "Massachusetts"
    },
    {
      course_id: 6,
      program_name: "Philosophy, Politics and Economics",
      university_id: 4,
      university_name: "University of Oxford",
      degree_level: "Bachelor",
      duration: "3 years",
      tuition_fee: 45000,
      country_name: "United Kingdom",
      city: "Oxford",
      state_province: "England"
    },
    {
      course_id: 7,
      program_name: "Natural Sciences",
      university_id: 5,
      university_name: "University of Cambridge",
      degree_level: "Bachelor",
      duration: "3 years",
      tuition_fee: 42000,
      country_name: "United Kingdom",
      city: "Cambridge",
      state_province: "England"
    },
    {
      course_id: 8,
      program_name: "Medicine",
      university_id: 6,
      university_name: "Imperial College London",
      degree_level: "Bachelor",
      duration: "6 years",
      tuition_fee: 48000,
      country_name: "United Kingdom",
      city: "London",
      state_province: "England"
    },
    {
      course_id: 9,
      program_name: "Computer Engineering",
      university_id: 7,
      university_name: "National University of Singapore",
      degree_level: "Bachelor",
      duration: "4 years",
      tuition_fee: 35000,
      country_name: "Singapore",
      city: "Singapore",
      state_province: "Singapore"
    },
    {
      course_id: 10,
      program_name: "Medicine",
      university_id: 8,
      university_name: "University of Toronto",
      degree_level: "Doctor",
      duration: "4 years",
      tuition_fee: 45000,
      country_name: "Canada",
      city: "Toronto",
      state_province: "Ontario"
    }
  ],
  
  pathways: [
    {
      pathway_id: 1,
      pathway_name: "Technology Career Path",
      description: "Software Engineering and Computer Science careers",
      category: "Technology"
    },
    {
      pathway_id: 2,
      pathway_name: "Medical Career Path",
      description: "Healthcare and Medical careers",
      category: "Healthcare"
    },
    {
      pathway_id: 3,
      pathway_name: "Business Career Path",
      description: "Business Administration and Management careers",
      category: "Business"
    },
    {
      pathway_id: 4,
      pathway_name: "Engineering Career Path",
      description: "Various Engineering disciplines and careers",
      category: "Engineering"
    },
    {
      pathway_id: 5,
      pathway_name: "Research Career Path",
      description: "Academic and Scientific Research careers",
      category: "Research"
    }
  ]
};

export default mockData;

