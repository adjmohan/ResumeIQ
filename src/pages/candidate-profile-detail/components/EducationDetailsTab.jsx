import React from 'react';
import Icon from '../../../components/AppIcon';

const EducationDetailsTab = ({ educationData }) => {
  const getRequirementMatch = (requirement) => {
    if (requirement.met) return 'text-success';
    if (requirement.partial) return 'text-warning';
    return 'text-error';
  };

  const getRequirementIcon = (requirement) => {
    if (requirement.met) return 'CheckCircle2';
    if (requirement.partial) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="space-y-6">
      {/* Education Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{educationData.highestDegree}</div>
          <div className="text-sm text-muted-foreground">Highest Degree</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{educationData.totalCertifications}</div>
          <div className="text-sm text-muted-foreground">Certifications</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{educationData.gpa || 'N/A'}</div>
          <div className="text-sm text-muted-foreground">GPA</div>
        </div>
      </div>

      {/* Job Requirements Comparison */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Education Requirements Analysis</h3>
        <div className="space-y-3">
          {educationData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getRequirementIcon(requirement)} 
                  size={18} 
                  className={getRequirementMatch(requirement)} 
                />
                <div>
                  <div className="font-medium text-foreground">{requirement.requirement}</div>
                  <div className="text-sm text-muted-foreground">{requirement.status}</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                requirement.met 
                  ? 'bg-success/10 text-success'
                  : requirement.partial
                    ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }`}>
                {requirement.met ? 'Met' : requirement.partial ? 'Partial' : 'Not Met'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Education History</h3>
        {educationData.degrees.map((degree, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">{degree.degree}</h4>
                <p className="text-primary font-medium">{degree.field}</p>
                <p className="text-sm text-muted-foreground">{degree.institution}</p>
                <p className="text-sm text-muted-foreground">{degree.year} • {degree.location}</p>
              </div>
              {degree.gpa && (
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">{degree.gpa}</div>
                  <div className="text-sm text-muted-foreground">GPA</div>
                </div>
              )}
            </div>

            {degree.honors && degree.honors.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-foreground mb-2">Honors & Awards:</h5>
                <div className="flex flex-wrap gap-2">
                  {degree.honors.map((honor, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                    >
                      {honor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {degree.relevantCourses && degree.relevantCourses.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-foreground mb-2">Relevant Coursework:</h5>
                <div className="flex flex-wrap gap-2">
                  {degree.relevantCourses.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {degree.thesis && (
              <div className="bg-muted rounded-lg p-3">
                <h5 className="text-sm font-medium text-foreground mb-1">Thesis/Project:</h5>
                <p className="text-sm text-muted-foreground">{degree.thesis}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Certifications */}
      {educationData.certifications && educationData.certifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationData.certifications.map((cert, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{cert.name}</h4>
                    <p className="text-sm text-primary">{cert.issuer}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'Active' ?'bg-success/10 text-success'
                      : cert.status === 'Expired' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                  }`}>
                    {cert.status}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Issued: {cert.issueDate}</p>
                  {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                  {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Analysis */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="GraduationCap" size={18} className="text-accent" />
          <h4 className="font-medium text-foreground">Education Analysis</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Strengths:</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Strong academic foundation in relevant field</li>
              <li>• Multiple professional certifications</li>
              <li>• Continuous learning demonstrated</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Recommendations:</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Consider advanced certifications in cloud technologies</li>
              <li>• MBA could enhance leadership potential</li>
              <li>• Industry-specific training would be beneficial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetailsTab;