
import React, { useState } from 'react';
import { Mic, MicOff, FileText, Hospital, Building, Briefcase, GraduationCap, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { FormPreview } from '@/components/FormPreview';
import { FormCategories } from '@/components/FormCategories';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<'category' | 'record' | 'preview'>('category');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentStep('record');
  };

  const handleRecordingComplete = (data: any) => {
    setFormData(data);
    setCurrentStep('preview');
  };

  const handleStartOver = () => {
    setSelectedCategory(null);
    setFormData(null);
    setCurrentStep('category');
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Voice2Form</h1>
                <p className="text-sm text-gray-600">Fill forms with your voice</p>
              </div>
            </div>
            {currentStep !== 'category' && (
              <Button 
                onClick={handleStartOver} 
                variant="outline"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Start Over</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {currentStep === 'category' && (
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Speak Your Way Through Forms
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                No more typing! Simply speak your details and let our AI fill out forms for you. 
                Perfect for everyone, especially those who find typing challenging.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Accessible for all ages</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Voice-first design</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Multiple languages</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'category' && (
            <FormCategories onCategorySelect={handleCategorySelect} />
          )}
          
          {currentStep === 'record' && selectedCategory && (
            <VoiceRecorder 
              category={selectedCategory}
              onComplete={handleRecordingComplete}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
          )}
          
          {currentStep === 'preview' && formData && (
            <FormPreview 
              formData={formData}
              category={selectedCategory}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Making digital forms accessible to everyone</p>
            <p className="text-sm">Built with accessibility and inclusion in mind</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
