import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export const EnterName = ({
  onSubmit,
  changeName,
  name,
}: {
  onSubmit: (name: string) => void;
  changeName: boolean;
  name?: string;
}) => {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = () => {
    if (nameInput.trim()) {
      onSubmit(nameInput.trim());
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {changeName ? `Hi ${name}` : "Hoe heet jij?"}
      </Typography>
      <TextField
        label={changeName ? "Pas je naam aan" : "Vul je naam in"}
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
        Ga verder
      </Button>
    </Box>
  );
};
