import React from 'react';
import { Hospital, Building, Briefcase, GraduationCap, FileText, Heart, Car, Home, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FormCategories = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'hospital',
      title: 'Medical & Healthcare',
      description: 'Patient registration, medical history, appointment booking',
      icon: Hospital,
      color: 'from-red-500 via-pink-500 to-rose-500',
      bgColor: 'from-red-50 via-pink-50 to-rose-50',
      borderColor: 'hover:border-red-300',
      examples: ['Patient Registration', 'Medical History', 'Insurance Claims']
    },
    {
      id: 'government',
      title: 'Government Services',
      description: 'Tax forms, license applications, public services',
      icon: Building,
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgColor: 'from-blue-50 via-indigo-50 to-purple-50',
      borderColor: 'hover:border-blue-300',
      examples: ['Tax Filing', 'License Applications', 'Benefits Claims']
    },
    {
      id: 'job',
      title: 'Job Applications',
      description: 'Employment forms, resume building, job applications',
      icon: Briefcase,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      bgColor: 'from-green-50 via-emerald-50 to-teal-50',
      borderColor: 'hover:border-green-300',
      examples: ['Job Applications', 'Resume Building', 'Interview Forms']
    },
    {
      id: 'education',
      title: 'Education',
      description: 'School admissions, course registration, academic forms',
      icon: GraduationCap,
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      bgColor: 'from-purple-50 via-violet-50 to-indigo-50',
      borderColor: 'hover:border-purple-300',
      examples: ['School Admissions', 'Course Registration', 'Academic Records']
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Policy applications, claims, beneficiary forms',
      icon: Heart,
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      bgColor: 'from-orange-50 via-amber-50 to-yellow-50',
      borderColor: 'hover:border-orange-300',
      examples: ['Policy Applications', 'Claims Filing', 'Beneficiary Updates']
    },
    {
      id: 'legal',
      title: 'Legal Documents',
      description: 'Legal forms, contracts, compliance documents',
      icon: FileText,
      color: 'from-gray-600 via-slate-600 to-zinc-600',
      bgColor: 'from-gray-50 via-slate-50 to-zinc-50',
      borderColor: 'hover:border-gray-300',
      examples: ['Legal Forms', 'Contracts', 'Compliance Documents']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
            Choose Your Form Category
          </h3>
          <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the type of form you need to fill out and let our AI do the magic
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id}
              className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 ${category.borderColor} bg-gradient-to-br ${category.bgColor} hover:bg-white/90 backdrop-blur-sm relative overflow-hidden`}
              onClick={() => onCategorySelect(category.id)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                  <IconComponent className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 relative z-10">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span>Common forms:</span>
                    <ArrowRight className="h-4 w-4 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-white/80 text-gray-700 px-3 py-2 rounded-full border border-gray-200 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 font-medium"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover arrow indicator */}
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`flex items-center space-x-2 text-sm font-medium bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full shadow-lg`}>
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Call to action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-white/20 shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Don't see your category?</h4>
        <p className="text-gray-600 mb-4">Our AI can handle any type of form. Choose the closest category and we'll adapt!</p>
        <div className="flex justify-center items-center space-x-2 text-sm text-purple-600 font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Universal Form Processing</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
