import React from 'react';
import { Ticket, User } from '../types/Ticket';
import TicketStatusBadge from './TicketStatusBadge';

interface Props {
  ticket: Ticket;
  users: User[];
}

const TicketItem: React.FC<Props> = ({ ticket, users }) => {
  // Find the assigned user by matching ticket.assignedTo with user.id
  const assignedUser = users.find((user) => user.id === ticket.assignedTo);

  return (
    <div>
      <h4>{ticket.subject}</h4>
      <p>
        Status: <TicketStatusBadge status={ticket.status} />
      </p>
      <p>Priority: {ticket.priority}</p>
      {assignedUser ? <p>Assigned To: {assignedUser.name}</p> : <p>Assigned To: Not assigned</p>}
    </div>
  );
};

export default TicketItem;
