import { useQuery } from "@tanstack/react-query";

const fetchLocations = async () => {
  const response = await fetch("/nextjs_api/locations");
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  return response.json();
};

export const useLocations = () => {
  return useQuery({ queryKey: ["locations"], queryFn: fetchLocations });
};
