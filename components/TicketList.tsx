import React, { useEffect, useRef } from 'react';
import { Ticket } from '../types/Ticket';
import TicketItem from './TicketItem';

interface Props {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelect?: (ticket: Ticket) => void;
}

const TicketList: React.FC<Props> = ({ tickets, selectedTicketId, onSelect }) => {
  const ticketRefs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    if (selectedTicketId && ticketRefs.current[selectedTicketId]) {
      ticketRefs.current[selectedTicketId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedTicketId]);
  return (
    <div>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          ref={(el) => {
            ticketRefs.current[ticket.id] = el;
          }}
          className={`p-2 m-1 mb-2 border ${
            String(ticket.id) === selectedTicketId ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
          }`}
          onClick={() => onSelect?.(ticket)}
        >
          <TicketItem ticket={ticket} />
        </div>
      ))}
    </div>
  );
};

export default TicketList;
