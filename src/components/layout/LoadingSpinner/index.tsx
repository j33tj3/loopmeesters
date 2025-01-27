import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
