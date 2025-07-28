import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  X, 
  GraduationCap, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award, 
  BookOpen,
  TrendingUp,
  Users,
  ExternalLink
} from 'lucide-react'

export default function CourseComparisonModal({ isOpen, onClose, courses = [] }) {
  if (!isOpen || courses.length === 0) return null

  const ComparisonRow = ({ label, icon: Icon, getValue, className = "" }) => (
    <div className={`grid grid-cols-${courses.length + 1} gap-4 py-3 border-b border-gray-100 ${className}`}>
      <div className="flex items-center font-medium text-gray-700">
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {label}
      </div>
      {courses.map((course, index) => (
        <div key={index} className="text-sm">
          {getValue(course)}
        </div>
      ))}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Course Comparison</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600">Compare up to 3 courses side by side</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Headers */}
          <div className={`grid grid-cols-${courses.length + 1} gap-4`}>
            <div></div> {/* Empty cell for labels column */}
            {courses.map((course, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{course.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    <span>{course.universities?.name}</span>
                  </div>
                  {course.universities?.state && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{course.universities.state}</span>
                    </div>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-0">
                
                {/* Basic Information */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b-2 border-gray-200">
                  Basic Information
                </div>
                
                <ComparisonRow
                  label="Course Level"
                  icon={Award}
                  getValue={(course) => (
                    <Badge variant="secondary">{course.level || 'Not specified'}</Badge>
                  )}
                />
                
                <ComparisonRow
                  label="Delivery Mode"
                  icon={BookOpen}
                  getValue={(course) => (
                    <Badge variant="outline">{course.delivery_mode || 'Not specified'}</Badge>
                  )}
                />
                
                <ComparisonRow
                  label="Duration"
                  icon={Clock}
                  getValue={(course) => course.duration || 'Not specified'}
                />

                {/* Entry Requirements */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b-2 border-gray-200 mt-6">
                  Entry Requirements
                </div>
                
                <ComparisonRow
                  label="ATAR Cutoff"
                  icon={TrendingUp}
                  getValue={(course) => (
                    course.atar_cutoff ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {course.atar_cutoff}
                      </Badge>
                    ) : (
                      <span className="text-gray-500">Not required</span>
                    )
                  )}
                />
                
                <ComparisonRow
                  label="Prerequisites"
                  icon={BookOpen}
                  getValue={(course) => (
                    <div className="text-sm">
                      {course.prerequisites ? (
                        <span>{course.prerequisites}</span>
                      ) : (
                        <span className="text-gray-500">Check with university</span>
                      )}
                    </div>
                  )}
                />

                {/* Financial Information */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b-2 border-gray-200 mt-6">
                  Financial Information
                </div>
                
                <ComparisonRow
                  label="Annual Fees"
                  icon={DollarSign}
                  getValue={(course) => (
                    course.annual_fee ? (
                      <span className="font-medium text-green-600">
                        ${course.annual_fee.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">Contact university</span>
                    )
                  )}
                />
                
                <ComparisonRow
                  label="CSP Available"
                  icon={Award}
                  getValue={(course) => (
                    <Badge variant={course.csp_available ? "default" : "secondary"}>
                      {course.csp_available ? "Yes" : "No"}
                    </Badge>
                  )}
                />

                {/* University Information */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b-2 border-gray-200 mt-6">
                  University Information
                </div>
                
                <ComparisonRow
                  label="University Type"
                  icon={GraduationCap}
                  getValue={(course) => (
                    <Badge variant="outline">
                      {course.universities?.type || 'University'}
                    </Badge>
                  )}
                />
                
                <ComparisonRow
                  label="Global Ranking"
                  icon={TrendingUp}
                  getValue={(course) => (
                    course.universities?.global_ranking ? (
                      <span className="font-medium">#{course.universities.global_ranking}</span>
                    ) : (
                      <span className="text-gray-500">Not ranked</span>
                    )
                  )}
                />
                
                <ComparisonRow
                  label="Student Population"
                  icon={Users}
                  getValue={(course) => (
                    course.universities?.student_population ? (
                      <span>{course.universities.student_population.toLocaleString()} students</span>
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )
                  )}
                />

                {/* Career Outcomes */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b-2 border-gray-200 mt-6">
                  Career Outcomes
                </div>
                
                <ComparisonRow
                  label="Graduate Employment"
                  icon={TrendingUp}
                  getValue={(course) => (
                    course.graduate_employment_rate ? (
                      <span className="font-medium text-green-600">
                        {course.graduate_employment_rate}%
                      </span>
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )
                  )}
                />
                
                <ComparisonRow
                  label="Average Starting Salary"
                  icon={DollarSign}
                  getValue={(course) => (
                    course.average_starting_salary ? (
                      <span className="font-medium text-green-600">
                        ${course.average_starting_salary.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )
                  )}
                />

              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={`grid grid-cols-${courses.length + 1} gap-4`}>
            <div></div> {/* Empty cell for labels column */}
            {courses.map((course, index) => (
              <div key={index} className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {course.application_link && (
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={onClose} className="px-8">
              Close Comparison
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

