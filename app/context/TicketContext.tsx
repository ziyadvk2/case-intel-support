'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Ticket, User, TicketStatus } from '../../types/Ticket';
import { mockTickets } from '../../mock/tickets';
import { mockUsers } from '../../mock/users';

interface TicketContextType {
  tickets: Ticket[];
  users: User[];
  loading: boolean;
  createTicket: (ticket: Ticket) => void;
  updateTicketStatus: (ticketId: number, status: TicketStatus) => void;
  updateTicketAssignedTo: (ticketId: number, userId: number) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTickets(mockTickets);
      setUsers(mockUsers);
      setLoading(false);
    }, 1500);
  }, []);

  const createTicket = (ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const updateTicketStatus = (ticketId: number, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status, updatedAt: new Date() } : t
      )
    );
  };

  const updateTicketAssignedTo = (ticketId: number, userId: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, assignedTo: userId, updatedAt: new Date() } : t
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        users,
        loading,
        createTicket,
        updateTicketStatus,
        updateTicketAssignedTo,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};
