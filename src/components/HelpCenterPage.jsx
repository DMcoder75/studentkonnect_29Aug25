import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LifeBuoy, Mail, ExternalLink, BookOpen, Users, Shield, Settings, MessageCircle, FileText, AlertCircle } from 'lucide-react'
import Sidebar from './Sidebar'

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <LifeBuoy className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Help Center</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Find answers, guides, and support for your YourUniPathway.com experience
          </p>
          <p className="text-blue-200 mt-4 flex items-center justify-center">
            <FileText className="h-4 w-4 mr-2" />
            Last updated: 18-Jul-2025
          </p>
        </div>
      </div>

      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  Welcome to the YourUniPathway.com Help Center!
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Here you'll find answers to frequently asked questions, how-to guides, and links to our Terms, Privacy Policy, and Support. 
                  Our goal is to provide all information you need for a smooth and secure experience.
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Table of Contents */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    📋 Table of Contents
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <a href="#about" className="text-blue-600 hover:text-blue-800 transition-colors">1. About YourUniPathway.com</a>
                    <a href="#getting-started" className="text-blue-600 hover:text-blue-800 transition-colors">2. Getting Started</a>
                    <a href="#using-website" className="text-blue-600 hover:text-blue-800 transition-colors">3. Using This Website</a>
                    <a href="#subjects-data" className="text-blue-600 hover:text-blue-800 transition-colors">4. Subject Pathways & Data</a>
                    <a href="#accounts-privacy" className="text-blue-600 hover:text-blue-800 transition-colors">5. Accounts, Privacy, and Security</a>
                    <a href="#legal" className="text-blue-600 hover:text-blue-800 transition-colors">6. Legal & Compliance</a>
                    <a href="#tech-support" className="text-blue-600 hover:text-blue-800 transition-colors">7. Technical Support & Troubleshooting</a>
                    <a href="#feedback" className="text-blue-600 hover:text-blue-800 transition-colors">8. Feedback & Contact Us</a>
                    <a href="#key-docs" className="text-blue-600 hover:text-blue-800 transition-colors">9. Key Documents</a>
                    <a href="#help-contact" className="text-blue-600 hover:text-blue-800 transition-colors">10. Still Need Help?</a>
                  </div>
                </div>

                <Separator />

                {/* Section 1: About YourUniPathway.com */}
                <div id="about" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-lg px-3 py-1">1</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">About YourUniPathway.com</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">What is YourUniPathway.com?</h3>
                      <p className="leading-relaxed">
                        YourUniPathway.com is a digital educational platform that helps Australian students and families explore, compare, and plan their senior secondary subject selections and university pathways, with up-to-date information across all major Australian states (HSC, VCE, QCE, SACE, WACE, TASC, NTCET, ACT).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Who is it for?</h3>
                      <p className="leading-relaxed">
                        Year 10–12 students, parents, school counselors, career advisers, mature-age students, and others interested in post-school study pathways.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 2: Getting Started */}
                <div id="getting-started" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-3 py-1">2</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Getting Started</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">How do I start using the platform?</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>Visit the homepage and select your state or territory.</li>
                        <li>Browse subjects, requirements, and pathway tools without registering.</li>
                        <li>Register an account to save your study plan and use personalised features.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Is there a cost?</h3>
                      <p className="leading-relaxed">
                        No, our essential resources and tools are free for all individual users.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 3: Using This Website */}
                <div id="using-website" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-lg px-3 py-1">3</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Using This Website</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Pathway Planning and Subject Comparison</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>Select your state/territory to see the subjects and pathways that apply to you.</li>
                        <li>Search or browse all available subjects by interest area, curriculum code, or university prerequisites.</li>
                        <li>Add subjects to your draft study plan and see how selections affect university eligibility, prerequisite fulfillment, and possible ATAR impact.</li>
                        <li>Compare subjects and pathways across states if you're planning to move or want national context.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Registration & Account Features</h3>
                      <p className="leading-relaxed mb-2">Create a free account to:</p>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>Save/edit your study plan and preferences</li>
                        <li>Bookmark pathways or universities of interest</li>
                        <li>Receive updates if subject prerequisites or policies change</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Accessibility & Devices</h3>
                      <p className="leading-relaxed">
                        The site is designed for use on desktop, tablet, and modern mobile browsers. If you need enhanced accessibility features, please contact us.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 4: Subject Pathways & Data */}
                <div id="subjects-data" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-lg px-3 py-1">4</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Subject Pathways & Data</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Which states and curriculums are covered?</h3>
                      <p className="leading-relaxed">
                        NSW (HSC), VIC (VCE), QLD (QCE), WA (WACE), SA & NT (SACE, NTCET), TAS (TASC), ACT (BSSS/AST).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Source and accuracy of subject data:</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>All subject options, codes, and descriptions are based on current official releases from curriculum authorities (e.g., VCAA, NESA, QCAA, SCSA, SACE, etc.).</li>
                        <li>University admission requirements sourced from state tertiary admission centres and university guides.</li>
                        <li>We update our database regularly, but always recommend you verify with your school and preferred university.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Can I request or suggest a subject?</h3>
                      <p className="leading-relaxed">
                        Yes! Email <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          contact@yourunipathway.com
                        </a> to request an addition if your school offers a subject not listed.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 5: Accounts, Privacy, and Security */}
                <div id="accounts-privacy" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-lg px-3 py-1">5</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Accounts, Privacy, and Security</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">What data do you collect?</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>Name, email, and password (if you register)</li>
                        <li>Subject selections and preferences</li>
                        <li>Usage analytics (anonymised)</li>
                      </ul>
                      <p className="leading-relaxed mt-2">
                        See our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          Privacy Policy
                        </a> for full details.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Is my data safe?</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>We use reasonable security standards and reputable hosting providers to store your data.</li>
                        <li>We won't sell, rent, or trade your personal information and share it only as required to provide our service.</li>
                        <li>Account deletion and data access requests are supported: email <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          contact@yourunipathway.com
                        </a>.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Age and parental consent</h3>
                      <ul className="list-disc list-inside space-y-1 leading-relaxed">
                        <li>The site is intended for users 16 and older.</li>
                        <li>If you're under 16, ask your parent/guardian before registering or have them contact us to remove your information if needed.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 6: Legal & Compliance */}
                <div id="legal" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 text-lg px-3 py-1">6</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Legal & Compliance</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Is this site official or endorsed by curriculum authorities/universities?</h3>
                      <p className="leading-relaxed">
                        No. We are independent and not affiliated with any government curriculum authority, university, or admissions centre.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Are there guarantees about advice or ATAR outcomes?</h3>
                      <p className="leading-relaxed">
                        No. All information serves as a guide only. There are no guarantees of university offers, ATAR scores, or outcomes—please consult your school or preferred institution for official advice.
                      </p>
                      <p className="leading-relaxed mt-2">
                        Please review our <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          Terms of Service
                        </a> for details on liability, copyright, and use.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 7: Technical Support & Troubleshooting */}
                <div id="tech-support" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-lg px-3 py-1">7</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Technical Support & Troubleshooting</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-medium text-gray-800">Common issues and fixes:</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left font-medium">Issue</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-medium">Solution</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Can't log in / forgot password</td>
                            <td className="border border-gray-300 px-4 py-2">Use "Forgot Password" to reset, or email support if needed.</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">Website not displaying properly</td>
                            <td className="border border-gray-300 px-4 py-2">Refresh browser, clear cache/cookies, update browser, or try another device.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Not receiving verification or emails</td>
                            <td className="border border-gray-300 px-4 py-2">Check your spam/junk folders, and whitelist contact@yourunipathway.com.</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">Features not working</td>
                            <td className="border border-gray-300 px-4 py-2">Disable browser extensions, try different device, or report issue to support.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Data not saving</td>
                            <td className="border border-gray-300 px-4 py-2">Ensure you are logged in; refresh and try again; contact support if persistent.</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">Accessibility feature needed</td>
                            <td className="border border-gray-300 px-4 py-2">Contact us at contact@yourunipathway.com.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 8: Feedback & Contact Us */}
                <div id="feedback" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800 text-lg px-3 py-1">8</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Feedback & Contact Us</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <ul className="list-disc list-inside space-y-1 leading-relaxed">
                      <li>Found an error or out-of-date content? Let us know!</li>
                      <li>Feature request? We love feedback and suggestions.</li>
                    </ul>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          <strong>General or support inquiries:</strong>
                          <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 ml-2">
                            contact@yourunipathway.com
                          </a>
                        </p>
                        <p className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-blue-600" />
                          <strong>Business partnerships:</strong>
                          <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 ml-2">
                            contact@yourunipathway.com
                          </a>, mark as "Partnership".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 9: Key Documents */}
                <div id="key-docs" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-lg px-3 py-1">9</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Key Documents</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="/terms-of-service" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <FileText className="h-6 w-6 mr-3 text-blue-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">Terms of Service</h3>
                        <p className="text-sm text-gray-600">Your rights, responsibilities, and site limitations.</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                    
                    <a href="/privacy-policy" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Shield className="h-6 w-6 mr-3 text-green-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">Privacy Policy</h3>
                        <p className="text-sm text-gray-600">What we collect, how we use it, your privacy rights.</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                    
                    <a href="/faq" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <MessageCircle className="h-6 w-6 mr-3 text-purple-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">FAQ</h3>
                        <p className="text-sm text-gray-600">Frequently asked questions and answers.</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Settings className="h-6 w-6 mr-3 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">Accessibility Policy</h3>
                        <p className="text-sm text-gray-600">Contact us for accessibility needs.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Section 10: Still Need Help? */}
                <div id="help-contact" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-lg px-3 py-1">10</Badge>
                    <h2 className="text-2xl font-semibold text-gray-800">Still Need Help?</h2>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Didn't find what you're looking for?</h3>
                    <p className="text-gray-700 mb-4">
                      Please email <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 font-medium">
                        contact@yourunipathway.com
                      </a> and our support team will respond as soon as possible.
                    </p>
                    <a href="mailto:contact@yourunipathway.com" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Mail className="h-5 w-5 mr-2" />
                      Contact Support Team
                    </a>
                  </div>
                </div>

                <Separator />

                {/* Pro Tips */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">💡 Pro Tips</h3>
                  <ul className="list-disc list-inside space-y-2 text-yellow-700">
                    <li>Always verify critical subject prerequisites and career/tertiary entry requirements direct from your intended university/TAFE website.</li>
                    <li>Update your saved plan annually as university requirements can change from year to year.</li>
                    <li>Never share your password or personal login credentials.</li>
                  </ul>
                </div>

                {/* Legal Disclaimer */}
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    📝 Legal Disclaimer
                  </h3>
                  <p className="text-red-700 leading-relaxed">
                    YourUniPathway.com is an independent educational resource. All information provided is for general guidance only. 
                    No liability is accepted for decisions or outcomes arising from its use. For full legal terms and data protections, 
                    please review our <a href="/terms-of-service" className="text-red-800 hover:text-red-900 underline">Terms of Service</a> and <a href="/privacy-policy" className="text-red-800 hover:text-red-900 underline">Privacy Policy</a>.
                  </p>
                </div>

                {/* Urgent Help */}
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-4">Need urgent help on a technical issue?</h3>
                  <p className="text-orange-700 mb-2">
                    Email <a href="mailto:contact@yourunipathway.com" className="text-orange-800 hover:text-orange-900 font-medium">
                      contact@yourunipathway.com
                    </a>
                  </p>
                  <p className="text-orange-700 text-sm">
                    Include: your issue, device type, operating system, browser, and steps to reproduce.
                  </p>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm pt-6 border-t">
                  <p>Updated: 18-Jul-2025</p>
                  <p>YourUniPathway.com | All Rights Reserved.</p>
                </div>

              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

