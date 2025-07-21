export interface User { 
  id: number; 
  name: string; 
  email: string; 
  role: 'CLIENT' | 'AGENT' | 'ADMIN'; 
} 

export interface Client { 
  id: number; 
  name: string; 
  contactEmail: string; 
}

export interface Service { 
  id: number; 
  name: string; 
  description: string; 
  cost: number; 
} 

export interface Engagement { 
  id: number; 
  clientId: number; 
  services: Service[]; 
  startDate: Date; 
  endDate?: Date; 
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'; 
} 

export interface Ticket { 
  id: number; 
  userId: number; 
  engagementId?: number; 
  subject: string; 
  description: string; 
  status: TicketStatus; 
  priority: TicketPriority; 
  assignedTo?: number; 
  comments: Comment[]; 
  createdAt: Date; 
  updatedAt: Date; 
} 

export interface Comment { 
  authorId: number; 
  message: string; 
  timestamp: Date; 
} 

export enum TicketPriority { 
  LOW = 'LOW', 
  MEDIUM = 'MEDIUM', 
  HIGH = 'HIGH', 
  URGENT = 'URGENT' 
} 

export enum TicketStatus { 
  OPEN = 'OPEN', 
  IN_PROGRESS = 'IN_PROGRESS', 
  RESOLVED = 'RESOLVED', 
  CLOSED = 'CLOSED' 
}