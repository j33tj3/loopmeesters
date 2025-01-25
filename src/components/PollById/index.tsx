"use client";

import { UserData } from "@/app/[id]/page";
import { usePoll, Vote } from "@/utils/usePoll";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { CheckCircle, Lens } from "@mui/icons-material";

type VoteData = {
  user_id: string;
  user_name: string;
  poll_option_id: string;
  cancel_vote: false;
};

interface PollByIdProps {
  id: string;
  userData: UserData;
}

export const PollById: React.FC<PollByIdProps> = ({ id, userData }) => {
  const { data, isLoading } = usePoll(id);

  const mutation = useMutation({
    mutationFn: (voteData: VoteData) =>
      axios.post(`https://ben-erbij.guidodiepen.nl/api/vote/${id}`, voteData),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { result } = data;
  const { date, time, title, trainer, is_training, location, votes } = result;
  const { name, uuid } = userData;

  console.log(result);

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
        {votes.map((vote: Vote) => {
          // check if user has already voted for this option
          const userVoted = vote.users.some((user) => user.id === uuid);

          return (
            <Button
              key={vote.poll_option_id}
              variant="contained"
              sx={{ mt: 2 }}
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate({
                  user_id: uuid,
                  user_name: name,
                  poll_option_id: vote.poll_option_id,
                  cancel_vote: false,
                });
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Box>{userVoted ? <CheckCircle /> : <Lens />}</Box>
                <Box>
                  <Box>
                    <Typography variant="h6" component="span">
                      {vote.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Typography variant="caption">
                      {vote.users.map((user, index) => (
                        <span key={index}>
                          {user.name}
                          {index < vote.users.length - 1 && ", "}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  <Typography variant="h5" component="span">
                    {vote.users.length}
                  </Typography>
                </Box>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
