"use client";

import { useTrainers } from "@/utils/useTrainers";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box } from "@mui/material";

interface TrainerAvatarProps {
  trainer: string;
}

export const TrainerAvatar: React.FC<TrainerAvatarProps> = ({ trainer }) => {
  const { data: trainers } = useTrainers();
  const trainerId = trainers && trainers.indexOf(trainer);
  console.log(trainerId);

  if (trainerId === -1) {
    return (
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountCircle className="size-10 fill-white" />
      </Box>
    );
  }

  if (trainerId === 4) {
    return (
      <AvatarGroup>
        <Avatar src={`/trainers/3.jpg`} alt={trainers[3]} className="size-10" />
        <Avatar src={`/trainers/2.jpg`} alt={trainers[4]} className="size-10" />
      </AvatarGroup>
    );
  }

  return (
    <Avatar
      src={`/trainers/${trainerId}.jpg`}
      alt={trainer}
      className="size-10"
    />
  );
};
