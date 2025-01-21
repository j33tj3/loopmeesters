"use client";

import { usePoll, Vote } from "@/utils/usePoll";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const PollById = ({ id }: { id: string }) => {
  const { data, isLoading } = usePoll(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { result } = data;
  const { date, time, title, trainer, is_training, location, votes } = result;

  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {is_training && <Typography variant="body2">Training</Typography>}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ backgroundColor: "#0a88ca" }}>
                <Typography variant="caption">{trainer}</Typography>
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  {date} {time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {votes.map((vote: Vote) => (
          // TODO: Add onClick logic to add or remove, show number of votes
          <Button key={vote.poll_option_id} variant="contained" sx={{ mt: 2 }}>
            {vote.description}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
