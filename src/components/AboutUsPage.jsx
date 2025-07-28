import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Lightbulb, Heart, Mail, Building } from 'lucide-react'
import Sidebar from './Sidebar'

export default function AboutUsPage({ isMobileMenuOpen, onMobileMenuClose }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          </div>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
            Empowering Australian students with clarity, support, and confidence for their educational journey
          </p>
        </div>
      </div>

      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-8">
                  
                  {/* Our Mission */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 mr-3">
                        <Target className="h-4 w-4 mr-1" />
                        1
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      At YourUniPathway.com, we believe that every student deserves clarity, support, and confidence as they plan their educational journey. Our mission is to empower Australian secondary students and their families with reliable information, smart planning tools, and clear guidance for subject selection and tertiary admission pathways—no matter where in Australia they study.
                    </p>
                  </section>

                  {/* Who We Are */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800 mr-3">
                        <Users className="h-4 w-4 mr-1" />
                        2
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      YourUniPathway.com is an independent, student-focused platform purpose-built by Australian education experts, technologists, and advisors with deep experience in curriculum, university admission requirements, and digital guidance systems. We are teachers, advisors, graduates, and parents ourselves—committed to improving transparency and access to quality educational information.
                    </p>
                  </section>

                  {/* What We Do */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 mr-3">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        3
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">What We Do</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Unified Curriculum Database:</h3>
                        <p className="text-gray-700">
                          We collect, curate, and update comprehensive information across all major Australian senior secondary systems—HSC (NSW), VCE (VIC), QCE (QLD), SACE/NTCET (SA & NT), WACE (WA), TASC (Tas), and ACT BSSS.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Subject and Pathway Tools:</h3>
                        <p className="text-gray-700">
                          Our interactive tools allow you to explore subjects, design personalized study plans, and see how your choices impact university eligibility and prerequisites.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Up-to-Date Pathway Guidance:</h3>
                        <p className="text-gray-700">
                          We monitor and incorporate curriculum updates and university entrance changes to keep our platform accurate and relevant.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Independent Support:</h3>
                        <p className="text-gray-700">
                          We are not affiliated with any state or national curriculum authority, school, or university. Our sole priority is providing transparent, objective information and helpful advice.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Why Choose Us */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 mr-3">
                        <Heart className="h-4 w-4 mr-1" />
                        4
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">Why Choose Us</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">All-in-One Planning:</h3>
                        <p className="text-gray-700">
                          Research and compare your options in a single, easy-to-use platform, regardless of your state or intended pathway.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">No Sales, No Bias:</h3>
                        <p className="text-gray-700">
                          We don't sell courses, scholarships, or ranks—so our recommendations always put students first.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Data Driven, Human Supported:</h3>
                        <p className="text-gray-700">
                          Our approach blends rigorous data curation with practical, easy-to-understand advice.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Who Uses YourUniPathway.com */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 mr-3">
                        <Building className="h-4 w-4 mr-1" />
                        5
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">Who Uses YourUniPathway.com</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">Secondary students navigating senior subject selection</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">Parents seeking to support their child's educational decisions</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">School counselors and teachers guiding students</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">Mature-age and non-traditional students investigating return-to-study options</p>
                      </div>
                    </div>
                  </section>

                  {/* Get in Touch */}
                  <section>
                    <div className="flex items-center mb-4">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 mr-3">
                        <Mail className="h-4 w-4 mr-1" />
                        6
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        We welcome your feedback, questions, and partnership inquiries!
                      </p>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <strong>General Support & Feedback:</strong> <a href="mailto:contact@yourunipathway.com" className="text-orange-600 hover:text-orange-800 underline">contact@yourunipathway.com</a>
                        </p>
                        <p className="text-gray-700">
                          <strong>Business & Media:</strong> <a href="mailto:contact@yourunipathway.com" className="text-orange-600 hover:text-orange-800 underline">contact@yourunipathway.com</a>
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Closing Statement */}
                  <section className="text-center bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 rounded-lg">
                    <p className="text-lg font-medium text-gray-800 mb-2">
                      Together, let's build a clearer path to your future.
                    </p>
                    <p className="text-xl font-bold text-emerald-700">
                      YourUniPathway.com—Helping every student pave their way with confidence.
                    </p>
                  </section>

                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

