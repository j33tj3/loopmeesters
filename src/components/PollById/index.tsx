"use client";

import { UserData } from "@/app/[id]/page";
import { usePoll, Vote } from "@/utils/usePoll";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { Add, CheckCircle, Lens } from "@mui/icons-material";
import { useEffect, useState } from "react";

type VoteData = {
  user_id: string;
  user_name: string;
  poll_option_id: string;
  cancel_vote: boolean;
};

interface PollByIdProps {
  id: string;
  userData: UserData;
}

export const PollById: React.FC<PollByIdProps> = ({ id, userData }) => {
  const { data, isLoading } = usePoll(id);
  const queryClient = useQueryClient();
  const [localVotes, setLocalVotes] = useState<Vote[] | null>(null);
  const [newPollOption, setNewPollOption] = useState("");

  const voteMutation = useMutation({
    mutationFn: (voteData: VoteData) =>
      axios.post(`https://ben-erbij.guidodiepen.nl/api/vote/${id}`, voteData),
    onSuccess: () => {
      // Refetch the poll data after a vote is submitted
      queryClient.invalidateQueries({ queryKey: ["poll", id] });
    },
  });

  const pollOtionMutation = useMutation({
    mutationFn: (pollOptionData: { poll_id: string; description: string }) =>
      axios.post(
        `https://ben-erbij.guidodiepen.nl/api/poll_option/`,
        pollOptionData
      ),
    onSuccess: () => {
      // Refetch the poll data after a new option is added
      queryClient.invalidateQueries({ queryKey: ["poll", id] });
    },
  });

  useEffect(() => {
    // Sync localVotes with the fetched data on initial load or when data changes
    if (data) {
      setLocalVotes(data.result.votes);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { result } = data;
  const { date, time, title, trainer, is_training, location, votes } = result;
  const { name, uuid } = userData;

  const currentVotes = localVotes || votes;

  const handleVote = (vote: Vote) => {
    const userVoted = vote.users.some((user) => user.id === uuid);

    voteMutation.mutate({
      user_id: uuid,
      user_name: name,
      poll_option_id: vote.poll_option_id,
      cancel_vote: userVoted, // Cancel vote if already voted
    });

    // Optimistic update for instant feedback
    setLocalVotes((prevVotes) => {
      if (!prevVotes) return votes;

      return prevVotes.map((v) => {
        if (v.poll_option_id === vote.poll_option_id) {
          if (userVoted) {
            // Remove the user's vote
            return {
              ...v,
              users: v.users.filter((user) => user.id !== uuid),
            };
          } else {
            // Add the user's vote
            return {
              ...v,
              users: [...v.users, { id: uuid, name }],
            };
          }
        }
        return v;
      });
    });
  };

  const handleNewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPollOption(event.target.value);
  };

  const handleAddOption = () => {
    const newOption = {
      poll_id: id,
      description: newPollOption,
    };

    pollOtionMutation.mutate(newOption, {
      onSuccess: () => {
        setLocalVotes((prev) => [
          ...(prev || []),
          {
            poll_option_id: newOption.poll_id,
            description: newOption.description,
            users: [],
            number_votes: 0,
          },
        ]);
        setNewPollOption(""); // Clear input field
        queryClient.invalidateQueries({ queryKey: ["poll", id] });
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {currentVotes.map((vote: Vote) => {
          const userVoted = vote.users.some((user) => user.id === uuid);
          return (
            <Button
              key={vote.poll_option_id}
              variant="contained"
              onClick={() => handleVote(vote)}
              sx={{
                textTransform: "none",
                padding: 2,
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    sx={{
                      typography: "body1",
                      textAlign: "left",
                      lineHeight: 1.25,
                      fontWeight: "bold",
                    }}
                  >
                    {vote.description}
                  </Box>
                  <Box
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {vote.users.map((user, index) => (
                      <Box
                        sx={{
                          typography: "subtitle2",
                          textTransform: "capitalize",
                          lineHeight: 1.25,
                          display: "inline",
                        }}
                        key={index}
                      >
                        {user.name}
                        {index < vote.users.length - 1 && ", "}
                      </Box>
                    ))}
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
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <TextField
          label="Voeg een optie toe"
          name="nieuwe-optie"
          fullWidth
          value={newPollOption}
          onChange={handleNewOptionChange}
        />
        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          sx={{ width: "fit-content" }}
          onClick={handleAddOption}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
