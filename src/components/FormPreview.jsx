import React, { useState } from 'react';
import { CheckCircle, Edit, Download, Share, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const FormPreview = ({ formData, category, onStartOver }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(formData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleEdit = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCategoryTitle = () => {
    const titles = {
      hospital: 'Medical Registration Form',
      government: 'Government Service Application',
      job: 'Job Application Form',
      education: 'Education Application Form',
      insurance: 'Insurance Application Form',
      legal: 'Legal Document Form'
    };
    return titles[category] || 'Form Application';
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-8 pb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Form Submitted Successfully!</h2>
              <p className="text-green-700">
                Your {getCategoryTitle().toLowerCase()} has been submitted and is being processed.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Button onClick={onStartOver} variant="outline" size="lg">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Submit Another Form
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download Copy
                </Button>
              </div>
              
              <p className="text-sm text-green-600 mt-4">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {getCategoryTitle()}
              </CardTitle>
              <CardDescription>
                Review your information before submitting. You can edit any field if needed.
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Done Editing' : 'Edit Form'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedData.name || ''}
                      onChange={(e) => handleEdit('name', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                      {editedData.name || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                    Age
                  </Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      value={editedData.age || ''}
                      onChange={(e) => handleEdit('age', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                      {editedData.age || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedData.phone || ''}
                      onChange={(e) => handleEdit('phone', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                      {editedData.phone || 'Not provided'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedData.email || ''}
                      onChange={(e) => handleEdit('email', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                      {editedData.email || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Additional Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={editedData.address || ''}
                      onChange={(e) => handleEdit('address', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                      {editedData.address || 'Not provided'}
                    </p>
                  )}
                </div>

                {category === 'hospital' && (
                  <>
                    <div>
                      <Label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700">
                        Medical History
                      </Label>
                      {isEditing ? (
                        <Textarea
                          id="medicalHistory"
                          value={editedData.medicalHistory || ''}
                          onChange={(e) => handleEdit('medicalHistory', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                          {editedData.medicalHistory || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                        Emergency Contact
                      </Label>
                      {isEditing ? (
                        <Input
                          id="emergencyContact"
                          value={editedData.emergencyContact || ''}
                          onChange={(e) => handleEdit('emergencyContact', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                          {editedData.emergencyContact || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {category === 'job' && (
                  <>
                    <div>
                      <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                        Position Applied For
                      </Label>
                      {isEditing ? (
                        <Input
                          id="position"
                          value={editedData.position || ''}
                          onChange={(e) => handleEdit('position', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                          {editedData.position || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                        Work Experience
                      </Label>
                      {isEditing ? (
                        <Textarea
                          id="experience"
                          value={editedData.experience || ''}
                          onChange={(e) => handleEdit('experience', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded border">
                          {editedData.experience || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center pt-6 border-t">
            <Button onClick={onStartOver} variant="outline" size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Start Over
            </Button>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="lg">
                <Share className="h-5 w-5 mr-2" />
                Share
              </Button>
              <Button 
                onClick={handleSubmit}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Submit Form
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
