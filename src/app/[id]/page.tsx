"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PollById } from "@/components/PollById";
import { TextField, Button, Box, Typography } from "@mui/material";
import { use } from "react";

export default function PollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the async params

  const [userData, setUserData] = useState<{
    name: string;
    uuid: string;
  } | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve user data object from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData.name && parsedData.uuid) {
        setUserData(parsedData);
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    if (nameInput.trim()) {
      const newUserData = {
        name: nameInput.trim(),
        uuid: uuidv4(),
      };
      // Save user data object in localStorage
      localStorage.setItem("userData", JSON.stringify(newUserData));
      setUserData(newUserData);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // TODO: Move it to a separate component
  if (!userData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        p={2}
      >
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
  }

  return <PollById id={id} />;
}
