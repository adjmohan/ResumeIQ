import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CandidateSourceChart = () => {
  const sourceData = [
    { name: 'Job Boards', value: 35, color: '#2563EB' },
    { name: 'Company Website', value: 28, color: '#0EA5E9' },
    { name: 'LinkedIn', value: 22, color: '#059669' },
    { name: 'Referrals', value: 10, color: '#D97706' },
    { name: 'Other', value: 5, color: '#64748B' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {`${payload[0].name}: ${payload[0].value}%`}
          </p>
          <p className="text-xs text-muted-foreground">
            {`${Math.round((payload[0].value / 100) * 245)} candidates`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Candidate Sources</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>This month</span>
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            <span>View Details</span>
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-lg font-bold text-foreground">245</p>
          <p className="text-xs text-muted-foreground">Total Candidates</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-lg font-bold text-foreground">5.2</p>
          <p className="text-xs text-muted-foreground">Avg Sources/Hire</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateSourceChart;