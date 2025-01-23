import PollForm from "@/components/CreatePoll";
import { Box, Typography } from "@mui/material";

export default function CreatePollPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create poll
      </Typography>
      <PollForm />
    </Box>
  );
}
