import PollForm from "@/components/CreatePoll";
import { CardWrapper } from "@/components/layout/Card";
import { Box, Typography } from "@mui/material";

export default function CreatePollPage() {
  return (
    <Box sx={{ padding: { xs: 0.5, md: 4 } }}>
      <CardWrapper>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Maak een ben-erbij aan:
        </Typography>
        <PollForm />
      </CardWrapper>
    </Box>
  );
}
