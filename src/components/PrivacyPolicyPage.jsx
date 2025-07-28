import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Calendar, Mail } from 'lucide-react'
import Sidebar from './Sidebar'

export default function PrivacyPolicyPage({ isMobileMenuOpen, onMobileMenuClose }) {
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
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information
            </p>
            <div className="flex items-center justify-center mt-6 space-x-6 text-blue-100">
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
          {/* Privacy Policy Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {/* Introduction */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    YourUniPathway.com ("we", "us", "our", or "the Website") is committed to respecting and safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you access or use our services. By using the Website, you agree to the collection and use of information in accordance with this Policy.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    If you do not agree with any part of this Privacy Policy, you must not use this Website.
                  </p>
                </div>

                {/* Section 1: Information We Collect */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 border-green-300">1</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p><strong>Types of Personal Information:</strong></p>
                    <p>We collect limited personal information from you in order to provide and improve our services, including:</p>
                    
                    <div className="ml-4">
                      <p><strong>Account Information:</strong></p>
                      <p className="ml-4">Name, email address, password, and other contact or profile details you voluntarily provide during registration or profile updates.</p>
                      
                      <p className="mt-4"><strong>Content and Usage Data:</strong></p>
                      <div className="ml-4">
                        <p>• Data you enter into the platform, such as queries, preferences, or feedback.</p>
                        <p>• Information about your use of our site, including pages viewed, links clicked, and actions taken.</p>
                      </div>
                      
                      <p className="mt-4"><strong>Technical Data:</strong></p>
                      <p className="ml-4">Device information (IP address, browser type/version, device identifiers), log information, and usage analytics.</p>
                      
                      <p className="mt-4"><strong>Cookies and Similar Technologies:</strong></p>
                      <p className="ml-4">For analytics, security, and user experience purposes. See Section 5 below.</p>
                      
                      <p className="mt-4"><strong>Other Voluntary Submissions:</strong></p>
                      <p className="ml-4">Data you submit through support channels, contact forms, surveys, or other interactive features.</p>
                    </div>
                    
                    <p className="mt-4">We do not actively collect sensitive personal information (such as health, financial, or government ID data) and request you do not submit such data through the Website.</p>
                  </div>
                </div>

                {/* Section 2: Use of Information */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 border-blue-300">2</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Use of Information</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We process your information only as required to lawfully operate, improve, and secure our services, including:</p>
                    
                    <div className="ml-4">
                      <p><strong>Providing Services:</strong></p>
                      <p className="ml-4">Creating and managing your account, processing your requests, and facilitating your use of the Website's features.</p>
                      
                      <p className="mt-4"><strong>Communication:</strong></p>
                      <p className="ml-4">Responding to your emails, support requests, account problems, technical issues, or providing updates and notifications regarding the Website.</p>
                      
                      <p className="mt-4"><strong>Improvement and Analytics:</strong></p>
                      <p className="ml-4">Analysing usage, monitoring site performance, and enhancing usability, features, and security.</p>
                      
                      <p className="mt-4"><strong>Legal and Compliance:</strong></p>
                      <p className="ml-4">Meeting legal obligations, enforcing our Terms of Service, and preventing misconduct or fraud.</p>
                    </div>
                    
                    <p className="mt-4">We do not sell, rent, or otherwise exchange your personal information with third parties for their own marketing purposes.</p>
                  </div>
                </div>

                {/* Section 3: Disclosure of Information */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-700 border-purple-300">3</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Disclosure of Information</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We treat your data as confidential and strive to prevent unauthorised access or disclosure. However, we may share your information under the following limited circumstances:</p>
                    
                    <div className="ml-4">
                      <p><strong>Service Providers:</strong></p>
                      <p className="ml-4">With trusted vendors who provide hosting, data storage, analytics, software support, security, or other operational functions strictly necessary for delivering the Website to you. These providers are contractually required to use your data only as instructed, maintain strict confidentiality, and comply with privacy standards.</p>
                      
                      <p className="mt-4"><strong>Legal Requirements:</strong></p>
                      <p className="ml-4">If mandated by law, regulation, legal process, court order, or government demand; to protect our rights, property, or safety; or to detect/prevent fraud or misuse of the Website.</p>
                      
                      <p className="mt-4"><strong>Business Transfers:</strong></p>
                      <p className="ml-4">In the unlikely event of a corporate restructuring, merger, acquisition, or sale of company assets, user data may be transferred—subject at all times to the commitments of this Privacy Policy.</p>
                    </div>
                    
                    <p className="mt-4">Your information will not be published or made public except as expressly consented to by you.</p>
                  </div>
                </div>

                {/* Section 4: Data Security */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-red-100 text-red-700 border-red-300">4</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We employ commercially reasonable safeguards—technical, administrative, and physical—to protect your personal data from loss, misuse, unauthorised access, alteration, or disclosure.</p>
                    <p>Security measures may include encryption, access controls, audit logs, and regular review of data handling practices.</p>
                    <p>However, no method of transmission or storage is completely secure. We cannot guarantee or warrant the absolute security of any information you transmit or store via the Website. Any data provided is at your own risk.</p>
                  </div>
                </div>

                {/* Section 5: Cookies & Tracking */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-yellow-100 text-yellow-700 border-yellow-300">5</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Cookies & Tracking</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>The Website uses cookies and similar tracking technologies to:</p>
                    <div className="ml-4">
                      <p>• Facilitate essential site functions (e.g., user sessions)</p>
                      <p>• Enhance and personalise your user experience</p>
                      <p>• Collect aggregate statistical data for analytics (e.g., page usage, error tracking)</p>
                      <p>• Secure your session and help prevent fraud</p>
                    </div>
                    <p>You may refuse or disable cookies via your browser settings. However, please note this may degrade Website performance or certain features/functionality.</p>
                    <p>We may also use third-party analytics services (such as Google Analytics), which use cookies to collect anonymous usage data.</p>
                  </div>
                </div>

                {/* Section 6: Your Rights & Choices */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-indigo-100 text-indigo-700 border-indigo-300">6</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Your Rights & Choices</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Depending on your location and applicable law, you may have rights to:</p>
                    <div className="ml-4">
                      <p><strong>Access:</strong> Request a copy of personal information we hold about you.</p>
                      <p><strong>Correction:</strong> Ask us to update or correct your personal information if it is inaccurate or incomplete.</p>
                      <p><strong>Deletion:</strong> Request that we erase your personal data, subject to certain exceptions (e.g., compliance, fraud prevention, legal archiving).</p>
                      <p><strong>Withdrawal of Consent:</strong> Where you have given consent, you have the right to withdraw it at any time.</p>
                    </div>
                    <p>To exercise these rights, contact us at <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"><Mail className="h-4 w-4 mr-1" />contact@yourunipathway.com</a>. We may need to verify your identity before fulfilling requests and may retain certain data as required by law or for legitimate business purposes.</p>
                  </div>
                </div>

                {/* Section 7: Data Storage & International Processing */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-pink-100 text-pink-700 border-pink-300">7</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Data Storage & International Processing</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Your personal data may be stored or processed on servers located in Australia or in other jurisdictions where our service providers operate.</p>
                    <p>By using our Website, you consent to such transfers, even if those countries may not provide the same legal protection as your jurisdiction. We will ensure, to the extent required by law, that any data shared internationally receives adequate protection.</p>
                  </div>
                </div>

                {/* Section 8: Children's Privacy */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-orange-100 text-orange-700 border-orange-300">8</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Children's Privacy</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>The Website is intended for individuals aged 16 years or older. We do not knowingly collect or solicit personal information from children under 16.</p>
                    <p>If we become aware we have inadvertently collected personal data from a child under 16, we will take steps to promptly delete such information from our records.</p>
                    <p>Parents or guardians who believe their child (under 16) might have provided personal data to us should contact <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"><Mail className="h-4 w-4 mr-1" />contact@yourunipathway.com</a> so we can ensure immediate removal.</p>
                  </div>
                </div>

                {/* Section 9: Retention of Data */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-teal-100 text-teal-700 border-teal-300">9</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Retention of Data</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We retain personal data for as long as reasonably necessary to achieve the purposes stated in this Policy or as required by law, regulation, or legitimate business need (such as dispute resolution, audit, or enforcing agreements).</p>
                    <p>When no longer required, we will securely destroy or anonymise the data.</p>
                  </div>
                </div>

                {/* Section 10: Third-Party Links & External Sites */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-cyan-100 text-cyan-700 border-cyan-300">10</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Third-Party Links & External Sites</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>The Website may contain links to third-party sites or resources. We are not responsible for the privacy practices, content, or security of such third-party websites. We encourage you to read their privacy policies separately before disclosing any personal information.</p>
                  </div>
                </div>

                {/* Section 11: Changes to This Privacy Policy */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-violet-100 text-violet-700 border-violet-300">11</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Changes to This Privacy Policy</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We reserve the right to modify or update this Privacy Policy at any time to reflect changes in our practices, technology, or legal requirements.</p>
                    <p>Significant updates will be communicated via the Website or, where appropriate, by direct notice (such as email).</p>
                    <p>Your continued use of the Website after policy changes constitutes your acceptance of the revised terms.</p>
                  </div>
                </div>

                {/* Section 12: Contact Us */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Badge variant="outline" className="mr-3 px-3 py-1 text-sm font-semibold bg-emerald-100 text-emerald-700 border-emerald-300">12</Badge>
                    <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>If you have any questions, concerns, or requests regarding this Privacy Policy, your personal data, or our privacy practices, please contact us at:</p>
                    <div className="ml-4">
                      <p><strong>Email:</strong> <a href="mailto:contact@yourunipathway.com" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"><Mail className="h-4 w-4 mr-1" />contact@yourunipathway.com</a></p>
                      <p><strong>Mail:</strong> Melbourne, Australia</p>
                    </div>
                  </div>
                </div>

                {/* Legal Notice */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Legal Notice</h2>
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>This Privacy Policy does not create a contractual obligation on the part of YourUniPathway.com beyond what is required by applicable privacy and consumer protection laws in Australia.</p>
                    <p>While we strive for compliance, no data storage or transmission can be guaranteed to be fully secure.</p>
                    <p>Your continued use of the Website signifies your agreement to this Policy in its entirety.</p>
                  </div>
                </div>

                {/* Agreement Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                  <p className="text-green-800 font-medium text-center">
                    By using this website, you confirm that you have read, understood, and agreed to all the Privacy Policy terms outlined above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

