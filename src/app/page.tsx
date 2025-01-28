"use client";

import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import PollsList from "@/components/PollsList";
import { usePolls } from "@/utils/usePolls";
import { Box, Button } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function HomePage() {
  const { data, isLoading } = usePolls();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: { xs: 2, md: 4 },
        backgroundColor: { xs: blue[50], md: "unset" },
      }}
    >
      <PollsList data={data} />
      {!isLoading && (
        <Button
          variant="contained"
          sx={{ maxWidth: { xs: "100%", md: "80%" } }}
          href="/create-poll"
          fullWidth
        >
          Maak poll aan
        </Button>
      )}
    </Box>
  );
}
