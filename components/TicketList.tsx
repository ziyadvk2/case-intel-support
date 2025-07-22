import React from 'react';
import { Ticket, User } from '../types/Ticket';
import TicketItem from './TicketItem';

interface Props {
  tickets: Ticket[];
  users: User[];
  selectedTicketId: string | null;
  onSelect?: (ticket: Ticket) => void;
}

const TicketList: React.FC<Props> = ({ tickets, users, selectedTicketId, onSelect }) => {
  return (
    <div>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className={`p-2 m-1 mb-2 border ${
            String(ticket.id) === selectedTicketId ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
          } cursor-pointer`}
          onClick={() => onSelect?.(ticket)}
        >
          <TicketItem ticket={ticket} users={users} />
        </div>
      ))}
    </div>
  );
};

export default TicketList;
