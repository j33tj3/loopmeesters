import { useQuery } from "@tanstack/react-query";

const fetchPolls = async () => {
  const response = await fetch("http://ben-erbij.guidodiepen.nl:9898/polls/");
  if (!response.ok) {
    throw new Error("Failed to fetch polls");
  }
  return response.json();
};

export const usePolls = () => {
  return useQuery({ queryKey: ["polls"], queryFn: fetchPolls });
};

export interface Polls {
  success: boolean;
  result: Poll[];
  error_message: string;
}

export interface Poll {
  id: string;
  date: string;
  created_at: string;
  time: string;
  trainer: string;
  location: string;
  title: string;
}
