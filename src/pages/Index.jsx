import React, { useState } from 'react';
import { Mic, MicOff, FileText, Hospital, Building, Briefcase, GraduationCap, User, Sparkles, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { FormPreview } from '@/components/FormPreview';
import { FormCategories } from '@/components/FormCategories';
import { CategoryDetails } from '@/components/CategoryDetails';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState(null);
  const [currentStep, setCurrentStep] = useState('category');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep('details');
  };

  const handleProceedToRecording = () => {
    setCurrentStep('record');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentStep('category');
  };

  const handleRecordingComplete = (data) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-lg">
                <Mic className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Voice2Form
                </h1>
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span>AI-Powered Voice Form Filling</span>
                </p>
              </div>
            </div>
            {currentStep !== 'category' && (
              <Button 
                onClick={handleStartOver} 
                variant="outline"
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <User className="h-4 w-4" />
                <span>Start Over</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        {currentStep === 'category' && (
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-8">
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl animate-pulse">
                <FileText className="h-12 w-12 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-spin opacity-20"></div>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Speak Your Way Through
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Digital Forms
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Revolutionary AI-powered voice recognition that transforms spoken words into perfectly filled forms. 
                Making digital accessibility a reality for everyone, everywhere.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-12">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
                <span className="font-medium">Universal Accessibility</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse delay-200"></div>
                <span className="font-medium">AI Voice Recognition</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse delay-400"></div>
                <span className="font-medium">Multi-Language Support</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full animate-pulse delay-600"></div>
                <span className="font-medium">Instant Processing</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Accuracy Rate</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">10x</div>
                <div className="text-gray-600 font-medium">Faster Than Typing</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">50+</div>
                <div className="text-gray-600 font-medium">Languages Supported</div>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-5xl mx-auto">
          {currentStep === 'category' && (
            <div className="animate-fade-in">
              <FormCategories onCategorySelect={handleCategorySelect} />
            </div>
          )}
          
          {currentStep === 'details' && selectedCategory && (
            <div className="animate-scale-in">
              <CategoryDetails 
                category={selectedCategory}
                onProceed={handleProceedToRecording}
                onBack={handleBackToCategories}
              />
            </div>
          )}
          
          {currentStep === 'record' && selectedCategory && (
            <div className="animate-scale-in">
              <VoiceRecorder 
                category={selectedCategory}
                onComplete={handleRecordingComplete}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
            </div>
          )}
          
          {currentStep === 'preview' && formData && (
            <div className="animate-scale-in">
              <FormPreview 
                formData={formData}
                category={selectedCategory}
                onStartOver={handleStartOver}
              />
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-white/20 mt-20 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Heart className="h-5 w-5 text-red-500" />
              <p className="text-gray-700 font-medium">Making digital forms accessible to everyone</p>
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-sm text-gray-500 mb-6">Built with accessibility, inclusion, and innovation in mind</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Powered by Advanced AI</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Hackathon Innovation 2024</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
