"use client";

import { Poll, usePolls } from "@/hooks/usePolls";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PollsList = () => {
  const { data, isLoading, error } = usePolls();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const { result } = data;

  // use MUI table to display the polls
  return (
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
  );
};

export default PollsList;
