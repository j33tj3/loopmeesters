import PollForm from "@/components/CreatePoll";
import { CardWrapper } from "@/components/layout/Card";
import { Typography } from "@mui/material";

export default function CreatePollPage() {
  return (
    <CardWrapper>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ marginBottom: 2 }}
      >
        Maak een poll aan:
      </Typography>
      <PollForm />
    </CardWrapper>
  );
}
