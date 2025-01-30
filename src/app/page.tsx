"use client";

import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import PollsList from "@/components/PollsList";
import { usePolls } from "@/utils/usePolls";
import { Box, Button } from "@mui/material";

export default function HomePage() {
  const { data, isLoading } = usePolls();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        marginX: "auto",
        padding: { xs: 2, md: 4 },
        maxWidth: { xs: "100%", md: "80%" },
      }}
    >
      {data && <PollsList data={data} />}
      {!isLoading && (
        <Button variant="contained" href="/create-poll" fullWidth>
          Maak ben-erij aan
        </Button>
      )}
    </Box>
  );
}
