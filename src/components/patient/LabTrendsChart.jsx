import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export function LabTrendsChart({ labTrends }) {
  const [selectedMetric, setSelectedMetric] = useState('fastingGlucose');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!labTrends) return null;

  const metricConfigs = {
    fastingGlucose: {
      name: 'Fasting Blood Glucose',
      unit: 'mg/dL',
      normalRange: '70 - 99 mg/dL',
      thresholdHigh: 100,
      data: labTrends.fastingGlucose || [],
      color: '#0284c7',
      gradientId: 'glucoseGradient'
    },
    hba1c: {
      name: 'HbA1c (Glycated Hemoglobin)',
      unit: '%',
      normalRange: '< 5.7 % (Pre-diabetic 5.7 - 6.4%)',
      thresholdHigh: 5.7,
      data: labTrends.hba1c || [],
      color: '#0d9488',
      gradientId: 'hba1cGradient'
    },
    bloodPressureSystolic: {
      name: 'Systolic Blood Pressure',
      unit: 'mmHg',
      normalRange: '< 120 mmHg (Pre-HTN 120-139)',
      thresholdHigh: 120,
      data: labTrends.bloodPressureSystolic || [],
      color: '#7c3aed',
      gradientId: 'bpGradient'
    },
    totalCholesterol: {
      name: 'Total Cholesterol',
      unit: 'mg/dL',
      normalRange: '< 200 mg/dL (Desirable)',
      thresholdHigh: 200,
      data: labTrends.totalCholesterol || [],
      color: '#d97706',
      gradientId: 'cholGradient'
    }
  };

  const activeConfig = metricConfigs[selectedMetric];
  const dataset = activeConfig.data;

  // Chart coordinate computations
  const width = 640;
  const height = 220;
  const paddingX = 45;
  const paddingY = 30;

  const values = dataset.map(d => d.value);
  const minVal = values.length ? Math.min(...values) * 0.85 : 0;
  const maxVal = values.length ? Math.max(...values) * 1.15 : 100;

  const getX = (idx) => {
    if (dataset.length <= 1) return width / 2;
    return paddingX + (idx / (dataset.length - 1)) * (width - paddingX * 2);
  };

  const getY = (val) => {
    return height - paddingY - ((val - minVal) / (maxVal - minVal || 1)) * (height - paddingY * 2);
  };

  // Build SVG Path
  const points = dataset.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPoints = dataset.length 
    ? `${points} ${getX(dataset.length - 1)},${height - paddingY} ${getX(0)},${height - paddingY}`
    : '';

  const firstVal = dataset[0]?.value;
  const latestVal = dataset[dataset.length - 1]?.value;
  const diff = latestVal !== undefined && firstVal !== undefined ? (latestVal - firstVal).toFixed(1) : 0;
  const isImproved = selectedMetric === 'bloodPressureSystolic' || selectedMetric === 'fastingGlucose' || selectedMetric === 'hba1c' || selectedMetric === 'totalCholesterol'
    ? Number(diff) <= 0 
    : Number(diff) >= 0;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Metric Selector Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} color="var(--primary)" />
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Biomarker & Lab Result Trends Over Time
          </h3>
        </div>

        <div style={{
          display: 'flex',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '3px',
          gap: '4px'
        }}>
          {Object.keys(metricConfigs).map(key => {
            const cfg = metricConfigs[key];
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: isSelected ? 'var(--bg-surface)' : 'transparent',
                  color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {cfg.name.split(' ')[0]} {cfg.name.includes('HbA1c') ? 'HbA1c' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        background: 'var(--bg-subtle)',
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)'
      }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Current Reading</span>
          <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
            {latestVal} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{activeConfig.unit}</span>
          </strong>
        </div>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Baseline / Initial</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {firstVal} {activeConfig.unit}
          </span>
        </div>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Net Trajectory</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            {isImproved ? (
              <span className="badge badge-emerald">
                <TrendingDown size={13} /> {diff} {activeConfig.unit} (Improved)
              </span>
            ) : (
              <span className="badge badge-amber">
                <TrendingUp size={13} /> +{diff} {activeConfig.unit}
              </span>
            )}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Target Reference Range</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', marginTop: '2px', display: 'block' }}>
            {activeConfig.normalRange}
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart Canvas */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeConfig.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={activeConfig.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="var(--border-medium)" />

          {/* Area under curve */}
          {dataset.length > 1 && (
            <polygon points={areaPoints} fill={`url(#${activeConfig.gradientId})`} />
          )}

          {/* Polyline */}
          {dataset.length > 1 && (
            <polyline
              points={points}
              fill="none"
              stroke={activeConfig.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive Data Nodes */}
          {dataset.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredIndex === i;

            return (
              <g 
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Node Circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 4.5}
                  fill="var(--bg-surface)"
                  stroke={activeConfig.color}
                  strokeWidth={isHovered ? 3 : 2}
                  style={{ transition: 'all 0.15s ease' }}
                />

                {/* X-axis Date label */}
                <text
                  x={cx}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-muted)"
                  fontWeight={isHovered ? '700' : '500'}
                >
                  {d.date}
                </text>

                {/* Value tooltip above point */}
                {isHovered && (
                  <g>
                    <rect
                      x={cx - 45}
                      y={cy - 34}
                      width="90"
                      height="24"
                      rx="6"
                      fill="var(--text-main)"
                      opacity="0.9"
                    />
                    <text
                      x={cx}
                      y={cy - 18}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#ffffff"
                      fontWeight="700"
                    >
                      {d.value} {activeConfig.unit}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
