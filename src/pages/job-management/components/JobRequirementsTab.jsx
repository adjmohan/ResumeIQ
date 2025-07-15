import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const JobRequirementsTab = ({ job, isEditing, onSave, onCancel, onEdit }) => {
  const [formData, setFormData] = useState({
    requiredSkills: job?.requiredSkills || [],
    preferredSkills: job?.preferredSkills || [],
    education: job?.education || 'bachelor',
    certifications: job?.certifications || [],
    languages: job?.languages || [],
    experience: job?.experience || '',
    responsibilities: job?.responsibilities || [],
    qualifications: job?.qualifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newQualification, setNewQualification] = useState('');

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'certification', label: 'Professional Certification' }
  ];

  const commonSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Git', 'Agile', 'Scrum', 'Project Management', 'Communication',
    'Leadership', 'Problem Solving', 'Team Collaboration'
  ];

  const commonCertifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'Microsoft Azure Fundamentals',
    'PMP (Project Management Professional)',
    'Scrum Master Certification',
    'Salesforce Administrator',
    'CompTIA Security+',
    'Cisco CCNA'
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Portuguese', 'Italian', 'Russian', 'Arabic', 'Hindi'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (type, skill) => {
    if (skill.trim() && !formData[type].includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], skill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type, skill) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(s => s !== skill)
    }));
  };

  const addListItem = (type, item, setter) => {
    if (item.trim() && !formData[type].includes(item.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], item.trim()]
      }));
      setter('');
    }
  };

  const removeListItem = (type, item) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(i => i !== item)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!job && !isEditing) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Job Selected</h3>
          <p className="text-muted-foreground">Select a job to view requirements</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {isEditing ? 'Edit Job Requirements' : 'Job Requirements'}
        </h2>
        
        {!isEditing ? (
          <Button variant="default" size="sm" onClick={onEdit} iconName="Edit" iconPosition="left">
            Edit Requirements
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} iconName="Save" iconPosition="left">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Required Skills */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Required Skills</label>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add required skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('requiredSkills', newSkill)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill('requiredSkills', newSkill)}
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.requiredSkills : job?.requiredSkills || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill('requiredSkills', skill)}
                      className="ml-2 text-primary hover:text-primary/70"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggested skills:</p>
                <div className="flex flex-wrap gap-1">
                  {commonSkills.filter(skill => !formData.requiredSkills.includes(skill)).slice(0, 8).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill('requiredSkills', skill)}
                      className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded border border-border"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preferred Skills */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Preferred Skills</label>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add preferred skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('preferredSkills', newSkill)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill('preferredSkills', newSkill)}
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {(isEditing ? formData.preferredSkills : job?.preferredSkills || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill('preferredSkills', skill)}
                      className="ml-2 text-accent hover:text-accent/70"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-4">
            <Select
              label="Minimum Education"
              options={educationOptions}
              value={isEditing ? formData.education : job?.education}
              onChange={(value) => handleInputChange('education', value)}
              disabled={!isEditing}
            />

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Certifications</label>
              <div className="space-y-2">
                {commonCertifications.map((cert) => (
                  <Checkbox
                    key={cert}
                    label={cert}
                    size="sm"
                    checked={isEditing 
                      ? formData.certifications.includes(cert)
                      : job?.certifications?.includes(cert)
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('certifications', [...formData.certifications, cert]);
                      } else {
                        handleInputChange('certifications', formData.certifications.filter(c => c !== cert));
                      }
                    }}
                    disabled={!isEditing}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Experience */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Experience Requirements</label>
            <div className="min-h-[100px] p-4 border border-border rounded-md bg-background">
              {isEditing ? (
                <textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full h-24 resize-none bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
                  placeholder="Describe experience requirements..."
                />
              ) : (
                <div className="text-foreground whitespace-pre-wrap">
                  {job?.experience || 'No experience requirements specified'}
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Key Responsibilities</label>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add responsibility..."
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addListItem('responsibilities', newResponsibility, setNewResponsibility)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem('responsibilities', newResponsibility, setNewResponsibility)}
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            )}
            <div className="space-y-2">
              {(isEditing ? formData.responsibilities : job?.responsibilities || []).map((responsibility, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-muted/50 rounded">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground flex-1">{responsibility}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeListItem('responsibilities', responsibility)}
                      className="text-muted-foreground hover:text-error"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Qualifications</label>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Add qualification..."
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addListItem('qualifications', newQualification, setNewQualification)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem('qualifications', newQualification, setNewQualification)}
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            )}
            <div className="space-y-2">
              {(isEditing ? formData.qualifications : job?.qualifications || []).map((qualification, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-muted/50 rounded">
                  <Icon name="Star" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground flex-1">{qualification}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeListItem('qualifications', qualification)}
                      className="text-muted-foreground hover:text-error"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Language Requirements</label>
            <div className="grid grid-cols-2 gap-2">
              {languageOptions.map((language) => (
                <Checkbox
                  key={language}
                  label={language}
                  size="sm"
                  checked={isEditing 
                    ? formData.languages.includes(language)
                    : job?.languages?.includes(language)
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange('languages', [...formData.languages, language]);
                    } else {
                      handleInputChange('languages', formData.languages.filter(l => l !== language));
                    }
                  }}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirementsTab;