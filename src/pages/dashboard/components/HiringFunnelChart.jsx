import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const HiringFunnelChart = () => {
  const funnelData = [
    { stage: 'Applications', count: 245, color: '#2563EB' },
    { stage: 'Screened', count: 156, color: '#0EA5E9' },
    { stage: 'Interviewed', count: 89, color: '#059669' },
    { stage: 'Offers', count: 34, color: '#D97706' },
    { stage: 'Hired', count: 18, color: '#DC2626' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`${label}: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">
            {payload[0].value > 0 && label !== 'Applications' 
              ? `${((payload[0].value / 245) * 100).toFixed(1)}% of total applications`
              : 'Total applications received'
            }
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Hiring Funnel</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Last 30 days</span>
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            <span>Change Period</span>
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={funnelData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="stage" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-4">
        {funnelData.map((stage, index) => (
          <div key={stage.stage} className="text-center">
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: stage.color }}
            />
            <p className="text-xs text-muted-foreground">{stage.stage}</p>
            <p className="text-sm font-medium text-foreground">{stage.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringFunnelChart;