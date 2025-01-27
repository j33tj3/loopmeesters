import { useQuery } from "@tanstack/react-query";

const fetchPoll = async (id: string) => {
  const response = await fetch(`/nextjs_api/poll/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch poll");
  }
  return response.json();
};

export const usePoll = (id: string) => {
  return useQuery({ queryKey: ["polls", id], queryFn: () => fetchPoll(id) });
};

export interface PollId {
  success: true;
  result: {
    id: string;
    is_training: true;
    date: string;
    time: string;
    trainer: string;
    location: string;
    title: string;
    votes: Vote[];
  };
  error_message: string;
}

export interface Vote {
  description: string;
  poll_option_id: string;
  number_votes: number;
  users: User[];
}

export interface User {
  id: string;
  name: string;
}
