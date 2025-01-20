"use client";

import { Poll, usePolls } from "@/utils/usePolls";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PollsList = () => {
  const { data, isLoading, error } = usePolls();

  if (isLoading)
    return (
      <Box
        component="div"
        className="absolute w-full h-full flex justify-center items-center"
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error: {error.message}</p>;

  const { result } = data;

  return (
    <Box component="div" className="relative  w-full h-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Trainer</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((poll: Poll) => (
            <TableRow key={poll.id}>
              <TableCell>{poll.date}</TableCell>
              <TableCell>{poll.time}</TableCell>
              <TableCell>{poll.trainer}</TableCell>
              <TableCell>{poll.location}</TableCell>
              <TableCell>{poll.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PollsList;
