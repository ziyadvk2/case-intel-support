'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TicketDetails from '../../../components/TicketDetails';
import { useTicketContext } from '../../context/TicketContext';
import { TicketStatus, Ticket } from '../../../types/Ticket';
import { Toaster, toast } from 'react-hot-toast';

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tickets, users, loading, updateTicketStatus, updateTicketAssignedTo } = useTicketContext();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!loading) {
      const found = tickets.find((t) => t.id === Number(id));
      setTicket(found || null);
    }
  }, [id, tickets, loading]);

  const handleStatusUpdate = (ticketId: number, newStatus: TicketStatus) => {
    toast.promise(
      new Promise<void>((resolve) => {
        updateTicketStatus(ticketId, newStatus);
        resolve();
      }),
      {
        loading: 'Updating ticket status...',
        success: `Ticket status updated to ${newStatus}`,
        error: 'Failed to update ticket status',
      }
    );
  };

  const handleAssignUser = (ticketId: number, userId: number) => {
    toast.promise(
      new Promise<void>((resolve) => {
        updateTicketAssignedTo(ticketId, userId);
        resolve();
      }),
      {
        loading: 'Assigning user...',
        success: 'User assigned successfully',
        error: 'Failed to assign user',
      }
    );
  };

  if (loading) return <p>Loading ticket...</p>;
  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <button
        onClick={() => router.push('/')}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        Back to Tickets
      </button>
      <TicketDetails
        ticket={ticket}
        users={users}
        onStatusUpdate={handleStatusUpdate}
        onAssignUser={handleAssignUser}
      />
      <Toaster position="top-center" />
    </main>
  );
}
