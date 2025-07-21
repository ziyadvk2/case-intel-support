'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router's useRouter
import TicketList from '../../../components/TicketList';
import { Ticket, User } from '../../../types/Ticket';
import { mockTickets } from '@/mock/tickets';
import { mockUsers } from '@/mock/users';

export default function TicketListPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTickets(mockTickets);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSelectTicket = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h2 className="text-center font-bold mb-4">Ticket List</h2>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <TicketList tickets={tickets} onSelect={handleSelectTicket} selectedTicketId={null}  />
      )}
    </main>
  );
}
