
import React from 'react';
import { Hospital, Building, Briefcase, GraduationCap, FileText, Heart, Car, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCategoriesProps {
  onCategorySelect: (category: string) => void;
}

export const FormCategories: React.FC<FormCategoriesProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'hospital',
      title: 'Medical & Healthcare',
      description: 'Patient registration, medical history, appointment booking',
      icon: Hospital,
      color: 'from-red-500 to-pink-500',
      examples: ['Patient Registration', 'Medical History', 'Insurance Claims']
    },
    {
      id: 'government',
      title: 'Government Services',
      description: 'Tax forms, license applications, public services',
      icon: Building,
      color: 'from-blue-500 to-indigo-500',
      examples: ['Tax Filing', 'License Applications', 'Benefits Claims']
    },
    {
      id: 'job',
      title: 'Job Applications',
      description: 'Employment forms, resume building, job applications',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      examples: ['Job Applications', 'Resume Building', 'Interview Forms']
    },
    {
      id: 'education',
      title: 'Education',
      description: 'School admissions, course registration, academic forms',
      icon: GraduationCap,
      color: 'from-purple-500 to-violet-500',
      examples: ['School Admissions', 'Course Registration', 'Academic Records']
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Policy applications, claims, beneficiary forms',
      icon: Heart,
      color: 'from-orange-500 to-red-500',
      examples: ['Policy Applications', 'Claims Filing', 'Beneficiary Updates']
    },
    {
      id: 'legal',
      title: 'Legal Documents',
      description: 'Legal forms, contracts, compliance documents',
      icon: FileText,
      color: 'from-gray-600 to-gray-800',
      examples: ['Legal Forms', 'Contracts', 'Compliance Documents']
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Form Category</h3>
        <p className="text-gray-600">Select the type of form you need to fill out</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300"
              onClick={() => onCategorySelect(category.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-4 mx-auto`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Common forms:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.examples.map((example, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
