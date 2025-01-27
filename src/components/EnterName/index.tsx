import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export const EnterName = ({
  onSubmit,
}: {
  onSubmit: (name: string) => void;
}) => {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = () => {
    if (nameInput.trim()) {
      onSubmit(nameInput.trim());
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        What&apos;s your name?
      </Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        color="primary"
        onClick={handleSubmit}
        disabled={!nameInput.trim()}
      >
        Submit
      </Button>
    </Box>
  );
};
