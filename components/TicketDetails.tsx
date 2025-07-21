import React from 'react';
import TicketStatusBadge from './TicketStatusBadge';
import { Ticket, TicketStatus, User } from '../types/Ticket';

interface Props {
  ticket: Ticket | null;
  users: User[];
  onStatusUpdate: (ticketId: number, newStatus: TicketStatus) => void;
  onAssignUser: (ticketId: number, userId: number) => void;
}

export default function TicketDetails({ ticket, users, onStatusUpdate, onAssignUser }: Props) {
  if (!ticket) return <div>Select a ticket to view details.</div>;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusUpdate(ticket.id, e.target.value as TicketStatus);
  };

  const handleAssignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value ? Number(e.target.value) : undefined;
    if (userId) {
      onAssignUser(ticket.id, userId);
    }
  };

  const assignedUser = users.find(u => u.id === ticket.assignedTo);

  return (
    <div className="border p-4 rounded-lg bg-white shadow mt-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
      <p className="mb-2">{ticket.description}</p>
      <div className="mb-2">
        <strong>Status: </strong>
        <TicketStatusBadge status={ticket.status} />
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value={TicketStatus.OPEN}>Open</option>
          <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
          <option value={TicketStatus.RESOLVED}>Resolved</option>
          <option value={TicketStatus.CLOSED}>Closed</option>
        </select>
      </div>
      <p className="mb-2">
        <strong>Priority:</strong> {ticket.priority}
      </p>
      <div className="mb-2">
        <strong>Assigned To:</strong>
        <select
          value={ticket.assignedTo ?? ''}
          onChange={handleAssignChange}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {assignedUser && (
          <span className="ml-2 text-blue-700 font-semibold">
            Assigned to: {assignedUser.name}
          </span>
        )}
      </div>
      <p className="mb-2">
        <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Last Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}