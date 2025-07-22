import React, { useState } from 'react';
import { Ticket, TicketPriority, TicketStatus } from '../types/Ticket';
import toast from 'react-hot-toast';

interface Props {
  onCreate: (ticket: Ticket) => void;
  onClose?:()=> void;
}

const CreateTicketForm: React.FC<Props> = ({ onCreate,onClose }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>(TicketPriority.MEDIUM);
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.OPEN);
  const [assignedTo, setAssignedTo] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [engagementId, setEngagementId] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   if (!subject || !description || !assignedTo || !userId) {
      toast.error('Please fill all required fields'); // ✅ Optional error toast
      return;
    }

    const newTicket: Ticket = {
      id: Math.floor(Math.random() * 100000), 
      userId,
      engagementId,
      subject,
      description,
      status,
      priority,
      assignedTo,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onCreate(newTicket);
    toast.success('Ticket created successfully!');

    setSubject('');
    setDescription('');
    setPriority(TicketPriority.MEDIUM);
    setStatus(TicketStatus.OPEN);
    setAssignedTo(0);
    setUserId(0);
    setEngagementId(0);
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold mb-4 text-center">Create New Ticket</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Subject *"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Assignee User ID *"
          value={assignedTo || ''}
          onChange={(e) => setAssignedTo(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Your User ID *"
          value={userId || ''}
          onChange={(e) => setUserId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Engagement ID"
          value={engagementId || ''}
          onChange={(e) => setEngagementId(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value={TicketPriority.LOW}>Low</option>
          <option value={TicketPriority.MEDIUM}>Medium</option>
          <option value={TicketPriority.HIGH}>High</option>
          <option value={TicketPriority.URGENT}>Urgent</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TicketStatus)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value={TicketStatus.OPEN}>Open</option>
          <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
          <option value={TicketStatus.RESOLVED}>Resolved</option>
          <option value={TicketStatus.CLOSED}>Closed</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Create Ticket
      </button>
    </form>
  );
};

export default CreateTicketForm;