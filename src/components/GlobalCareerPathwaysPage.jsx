import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, Search, Filter, Globe, DollarSign, Users, MapPin, BookOpen } from 'lucide-react'
import Sidebar from './Sidebar'
import { globalEducationService } from '../services/globalEducationService'

export default function GlobalCareerPathwaysPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [pathways, setPathways] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch countries and career pathways from global database
        const [countriesResult] = await Promise.all([
          globalEducationService.getAllCountries()
        ])

        if (countriesResult.data) {
          setCountries(countriesResult.data)
        }

        // Sample global career pathways data
        const globalPathways = [
          {
            id: 1,
            title: "Software Engineering",
            category: "Technology",
            description: "Design and develop software applications, systems, and platforms using various programming languages and technologies.",
            countries: ["United States", "Canada", "United Kingdom", "Germany", "Australia", "Singapore"],
            averageSalary: {
              "United States": "$120,000",
              "Canada": "$85,000",
              "United Kingdom": "£65,000",
              "Germany": "€70,000",
              "Australia": "A$95,000",
              "Singapore": "S$90,000"
            },
            growthRate: "+22%",
            jobTitles: ["Software Developer", "Full Stack Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer"],
            requiredEducation: "Bachelor's in Computer Science or related field",
            topUniversities: ["MIT", "Stanford", "University of Cambridge", "ETH Zurich", "University of Melbourne", "NUS"],
            skills: ["Programming", "Problem Solving", "System Design", "Database Management"]
          },
          {
            id: 2,
            title: "Data Science & Analytics",
            category: "Technology",
            description: "Extract insights from large datasets using statistical analysis, machine learning, and data visualization techniques.",
            countries: ["United States", "United Kingdom", "Canada", "Netherlands", "Switzerland", "Australia"],
            averageSalary: {
              "United States": "$130,000",
              "United Kingdom": "£70,000",
              "Canada": "$90,000",
              "Netherlands": "€75,000",
              "Switzerland": "CHF 110,000",
              "Australia": "A$100,000"
            },
            growthRate: "+31%",
            jobTitles: ["Data Scientist", "Machine Learning Engineer", "Data Analyst", "Business Intelligence Analyst"],
            requiredEducation: "Bachelor's/Master's in Data Science, Statistics, or Computer Science",
            topUniversities: ["Harvard", "Oxford", "University of Toronto", "University of Amsterdam", "ETH Zurich", "ANU"],
            skills: ["Python/R", "Machine Learning", "Statistics", "Data Visualization"]
          },
          {
            id: 3,
            title: "Medicine & Healthcare",
            category: "Healthcare",
            description: "Provide medical care, diagnose diseases, and improve patient health outcomes through clinical practice and research.",
            countries: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "Switzerland"],
            averageSalary: {
              "United States": "$200,000",
              "United Kingdom": "£80,000",
              "Canada": "$180,000",
              "Australia": "A$150,000",
              "Germany": "€85,000",
              "Switzerland": "CHF 180,000"
            },
            growthRate: "+7%",
            jobTitles: ["General Practitioner", "Specialist Doctor", "Surgeon", "Pediatrician", "Cardiologist"],
            requiredEducation: "Medical Degree (MBBS/MD) + Residency",
            topUniversities: ["Harvard Medical", "Oxford Medical", "University of Toronto", "University of Melbourne", "Charité Berlin"],
            skills: ["Clinical Skills", "Patient Care", "Medical Knowledge", "Communication"]
          },
          {
            id: 4,
            title: "International Business & Finance",
            category: "Business",
            description: "Manage financial operations, investments, and business strategies in global markets and multinational corporations.",
            countries: ["United States", "United Kingdom", "Singapore", "Switzerland", "Germany", "Canada"],
            averageSalary: {
              "United States": "$110,000",
              "United Kingdom": "£60,000",
              "Singapore": "S$85,000",
              "Switzerland": "CHF 95,000",
              "Germany": "€65,000",
              "Canada": "$80,000"
            },
            growthRate: "+6%",
            jobTitles: ["Financial Analyst", "Investment Banker", "Business Consultant", "Portfolio Manager"],
            requiredEducation: "Bachelor's/MBA in Business, Finance, or Economics",
            topUniversities: ["Wharton", "London Business School", "INSEAD", "University of St. Gallen", "Rotman School"],
            skills: ["Financial Analysis", "Strategic Planning", "Risk Management", "Global Markets"]
          },
          {
            id: 5,
            title: "Engineering (Mechanical/Civil)",
            category: "Engineering",
            description: "Design, build, and maintain infrastructure, machines, and systems that improve society and solve complex problems.",
            countries: ["Germany", "United States", "Canada", "Australia", "United Kingdom", "Netherlands"],
            averageSalary: {
              "Germany": "€68,000",
              "United States": "$85,000",
              "Canada": "$75,000",
              "Australia": "A$85,000",
              "United Kingdom": "£50,000",
              "Netherlands": "€60,000"
            },
            growthRate: "+4%",
            jobTitles: ["Mechanical Engineer", "Civil Engineer", "Project Engineer", "Design Engineer"],
            requiredEducation: "Bachelor's in Engineering + Professional Certification",
            topUniversities: ["TU Munich", "MIT", "University of Waterloo", "University of Melbourne", "Imperial College"],
            skills: ["CAD Design", "Project Management", "Technical Analysis", "Problem Solving"]
          },
          {
            id: 6,
            title: "Digital Marketing & Communications",
            category: "Marketing",
            description: "Create and execute marketing strategies using digital platforms to reach global audiences and drive business growth.",
            countries: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "Netherlands"],
            averageSalary: {
              "United States": "$70,000",
              "United Kingdom": "£45,000",
              "Canada": "$60,000",
              "Australia": "A$70,000",
              "Germany": "€50,000",
              "Netherlands": "€55,000"
            },
            growthRate: "+10%",
            jobTitles: ["Digital Marketing Manager", "Social Media Manager", "Content Strategist", "SEO Specialist"],
            requiredEducation: "Bachelor's in Marketing, Communications, or Business",
            topUniversities: ["Northwestern Kellogg", "London School of Economics", "University of Toronto", "University of Sydney"],
            skills: ["Digital Marketing", "Content Creation", "Analytics", "Social Media"]
          }
        ]

        setPathways(globalPathways)
      } catch (error) {
        console.error('Error fetching global career pathways data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter pathways based on search and filters
  const filteredPathways = pathways.filter(pathway => {
    const matchesSearch = pathway.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pathway.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pathway.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = !selectedCountry || pathway.countries?.includes(selectedCountry)
    const matchesCategory = !selectedCategory || pathway.category === selectedCategory
    
    // Salary range filtering (simplified)
    let matchesSalary = true
    if (selectedSalaryRange) {
      const salaryValues = Object.values(pathway.averageSalary || {})
      const hasHighSalary = salaryValues.some(salary => {
        const numericValue = parseInt(salary.replace(/[^0-9]/g, ''))
        if (selectedSalaryRange === 'high') return numericValue >= 100000
        if (selectedSalaryRange === 'medium') return numericValue >= 50000 && numericValue < 100000
        if (selectedSalaryRange === 'entry') return numericValue < 50000
        return true
      })
      matchesSalary = hasHighSalary
    }

    return matchesSearch && matchesCountry && matchesCategory && matchesSalary
  })

  const uniqueCountries = [...new Set(pathways.flatMap(pathway => pathway.countries || []))].filter(Boolean)
  const uniqueCategories = [...new Set(pathways.map(pathway => pathway.category))].filter(Boolean)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar 
        isOpen={true}
        onClose={() => {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />

      <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
                <TrendingUp className="h-12 w-12 mr-4" />
                Global Career Pathways
              </h1>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                Explore career opportunities across the world's leading economies. Discover salary ranges, growth prospects, and educational requirements for international careers.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-5 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search career pathways..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Countries</SelectItem>
                      {uniqueCountries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {uniqueCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCountry('')
                      setSelectedCategory('')
                      setSelectedSalaryRange('')
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredPathways.length} of {pathways.length} career pathways
              </p>
            </div>

            {/* Pathways Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPathways.map((pathway) => (
                <Card key={pathway.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {pathway.category}
                      </Badge>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-semibold">{pathway.growthRate}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      {pathway.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {pathway.description}
                      </p>
                      
                      {/* Countries */}
                      <div>
                        <div className="flex items-center text-gray-700 text-sm mb-2">
                          <Globe className="h-4 w-4 mr-2" />
                          <span className="font-medium">Available in:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pathway.countries?.slice(0, 4).map((country, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                          {pathway.countries?.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{pathway.countries.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Sample Salaries */}
                      <div>
                        <div className="flex items-center text-gray-700 text-sm mb-2">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span className="font-medium">Sample Salaries:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(pathway.averageSalary || {}).slice(0, 4).map(([country, salary]) => (
                            <div key={country} className="flex justify-between">
                              <span className="text-gray-600">{country}:</span>
                              <span className="font-semibold">{salary}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Job Titles */}
                      <div>
                        <div className="flex items-center text-gray-700 text-sm mb-2">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="font-medium">Job Titles:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pathway.jobTitles?.slice(0, 3).map((title, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Find Programs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPathways.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No career pathways found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

