import React from 'react'; 
 
type Status = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'; 
 
interface Props { 
  status: Status; 
} 
 
const statusStyles: Record<Status, { label: string; color: string }> = { 
  OPEN: { label: 'Open', color: '#9ca3af' },         // Gray 
  IN_PROGRESS: { label: 'In Progress', color: '#3b82f6' }, // Blue 
  RESOLVED: { label: 'Resolved', color: '#10b981' }, // Green 
  CLOSED: { label: 'Closed', color: '#ef4444' },     // Red 
}; 
 
export default function TicketStatusBadge({ status }: Props) { 
  const style = { 
    backgroundColor: statusStyles[status].color, 
    padding: '4px 8px', 
    borderRadius: '999px', 
    color: 'white', 
    fontSize: '0.75rem', 
    fontWeight: 600, 
    display: 'inline-block', 
  }; 
 
  return <span style={style}>{statusStyles[status].label}</span>; 
} 