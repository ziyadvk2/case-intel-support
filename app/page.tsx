'use client';
import { useEffect, useState } from 'react';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketList from '../components/TicketList';
import { Ticket,TicketStatus, User } from '../types/Ticket';
import TicketDetails from '../components/TicketDetails';
import { mockTickets } from '@/mock/tickets';
import {mockUsers} from "@/mock/users"
import { Toaster, toast } from 'react-hot-toast';


export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [createNewTicketToggleButton, setCreateNewTicketToggleButton] = useState(false);

  const handleCreateTicket = (ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const handleNewTicketToggle = () => {
    setCreateNewTicketToggleButton(!createNewTicketToggleButton);
  };

  const handleStatusUpdate = (ticketId: number, newStatus: TicketStatus) => {
    toast.promise(
      new Promise<void>((resolve) => {
        setLoading(true);
        setTimeout(() => {
          setTickets((prevTickets) => {
            const updatedTickets = prevTickets.map((t) =>
              t.id === ticketId
                ? {
                    ...t,
                    status: newStatus,
                    updatedAt: new Date(),
                  }
                : t,
            );
            const updatedSelected = updatedTickets.find((t) => t.id === ticketId) || null;
            setSelectedTicket(updatedSelected);
            resolve();
            return updatedTickets;
          });
          setLoading(false);
        }, 1500);
      }),
      {
        loading: 'Updating ticket status...',
        success: `Ticket status updated to ${newStatus}`,
        error: 'Failed to update ticket status',
      },
    );
  };

  const handleAssignUser = (ticketId: number, userId: number) => {
    toast.promise(
      new Promise<void>((resolve) => {
        setLoading(true);
        setTimeout(() => {
          setTickets((prevTickets) => {
            const updatedTickets = prevTickets.map((t) =>
              t.id === ticketId
                ? {
                    ...t,
                    assignedTo: userId,
                    updatedAt: new Date(),
                  }
                : t,
            );
            const updatedSelected = updatedTickets.find((t) => t.id === ticketId) || null;
            setSelectedTicket(updatedSelected);
            resolve();
            return updatedTickets;
          });
          setLoading(false);
        }, 1500);
      }),
      {
        loading: 'Assigning user...',
        success: 'User assigned successfully',
        error: 'Failed to assign user',
      },
    );
  };

  useEffect(() => {
    const fetchTickets = () => {
      setTimeout(() => {
        setTickets(mockTickets);
        setUsers(mockUsers); // Use mockUsers here
        setLoading(false);
      }, 1500);
    };

    fetchTickets();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <Toaster position="top-center" />
      <div className="text-right">
        {!createNewTicketToggleButton ? (
          <button
            className="w-auto h-auto p-2 bg-blue-700 text-white font-semibold"
            onClick={handleNewTicketToggle}
          >
            Create New Ticket
          </button>
        ) : (
          <button
            className="w-56 h-10 bg-white text-blue-700 font-semibold"
            onClick={handleNewTicketToggle}
          >
            Close
          </button>
        )}
      </div>
      {createNewTicketToggleButton && <CreateTicketForm onCreate={handleCreateTicket} />}
      <h2 className="text-center font-bold mb-4">Ticket List</h2>
      <TicketList tickets={tickets} onSelect={setSelectedTicket} selectedTicketId={selectedTicket?.id?.toString() ?? null}/>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <TicketDetails
          ticket={selectedTicket}
          users={users}
          onStatusUpdate={handleStatusUpdate}
          onAssignUser={handleAssignUser}
        />
      )}
    </main>
  );
}