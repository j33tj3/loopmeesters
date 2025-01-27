import { useQuery } from "@tanstack/react-query";

const fetchTrainers = async () => {
  const response = await fetch("/nextjs_api/trainers");
  if (!response.ok) {
    throw new Error("Failed to fetch trainers");
  }
  return response.json();
};

export const useTrainers = () => {
  return useQuery({ queryKey: ["trainers"], queryFn: fetchTrainers });
};
