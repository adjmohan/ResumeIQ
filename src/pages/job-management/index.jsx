import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import JobListSidebar from './components/JobListSidebar';
import JobDetailsTab from './components/JobDetailsTab';
import JobRequirementsTab from './components/JobRequirementsTab';
import ResumeAnalysisTab from './components/ResumeAnalysisTab';
import JobCreationModal from './components/JobCreationModal';
import Icon from '../../components/AppIcon';


const JobManagement = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      employmentType: "full-time",
      experienceLevel: "senior",
      salaryMin: "120000",
      salaryMax: "180000",
      status: "active",
      postedDate: "2025-01-10",
      applicants: 45,
      views: 234,
      shortlisted: 8,
      interviewed: 3,
      isRemote: true,
      isUrgent: false,
      description: `We are seeking a Senior Software Engineer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.

Key responsibilities include:
• Architecting and implementing robust software solutions
• Collaborating with cross-functional teams to deliver high-quality products
• Mentoring junior developers and conducting code reviews
• Participating in technical decision-making and system design discussions`,
      requiredSkills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      preferredSkills: ["TypeScript", "Kubernetes", "GraphQL", "Redis"],
      education: "bachelor",
      certifications: ["AWS Certified Solutions Architect"],
      languages: ["English"],
      experience: "5+ years of experience in full-stack development with expertise in modern JavaScript frameworks and cloud technologies.",
      responsibilities: [
        "Design and develop scalable web applications",
        "Collaborate with product managers and designers",
        "Mentor junior team members",
        "Participate in code reviews and technical discussions",
        "Optimize application performance and scalability"
      ],
      qualifications: [
        "Bachelor\'s degree in Computer Science or related field",
        "5+ years of professional software development experience",
        "Strong problem-solving and analytical skills",
        "Excellent communication and teamwork abilities",
        "Experience with agile development methodologies"
      ],
      benefits: ["Health Insurance", "401(k) Matching", "Flexible PTO", "Remote Work", "Professional Development"]
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      employmentType: "full-time",
      experienceLevel: "mid",
      salaryMin: "90000",
      salaryMax: "130000",
      status: "active",
      postedDate: "2025-01-12",
      applicants: 28,
      views: 156,
      shortlisted: 5,
      interviewed: 2,
      isRemote: false,
      isUrgent: true,
      description: `Join our marketing team as a Product Marketing Manager to drive go-to-market strategies and product positioning. You'll work closely with product, sales, and engineering teams to ensure successful product launches.

This role involves:
• Developing comprehensive go-to-market strategies
• Creating compelling product messaging and positioning
• Conducting market research and competitive analysis
• Collaborating with sales teams to enable effective selling`,
      requiredSkills: ["Product Marketing", "Go-to-Market Strategy", "Market Research", "Content Creation", "Analytics"],
      preferredSkills: ["B2B Marketing", "SaaS Experience", "Marketing Automation", "A/B Testing"],
      education: "bachelor",
      certifications: ["Google Analytics", "HubSpot Marketing"],
      languages: ["English", "Spanish"],
      experience: "3-5 years of product marketing experience, preferably in B2B SaaS companies with a track record of successful product launches.",
      responsibilities: [
        "Develop and execute go-to-market strategies",
        "Create product messaging and positioning",
        "Conduct market research and competitive analysis",
        "Enable sales teams with marketing materials",
        "Measure and optimize marketing campaign performance"
      ],
      qualifications: [
        "Bachelor's degree in Marketing, Business, or related field","3-5 years of product marketing experience","Strong analytical and strategic thinking skills","Excellent written and verbal communication","Experience with marketing automation tools"
      ],
      benefits: ["Health Insurance", "Dental Insurance", "Stock Options", "Gym Membership", "Commuter Benefits"]
    },
    {
      id: 3,
      title: "UX/UI Designer",department: "Engineering",location: "Austin, TX",employmentType: "full-time",experienceLevel: "mid",salaryMin: "75000",salaryMax: "110000",status: "draft",postedDate: "2025-01-14",
      applicants: 0,
      views: 12,
      shortlisted: 0,
      interviewed: 0,
      isRemote: true,
      isUrgent: false,
      description: `We're looking for a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products. You'll work closely with product managers and developers to bring designs to life.

Your responsibilities will include:
• Designing user interfaces for web and mobile applications
• Conducting user research and usability testing
• Creating wireframes, prototypes, and design systems
• Collaborating with development teams for implementation`,
      requiredSkills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      preferredSkills: ["Design Systems", "HTML/CSS", "Animation", "Accessibility"],
      education: "bachelor",
      certifications: [],
      languages: ["English"],
      experience: "3-4 years of UX/UI design experience with a strong portfolio showcasing web and mobile design projects.",
      responsibilities: [
        "Design user interfaces for web and mobile applications","Conduct user research and usability testing","Create wireframes, prototypes, and design systems","Collaborate with developers for design implementation","Maintain and evolve design system components"
      ],
      qualifications: [
        "Bachelor's degree in Design, HCI, or related field",
        "3-4 years of UX/UI design experience",
        "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
        "Strong portfolio demonstrating design process",
        "Understanding of front-end development principles"
      ],
      benefits: ["Health Insurance", "Vision Insurance", "Flexible PTO", "Remote Work", "Professional Development"]
    },
    {
      id: 4,
      title: "Sales Development Representative",
      department: "Sales",
      location: "Chicago, IL",
      employmentType: "full-time",
      experienceLevel: "entry",
      salaryMin: "50000",
      salaryMax: "70000",
      status: "paused",
      postedDate: "2025-01-08",
      applicants: 67,
      views: 189,
      shortlisted: 12,
      interviewed: 6,
      isRemote: false,
      isUrgent: false,
      description: `Join our sales team as a Sales Development Representative to help drive our revenue growth. You'll be responsible for prospecting, qualifying leads, and setting up meetings for our account executives.

Key activities include:
• Prospecting and qualifying inbound and outbound leads
• Conducting initial discovery calls with potential customers
• Scheduling meetings for account executives
• Maintaining accurate records in CRM system`,
      requiredSkills: ["Sales Prospecting", "Lead Qualification", "CRM", "Communication", "Cold Calling"],
      preferredSkills: ["Salesforce", "LinkedIn Sales Navigator", "Email Marketing", "B2B Sales"],
      education: "bachelor",
      certifications: [],
      languages: ["English"],
      experience: "0-2 years of sales experience. Fresh graduates with strong communication skills are welcome to apply.",
      responsibilities: [
        "Prospect and qualify inbound and outbound leads",
        "Conduct initial discovery calls with prospects",
        "Schedule qualified meetings for account executives",
        "Maintain accurate lead and opportunity records",
        "Collaborate with marketing on lead generation campaigns"
      ],
      qualifications: [
        "Bachelor's degree in Business, Marketing, or related field",
        "0-2 years of sales or customer-facing experience",
        "Excellent communication and interpersonal skills",
        "Strong organizational and time management abilities",
        "Coachable attitude and eagerness to learn"
      ],
      benefits: ["Health Insurance", "Dental Insurance", "401(k) Matching", "Commission Structure", "Career Development"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      employmentType: "full-time",
      experienceLevel: "senior",
      salaryMin: "130000",
      salaryMax: "170000",
      status: "closed",
      postedDate: "2025-01-05",
      applicants: 89,
      views: 345,
      shortlisted: 15,
      interviewed: 8,
      isRemote: true,
      isUrgent: false,
      description: `We are seeking an experienced DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with development teams to implement CI/CD pipelines and maintain our cloud infrastructure.

Your role will involve:
• Designing and implementing CI/CD pipelines
• Managing cloud infrastructure on AWS/Azure
• Monitoring system performance and reliability
• Automating deployment and operational processes`,
      requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
      preferredSkills: ["Ansible", "Prometheus", "Grafana", "Python", "Bash Scripting"],
      education: "bachelor",
      certifications: ["AWS Certified DevOps Engineer", "Kubernetes Administrator"],
      languages: ["English"],
      experience: "5+ years of DevOps/Infrastructure experience with expertise in cloud platforms and containerization technologies.",
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage and optimize cloud infrastructure",
        "Monitor system performance and reliability",
        "Automate deployment and operational processes",
        "Collaborate with development teams on infrastructure needs"
      ],
      qualifications: [
        "Bachelor\'s degree in Computer Science or related field",
        "5+ years of DevOps/Infrastructure experience",
        "Strong knowledge of cloud platforms (AWS/Azure)",
        "Experience with containerization and orchestration",
        "Proficiency in infrastructure as code tools"
      ],
      benefits: ["Health Insurance", "Vision Insurance", "401(k) Matching", "Remote Work", "Stock Options"]
    }
  ]);

  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const tabs = [
    { id: 'details', label: 'Job Details', icon: 'FileText' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
    { id: 'analysis', label: 'Resume Analysis', icon: 'Users' }
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setIsEditing(false);
    setActiveTab('details');
  };

  const handleCreateNew = () => {
    setIsCreationModalOpen(true);
  };

  const handleSaveJob = (jobData) => {
    if (selectedJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === selectedJob.id ? { ...job, ...jobData } : job
      ));
      setSelectedJob({ ...selectedJob, ...jobData });
    }
    setIsEditing(false);
  };

  const handleCreateJob = (jobData) => {
    setJobs([jobData, ...jobs]);
    setSelectedJob(jobData);
    setActiveTab('details');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <JobDetailsTab
            job={selectedJob}
            isEditing={isEditing}
            onSave={handleSaveJob}
            onCancel={handleCancelEdit}
            onEdit={handleEdit}
          />
        );
      case 'requirements':
        return (
          <JobRequirementsTab
            job={selectedJob}
            isEditing={isEditing}
            onSave={handleSaveJob}
            onCancel={handleCancelEdit}
            onEdit={handleEdit}
          />
        );
      case 'analysis':
        return <ResumeAnalysisTab job={selectedJob} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-full mx-auto">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Left Sidebar - Job List */}
            <div className="w-80 flex-shrink-0">
              <JobListSidebar
                jobs={jobs}
                selectedJob={selectedJob}
                onJobSelect={handleJobSelect}
                onCreateNew={handleCreateNew}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Breadcrumb */}
              <div className="p-6 pb-0">
                <Breadcrumb />
              </div>

              {/* Tab Navigation */}
              <div className="px-6 border-b border-border">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                        ${activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                        }
                      `}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                      {tab.id === 'analysis' && selectedJob && (
                        <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {selectedJob.applicants}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Creation Modal */}
      <JobCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSave={handleCreateJob}
      />

      {/* Quick Action Sidebar */}
      <QuickActionSidebar />
    </div>
  );
};

export default JobManagement;