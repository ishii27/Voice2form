import React from 'react';
import { CheckCircle, ArrowRight, Mic, FileText, Clock, User, Phone, Mail, MapPin, Briefcase, GraduationCap, Heart, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const CategoryDetails = ({ category, onProceed, onBack }) => {
  const getCategoryInfo = () => {
    const categoryData = {
      job: {
        title: 'Job Application Form',
        description: 'Fill out your job application by speaking the required information',
        icon: Briefcase,
        color: 'from-green-500 via-emerald-500 to-teal-500',
        bgColor: 'from-green-50 via-emerald-50 to-teal-50',
        estimatedTime: '3-5 minutes',
        fields: [
          { label: 'Full Name', example: 'John Smith', icon: User, required: true },
          { label: 'Contact Information', example: 'Phone and email address', icon: Phone, required: true },
          { label: 'Current Address', example: '123 Main Street, City, State', icon: MapPin, required: true },
          { label: 'Work Experience', example: '5 years as Software Developer at XYZ Company', icon: Briefcase, required: true },
          { label: 'Education Background', example: 'Bachelor of Computer Science from ABC University', icon: GraduationCap, required: true },
          { label: 'Skills & Qualifications', example: 'JavaScript, React, Node.js, Project Management', icon: CheckCircle, required: false },
          { label: 'Position Applied For', example: 'Senior Software Engineer', icon: FileText, required: true },
          { label: 'Availability', example: 'Available to start immediately or two weeks notice', icon: Clock, required: false }
        ]
      },
      hospital: {
        title: 'Medical Registration Form',
        description: 'Complete your patient registration by providing medical information',
        icon: Heart,
        color: 'from-red-500 via-pink-500 to-rose-500',
        bgColor: 'from-red-50 via-pink-50 to-rose-50',
        estimatedTime: '4-6 minutes',
        fields: [
          { label: 'Full Name', example: 'Jane Doe', icon: User, required: true },
          { label: 'Date of Birth & Age', example: 'January 15, 1985, 39 years old', icon: User, required: true },
          { label: 'Contact Information', example: 'Phone, email, and address', icon: Phone, required: true },
          { label: 'Emergency Contact', example: 'Spouse: John Doe - 555-123-4567', icon: Phone, required: true },
          { label: 'Insurance Information', example: 'Blue Cross Blue Shield, Policy #12345', icon: FileText, required: true },
          { label: 'Medical History', example: 'Allergies, current medications, past surgeries', icon: Heart, required: true },
          { label: 'Reason for Visit', example: 'Annual checkup, specific symptoms, or consultation', icon: FileText, required: true }
        ]
      },
      government: {
        title: 'Government Service Form',
        description: 'Complete your government service application with required documentation',
        icon: Building,
        color: 'from-blue-500 via-indigo-500 to-purple-500',
        bgColor: 'from-blue-50 via-indigo-50 to-purple-50',
        estimatedTime: '5-8 minutes',
        fields: [
          { label: 'Full Legal Name', example: 'As it appears on official documents', icon: User, required: true },
          { label: 'Social Security Number', example: 'XXX-XX-XXXX', icon: FileText, required: true },
          { label: 'Current Address', example: 'Residential address with ZIP code', icon: MapPin, required: true },
          { label: 'Contact Information', example: 'Primary phone and email', icon: Phone, required: true },
          { label: 'Employment Status', example: 'Employed, unemployed, self-employed, retired', icon: Briefcase, required: true },
          { label: 'Income Information', example: 'Annual household income', icon: FileText, required: false },
          { label: 'Family Information', example: 'Dependents, marital status', icon: User, required: false }
        ]
      },
      education: {
        title: 'Educational Institution Form',
        description: 'Provide your academic information for enrollment or application',
        icon: GraduationCap,
        color: 'from-purple-500 via-violet-500 to-indigo-500',
        bgColor: 'from-purple-50 via-violet-50 to-indigo-50',
        estimatedTime: '3-5 minutes',
        fields: [
          { label: 'Full Name', example: 'Student name as on official records', icon: User, required: true },
          { label: 'Student ID', example: 'If already enrolled', icon: FileText, required: false },
          { label: 'Contact Information', example: 'Phone, email, and current address', icon: Phone, required: true },
          { label: 'Academic Background', example: 'Previous schools, GPA, graduation year', icon: GraduationCap, required: true },
          { label: 'Program of Interest', example: 'Course or degree program you are applying for', icon: FileText, required: true },
          { label: 'Emergency Contact', example: 'Parent or guardian contact information', icon: Phone, required: true },
          { label: 'Special Requirements', example: 'Accommodations, dietary needs, accessibility', icon: CheckCircle, required: false }
        ]
      }
    };

    return categoryData[category] || categoryData.job;
  };

  const categoryInfo = getCategoryInfo();
  const IconComponent = categoryInfo.icon;
  const requiredFields = categoryInfo.fields.filter(field => field.required);
  const optionalFields = categoryInfo.fields.filter(field => !field.required);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Card */}
      <Card className={`border-2 border-white/20 bg-gradient-to-br ${categoryInfo.bgColor} backdrop-blur-xl shadow-2xl`}>
        <CardHeader className="text-center relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.color} opacity-5 rounded-t-lg`}></div>
          <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${categoryInfo.color} rounded-2xl mb-4 mx-auto shadow-lg`}>
            <IconComponent className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 relative z-10">
            {categoryInfo.title}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 relative z-10 max-w-2xl mx-auto">
            {categoryInfo.description}
          </CardDescription>
          <div className="flex justify-center items-center space-x-4 mt-4 relative z-10">
            <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{categoryInfo.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
              <Mic className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Voice Powered</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Required Fields */}
      <Card className="border-2 border-white/20 bg-white/80 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <CheckCircle className="h-6 w-6 text-red-500 mr-3" />
            Required Information ({requiredFields.length} fields)
          </CardTitle>
          <CardDescription>
            These fields are mandatory and must be included in your voice recording
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredFields.map((field, index) => {
              const FieldIcon = field.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center">
                    <FieldIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{field.label}</p>
                    <p className="text-sm text-gray-600">{field.example}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Required</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Optional Fields */}
      {optionalFields.length > 0 && (
        <Card className="border-2 border-white/20 bg-white/70 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 text-blue-500 mr-3" />
              Optional Information ({optionalFields.length} fields)
            </CardTitle>
            <CardDescription>
              These fields are optional but can help provide more complete information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {optionalFields.map((field, index) => {
                const FieldIcon = field.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center">
                      <FieldIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{field.label}</p>
                      <p className="text-sm text-gray-600">{field.example}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Optional</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card className="border-2 border-white/20 bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Mic className="h-6 w-6 text-orange-500 mr-3" />
            Voice Recording Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="font-semibold text-gray-800">📢 Speaking Guidelines:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Speak clearly and at a normal pace</li>
                <li>• Spell out complex names or addresses</li>
                <li>• You can pause between different information</li>
                <li>• Include all required fields in your recording</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-gray-800">🎯 What to Say:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• "My name is [your full name]"</li>
                <li>• "My phone number is [number]"</li>
                <li>• "I live at [complete address]"</li>
                <li>• Include specific details for your category</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          ← Back to Categories
        </Button>
        <Button 
          onClick={onProceed}
          size="lg"
          className={`bg-gradient-to-r ${categoryInfo.color} hover:scale-105 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8`}
        >
          Start Voice Recording
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};