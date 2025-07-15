
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface VoiceRecorderProps {
  category: string;
  onComplete: (data: any) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  category, 
  onComplete, 
  isRecording, 
  setIsRecording 
}) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscript('');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
    // Simulate transcription
    setTimeout(() => {
      setTranscript("Hello, my name is John Doe. I am 35 years old. I live at 123 Main Street, New York, NY 10001. My phone number is 555-123-4567...");
    }, 1000);
  };

  const processForm = () => {
    setIsProcessing(true);
    // Simulate form processing
    setTimeout(() => {
      const mockFormData = {
        name: 'John Doe',
        age: '35',
        address: '123 Main Street, New York, NY 10001',
        phone: '555-123-4567',
        email: 'john.doe@email.com',
        ...(category === 'hospital' && {
          medicalHistory: 'No major medical conditions',
          emergencyContact: 'Jane Doe - 555-987-6543',
          insuranceNumber: 'INS123456789'
        }),
        ...(category === 'job' && {
          position: 'Software Developer',
          experience: '5 years',
          education: 'Bachelor of Computer Science'
        })
      };
      onComplete(mockFormData);
      setIsProcessing(false);
    }, 2000);
  };

  const getCategoryPrompts = () => {
    const prompts = {
      hospital: [
        "State your full name",
        "Tell us your age and date of birth",
        "Share your address and contact information",
        "Describe any medical conditions or allergies",
        "Provide emergency contact details"
      ],
      government: [
        "State your full legal name",
        "Provide your Social Security Number",
        "Share your current address",
        "Tell us your employment status",
        "Mention any dependents"
      ],
      job: [
        "State your full name",
        "Tell us about your work experience",
        "Describe your education background",
        "Share your contact information",
        "Mention your skills and qualifications"
      ],
      education: [
        "State your full name",
        "Tell us your current education level",
        "Share your academic interests",
        "Provide your contact information",
        "Mention any extracurricular activities"
      ],
      default: [
        "State your full name",
        "Tell us your age",
        "Share your contact information",
        "Provide any relevant details",
        "Mention any additional information"
      ]
    };
    return prompts[category as keyof typeof prompts] || prompts.default;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Voice Recording
          </CardTitle>
          <CardDescription>
            Speak clearly and naturally. We'll transcribe your voice into the form fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Control */}
          <div className="text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500 border-red-300 animate-pulse' 
                  : hasRecorded 
                    ? 'bg-green-500 border-green-300'
                    : 'bg-blue-500 border-blue-300 hover:scale-105'
              }`}>
                {isRecording ? (
                  <MicOff className="h-12 w-12 text-white" />
                ) : hasRecorded ? (
                  <CheckCircle className="h-12 w-12 text-white" />
                ) : (
                  <Mic className="h-12 w-12 text-white" />
                )}
              </div>
            </div>

            {isRecording && (
              <div className="mb-4">
                <p className="text-lg font-semibold text-red-600 mb-2">
                  Recording: {formatTime(recordingTime)}
                </p>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-8 bg-red-500 animate-pulse"></div>
                    <div className="w-1 h-6 bg-red-400 animate-pulse delay-100"></div>
                    <div className="w-1 h-10 bg-red-500 animate-pulse delay-200"></div>
                    <div className="w-1 h-4 bg-red-400 animate-pulse delay-300"></div>
                    <div className="w-1 h-8 bg-red-500 animate-pulse delay-400"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {!isRecording && !hasRecorded && (
                <Button 
                  onClick={startRecording}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </Button>
              )}

              {isRecording && (
                <Button 
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="px-8 py-3"
                >
                  <MicOff className="h-5 w-5 mr-2" />
                  Stop Recording
                </Button>
              )}

              {hasRecorded && !isProcessing && (
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => {
                      setHasRecorded(false);
                      setRecordingTime(0);
                      setTranscript('');
                    }}
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Re-record
                  </Button>
                  <Button 
                    onClick={processForm}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Process Form
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">Processing your voice...</p>
              <p className="text-sm text-gray-500">Converting speech to form data</p>
              <Progress value={75} className="mt-4" />
            </div>
          )}

          {/* Transcript Preview */}
          {transcript && !isProcessing && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Voice Transcript:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{transcript}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recording Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recording Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">What to include in your recording:</h4>
            <ul className="space-y-2">
              {getCategoryPrompts().map((prompt, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{prompt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Speak clearly and at a normal pace. You can pause between different pieces of information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
