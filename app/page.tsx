'use client';

import React, { useState } from 'react';
import { useTicketContext } from './context/TicketContext';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketList from '../components/TicketList';
import { useRouter } from 'next/navigation';
import { Ticket } from '@/types/Ticket';

export default function TicketsPage() {
  const { tickets,users, loading, createTicket } = useTicketContext();
  const [createNewTicketToggleButton, setCreateNewTicketToggleButton] = useState(false);
  const router = useRouter();

  const handleSelectTicket = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <div className="text-right mb-4">
        {!createNewTicketToggleButton ? (
          <button
            className="w-auto h-auto p-2 bg-blue-700 text-white font-semibold"
            onClick={() => setCreateNewTicketToggleButton(true)}
          >
            Create New Ticket
          </button>
        ) : (
          <button
            className="w-56 h-10 bg-white text-blue-700 font-semibold"
            onClick={() => setCreateNewTicketToggleButton(false)}
          >
            Close
          </button>
        )}
      </div>

      {createNewTicketToggleButton && <CreateTicketForm onCreate={createTicket} onClose={()=>setCreateNewTicketToggleButton(false)}/>}

      <h2 className="text-center font-bold mb-4">Ticket List</h2>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <TicketList
          tickets={tickets}
          users={users}
          onSelect={handleSelectTicket}
          selectedTicketId={null}
        />
      )}
    </main>
  );
}
