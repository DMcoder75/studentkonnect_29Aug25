import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { HelpCircle, Calendar, Mail, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function FAQPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const faqCategories = [
    {
      title: "General/Overview",
      color: "bg-blue-100 text-blue-700 border-blue-300",
      questions: [
        {
          id: "q1",
          question: "What is StudentKonnect?",
          answer: "StudentKonnect is a comprehensive online platform that helps students find their dream of studying in global universities across 8 countries. We provide counselor access, university guidance, and support students through every step of their international education journey via our portal."
        },
        {
          id: "q2",
          question: "Who is StudentKonnect for?",
          answer: "StudentKonnect is designed for students who dream of studying abroad in global universities. Whether you're a high school student planning your future, a graduate looking for advanced studies, or anyone interested in international education opportunities across our 8 supported countries, our platform provides the guidance and counselor support you need."
        },
        {
          id: "q3",
          question: "Which countries does StudentKonnect cover?",
          answer: "StudentKonnect covers 8 major study destinations including Australia, USA, UK, Canada, Germany, New Zealand, Ireland, and Netherlands. We provide comprehensive information about universities, admission requirements, and study opportunities in each of these countries."
        }
      ]
    },
    {
      title: "Using the Website",
      color: "bg-green-100 text-green-700 border-green-300",
      questions: [
        {
          id: "q4",
          question: "Is registration required?",
          answer: "You can browse university information and explore our resources without registering. However, creating an account allows you to connect with counselors, save your favorite universities, create personalized study plans, and access our comprehensive application assistance tools."
        },
        {
          id: "q5",
          question: "How do I use StudentKonnect's counselor and university matching tools?",
          answer: "After creating an account, you can browse our counselor directory, filter by specialization and experience, and connect with counselors who match your study goals. Our university matching tools help you explore programs across our 8 supported countries, compare requirements, and get personalized recommendations based on your academic profile."
        },
        {
          id: "q6",
          question: "Is there a cost to use StudentKonnect?",
          answer: "Our core platform features including university browsing, counselor directory access, and basic guidance tools are free for students. Premium counseling services and personalized application assistance may have associated fees, which will be clearly communicated before any commitment."
        }
      ]
    },
    {
      title: "Data, Accuracy, and Pathway Information",
      color: "bg-purple-100 text-purple-700 border-purple-300",
      questions: [
        {
          id: "q7",
          question: "Where does your subject and pathway data come from?",
          answer: "Our data is sourced from official curriculum authorities (e.g., VCAA, NESA, QCAA, SCSA, SACE Board, TASC, ACT BSSS), university admission centres (UAC, VTAC, QTAC, SATAC, TISC), and government information, and is updated regularly for accuracy."
        },
        {
          id: "q8",
          question: "How accurate is your information?",
          answer: "We make every effort to ensure our content is current and accurate; however, some details may change as curriculum or university requirements evolve. Please verify any critical requirements directly with your school, curriculum authority, or preferred university."
        },
        {
          id: "q9",
          question: "Does YourUniPathway.com give individual ATAR predictions or guarantees?",
          answer: "No. While our tools show how subject selections may impact eligibility or typical scaling, we do NOT provide or guarantee individual ATAR or university offer outcomes."
        },
        {
          id: "q10",
          question: "What if my school offers a subject not listed here?",
          answer: "Let us know via our contact form. Some specialist or school-based courses may not appear automatically if they're rare or VET/applied only."
        }
      ]
    },
    {
      title: "Privacy & Security",
      color: "bg-red-100 text-red-700 border-red-300",
      questions: [
        {
          id: "q11",
          question: "What personal information do you collect?",
          answer: "If you register, we collect the minimum information needed to operate your account (typically name, email, year of study, and preferences). We may also gather analytics and session data to improve the service."
        },
        {
          id: "q12",
          question: "How is my data protected?",
          answer: "We use modern security practices and limit access to your personal information. No method of online data storage is 100% secure, but we work hard to prevent unauthorised access."
        },
        {
          id: "q13",
          question: "Will my data be sold or shared?",
          answer: "No. We do NOT sell or rent user data. We only share what's necessary with trusted service providers to run our website or if legally required. Read our Privacy Policy for full details."
        },
        {
          id: "q14",
          question: "Can I access or delete my account/data?",
          answer: "Yes. Email us at contact@yourunipathway.com to request access or deletion of your information, subject to legal/regulatory requirements."
        }
      ]
    },
    {
      title: "Legal & Support",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      questions: [
        {
          id: "q15",
          question: "Does YourUniPathway.com give official academic advice?",
          answer: "No. All information is for general educational purposes only. You must consult your school, curriculum provider, or the universities directly for official advice or decisions about subject selection or applications."
        },
        {
          id: "q16",
          question: "Who owns the website's content?",
          answer: "All original content, guides, and tools on this platform are owned by YourUniPathway.com and/or its licensors. See our Terms of Service for intellectual property details."
        },
        {
          id: "q17",
          question: "What should I do if I find an error or have a complaint?",
          answer: "Please contact support at contact@yourunipathway.com with details. We'll investigate and correct any confirmed issues as quickly as possible."
        },
        {
          id: "q18",
          question: "What laws govern my use of the site?",
          answer: "All use of YourUniPathway.com is subject to Victorian and Australian law. See our Terms of Service for further information."
        }
      ]
    },
    {
      title: "Technical Issues",
      color: "bg-indigo-100 text-indigo-700 border-indigo-300",
      questions: [
        {
          id: "q19",
          question: "I forgot my password. What should I do?",
          answer: "Use the \"Forgot Password\" link on the login page to reset your password. If you don't receive a reset email, check spam/junk folders or contact support."
        },
        {
          id: "q20",
          question: "The website isn't working/displaying properly for me.",
          answer: "Try refreshing your browser, clearing cookies, or using a different browser/device. If problems persist, email us along with your browser/device details for help."
        },
        {
          id: "q21",
          question: "Can I use the site on my phone/tablet?",
          answer: "Yes, YourUniPathway.com is designed to be responsive and accessible on all modern devices."
        }
      ]
    }
  ]

  const additionalQuestions = [
    {
      id: "q22",
      question: "How often is the site updated?",
      answer: "We update subject lists, pathway advice, and requirements regularly as authorities announce curriculum, scaling, or university changes."
    },
    {
      id: "q23",
      question: "How do I give feedback or request features?",
      answer: "We welcome feedback! Email contact@yourunipathway.com or use the in-app feedback form."
    },
    {
      id: "q24",
      question: "Is this site affiliated with any curriculum or university authority?",
      answer: "No. We are an independent educational resource and are NOT affiliated with government curriculum authorities, universities, or any school."
    }
  ]

  return (
    <div className="w-full">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-16 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Find answers to common questions about StudentKonnect
            </p>
            <div className="flex items-center justify-center mt-6 space-x-6 text-purple-100">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Last updated: 18-Jul-2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout Starts Here */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {/* Introduction */}
                <div className="mb-8 text-center">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Welcome to our FAQ section! Here you'll find answers to the most common questions about StudentKonnect. 
                    If you can't find what you're looking for, feel free to <a href="mailto:contact@studentkonnect.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"><Mail className="h-4 w-4 mr-1" />contact our support team</a>.
                  </p>
                </div>

                {/* FAQ Categories */}
                {faqCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-8">
                    <div className="flex items-center mb-6">
                      <Badge variant="outline" className={`mr-3 px-3 py-1 text-sm font-semibold ${category.color}`}>
                        {categoryIndex + 1}
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq) => (
                        <Collapsible key={faq.id} open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                            {openItems[faq.id] ? (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-4 py-3 text-gray-700 leading-relaxed bg-white border-l-4 border-gray-200 ml-4">
                            {faq.answer.includes('contact@yourunipathway.com') ? (
                              <span>
                                {faq.answer.split('contact@yourunipathway.com').map((part, index, array) => (
                                  <span key={index}>
                                    {part}
                                    {index < array.length - 1 && (
                                      <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center">
                                        <Mail className="h-4 w-4 mr-1" />
                                        contact@yourunipathway.com
                                      </a>
                                    )}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              faq.answer
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Additional Questions */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-teal-100 text-teal-700 border-teal-300">
                      More
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Additional Questions</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {additionalQuestions.map((faq) => (
                      <Collapsible key={faq.id} open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                          {openItems[faq.id] ? (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-3 text-gray-700 leading-relaxed bg-white border-l-4 border-gray-200 ml-4">
                          {faq.answer.includes('contact@yourunipathway.com') ? (
                            <span>
                              {faq.answer.split('contact@yourunipathway.com').map((part, index, array) => (
                                <span key={index}>
                                  {part}
                                  {index < array.length - 1 && (
                                    <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center">
                                      <Mail className="h-4 w-4 mr-1" />
                                      contact@yourunipathway.com
                                    </a>
                                  )}
                                </span>
                              ))}
                            </span>
                          ) : (
                            faq.answer
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Didn't find your answer?
                  </h3>
                  <p className="text-orange-700 mb-4">
                    Our support team is here to help! Contact us with any questions or concerns.
                  </p>
                  <a 
                    href="mailto:contact@yourunipathway.com" 
                    className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support Team
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

