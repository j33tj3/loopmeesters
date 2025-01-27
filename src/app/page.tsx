import PollsList from "@/components/PollsList";
import { Button, Card } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: "100%", md: "80%" },
          bgcolor: "background.default",
          margin: "auto",
          marginTop: { xs: 2, md: 4 },
          marginBottom: { xs: 2, md: 4 },
          boxShadow: { xs: 0, md: 2 },
        }}
      >
        <PollsList />
      </Card>
      <Button
        variant="contained"
        sx={{ marginX: "auto", maxWidth: { xs: "100%", md: "80%" } }}
        href="/create-poll"
      >
        Maak poll aan
      </Button>
    </>
  );
}
