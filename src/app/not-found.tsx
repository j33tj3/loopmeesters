import { CardWrapper } from "@/components/layout/Card";
import { Box, Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <Box sx={{ padding: { xs: 4, md: 6 } }}>
      <CardWrapper>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Ojee, dat wordt alleen hardlopen...
        </Typography>
      </CardWrapper>
    </Box>
  );
}

export default NotFoundPage;
