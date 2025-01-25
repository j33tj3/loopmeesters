"use client";

import { Poll, usePolls } from "@/utils/usePolls";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../layout/LoadingSpinner";

const PollsList = () => {
  const router = useRouter();
  const { data, isLoading, error } = usePolls();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const { result } = data;

  const desktopOnly = { display: { xs: "none", sm: "table-cell" } };

  return (
    <Box component="div" className="relative  w-full h-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell sx={desktopOnly}>Time</TableCell>
            <TableCell sx={desktopOnly}>Trainer</TableCell>
            <TableCell sx={desktopOnly}>Location</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((poll: Poll) => (
            <TableRow
              key={poll.id}
              onClick={() => router.push(`/${poll.id}`)}
              className="cursor-pointer hover:bg-blue-100"
            >
              <TableCell>{poll.date}</TableCell>
              <TableCell sx={desktopOnly}>{poll.time}</TableCell>
              <TableCell sx={desktopOnly}>{poll.trainer}</TableCell>
              <TableCell sx={desktopOnly}>{poll.location}</TableCell>
              <TableCell>{poll.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PollsList;
