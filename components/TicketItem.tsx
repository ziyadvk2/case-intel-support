import React from 'react';
import { Ticket } from '../types/Ticket';
import TicketStatusBadge from './TicketStatusBadge';

interface Props {
  ticket: Ticket;
}

const TicketItem: React.FC<Props> = ({ ticket }) => {
  return (
    <div>
      <h4>{ticket.subject}</h4>
      <p>
        Status: <TicketStatusBadge status={ticket.status} />{' '}
      </p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default TicketItem;
