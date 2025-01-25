import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      component="div"
      className="absolute w-full h-full flex justify-center items-center"
    >
      <CircularProgress />
    </Box>
  );
};
