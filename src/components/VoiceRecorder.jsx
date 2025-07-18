import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const VoiceRecorder = ({ 
  category, 
  onComplete, 
  isRecording, 
  setIsRecording 
}) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        finalTranscriptRef.current += finalTranscript;
        setTranscript(finalTranscriptRef.current + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      setRecordingTime(0);
      setTranscript('');
      finalTranscriptRef.current = '';
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice recording.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
    
    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const processForm = () => {
    setIsProcessing(true);
    
    // Simple AI-like processing to extract information from transcript
    setTimeout(() => {
      const formData = extractDataFromTranscript(transcript);
      onComplete(formData);
      setIsProcessing(false);
    }, 3000);
  };

  const extractDataFromTranscript = (text) => {
    const lowercaseText = text.toLowerCase();
    
    // Extract name (look for "my name is" or "i am")
    const nameMatch = text.match(/(?:my name is|i am|i'm)\s+([^.]{2,30})/i);
    const name = nameMatch ? nameMatch[1].trim() : '';
    
    // Extract age (look for numbers followed by "years old" or standalone age)
    const ageMatch = text.match(/(?:i am|i'm)\s+(\d{1,2})\s+(?:years old)?|(?:age|aged)\s+(\d{1,2})/i);
    const age = ageMatch ? (ageMatch[1] || ageMatch[2]) : '';
    
    // Extract phone number
    const phoneMatch = text.match(/(?:phone|number|contact).*?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/i);
    const phone = phoneMatch ? phoneMatch[1] : '';
    
    // Extract email
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const email = emailMatch ? emailMatch[1] : '';
    
    // Extract address (look for street addresses)
    const addressMatch = text.match(/(?:live at|address is|located at)\s+([^.]{10,100})/i);
    const address = addressMatch ? addressMatch[1].trim() : '';
    
    const baseData = {
      name,
      age,
      phone,
      email,
      address,
      fullTranscript: text
    };
    
    // Add category-specific fields
    if (category === 'hospital') {
      const medicalMatch = text.match(/(?:medical history|conditions|allergies|medications).*?([^.]{10,200})/i);
      return {
        ...baseData,
        medicalHistory: medicalMatch ? medicalMatch[1].trim() : '',
        reason: text.includes('appointment') ? 'Medical consultation' : 'General inquiry'
      };
    }
    
    if (category === 'job') {
      const experienceMatch = text.match(/(?:experience|worked|years).*?(\d+\s+years?)/i);
      const positionMatch = text.match(/(?:applying for|position|job|role).*?([^.]{5,50})/i);
      return {
        ...baseData,
        position: positionMatch ? positionMatch[1].trim() : '',
        experience: experienceMatch ? experienceMatch[1] : ''
      };
    }
    
    return baseData;
  };

  const getCategoryPrompts = () => {
    const prompts = {
      hospital: [
        "State your full name clearly",
        "Tell us your age and date of birth",
        "Share your complete address and contact information",
        "Describe any medical conditions, allergies, or current medications",
        "Provide emergency contact details and insurance information"
      ],
      government: [
        "State your full legal name as it appears on official documents",
        "Provide your Social Security Number or national ID",
        "Share your current residential address",
        "Tell us your employment status and income details",
        "Mention any dependents or family information"
      ],
      job: [
        "State your full name and preferred contact method",
        "Tell us about your relevant work experience and achievements",
        "Describe your educational background and certifications",
        "Share your contact information and availability",
        "Mention your key skills, qualifications, and career goals"
      ],
      education: [
        "State your full name and student ID if applicable",
        "Tell us your current education level and academic interests",
        "Share your academic achievements and extracurricular activities",
        "Provide your contact information and emergency contacts",
        "Mention any special requirements or accommodations needed"
      ],
      default: [
        "State your full name clearly",
        "Tell us your age and date of birth",
        "Share your complete contact information",
        "Provide any relevant personal details",
        "Mention any additional information that might be helpful"
      ]
    };
    return prompts[category] || prompts.default;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-2 border-white/20 bg-gradient-to-br from-white/80 via-white/70 to-white/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-t-lg"></div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
            🎤 Voice Recording Studio
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 relative z-10">
            Speak naturally and clearly. Our AI will transcribe and structure your information perfectly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 relative">
          {/* Recording Control */}
          <div className="text-center">
            <div className="mb-8">
              <div className={`relative inline-flex items-center justify-center w-32 h-32 rounded-full border-4 transition-all duration-500 ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 border-red-300 shadow-2xl shadow-red-500/50' 
                  : hasRecorded 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 shadow-2xl shadow-green-500/50'
                    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-purple-300 hover:scale-110 shadow-2xl shadow-purple-500/30'
              }`}>
                {isRecording ? (
                  <>
                    <MicOff className="h-16 w-16 text-white animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                  </>
                ) : hasRecorded ? (
                  <CheckCircle className="h-16 w-16 text-white" />
                ) : (
                  <>
                    <Mic className="h-16 w-16 text-white" />
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </div>
            </div>

            {isRecording && (
              <div className="mb-6 space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
                  <p className="text-2xl font-bold text-red-600 mb-3">
                    🔴 Recording: {formatTime(recordingTime)}
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 bg-red-500 rounded-full animate-pulse`}
                          style={{ 
                            height: `${Math.random() * 40 + 20}px`,
                            animationDelay: `${i * 100}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-red-700 font-medium">Listening to your voice...</p>
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {!isRecording && !hasRecorded && (
                <Button 
                  onClick={startRecording}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Mic className="h-6 w-6 mr-3" />
                  Start Recording
                </Button>
              )}

              {isRecording && (
                <Button 
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <MicOff className="h-6 w-6 mr-3" />
                  Stop Recording
                </Button>
              )}

              {hasRecorded && !isProcessing && (
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => {
                      setHasRecorded(false);
                      setRecordingTime(0);
                      setTranscript('');
                      finalTranscriptRef.current = '';
                    }}
                    variant="outline"
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Re-record
                  </Button>
                  <Button 
                    onClick={processForm}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Process with AI
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">🤖 AI Processing Your Voice</h3>
              <p className="text-lg text-gray-600 mb-4">Converting speech to structured form data...</p>
              <div className="space-y-3">
                <Progress value={75} className="h-3 bg-gray-200" />
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Speech Recognition</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Data Extraction</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>Form Generation</span>
                </div>
              </div>
            </div>
          )}

          {/* Transcript Preview */}
          {transcript && !isProcessing && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-blue-200 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                Voice Transcript Preview:
              </h4>
              <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200 shadow-sm">{transcript}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Recording Tips */}
      <Card className="border-2 border-white/20 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 text-purple-500 mr-3" />
            Recording Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 text-lg">What to include in your recording:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCategoryPrompts().map((prompt, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/60 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{prompt}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-yellow-500 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 mb-2">💡 Pro Tips for Best Results:</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Speak clearly and at a normal pace</li>
                    <li>Find a quiet environment to minimize background noise</li>
                    <li>You can pause between different pieces of information</li>
                    <li>Spell out complex names or addresses if needed</li>
                    <li>Our AI handles multiple languages and accents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
