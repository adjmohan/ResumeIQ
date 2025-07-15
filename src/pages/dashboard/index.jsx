import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import HiringFunnelChart from './components/HiringFunnelChart';
import CandidateSourceChart from './components/CandidateSourceChart';
import TeamCollaboration from './components/TeamCollaboration';

const Dashboard = () => {
  const metricsData = [
    {
      title: 'Active Job Postings',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'Briefcase',
      iconColor: 'bg-primary'
    },
    {
      title: 'Total Resumes Processed',
      value: '1,247',
      change: '+8%',
      changeType: 'positive',
      icon: 'FileText',
      iconColor: 'bg-accent'
    },
    {
      title: 'Pending Reviews',
      value: '89',
      change: '-15%',
      changeType: 'negative',
      icon: 'Clock',
      iconColor: 'bg-warning'
    },
    {
      title: 'Match Success Rate',
      value: '87%',
      change: '+3%',
      changeType: 'positive',
      icon: 'Target',
      iconColor: 'bg-success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActionSidebar />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your recruitment activities and team performance.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                iconColor={metric.iconColor}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-8">
              <ActivityFeed />
            </div>
            
            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-4">
              <QuickActionsPanel />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <HiringFunnelChart />
            <CandidateSourceChart />
          </div>

          {/* Team Collaboration */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TeamCollaboration />
            </div>
            
            {/* Additional Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Time to Hire</span>
                  <span className="text-sm font-medium text-foreground">14 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interview Conversion</span>
                  <span className="text-sm font-medium text-foreground">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Offer Acceptance</span>
                  <span className="text-sm font-medium text-foreground">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Candidates</span>
                  <span className="text-sm font-medium text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month Hires</span>
                  <span className="text-sm font-medium text-foreground">18</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <button 
                  onClick={() => window.location.href = '/candidate-ranking-results'}
                  className="w-full text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  View Detailed Analytics →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;