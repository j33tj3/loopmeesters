"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { todaysDate } from "@/utils/utils";

const Form = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: todaysDate(),
    time: "",
    trainer: "",
    is_training: true,
    location: "",
    options: [""],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleAddOption = () => {
    setFormData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ""],
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("http://ben-erbij.guidodiepen.nl:9898/polls", formData);
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit poll");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Titel"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Trainer"
        name="trainer"
        value={formData.trainer}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_training}
            onChange={() =>
              setFormData({ ...formData, is_training: !formData.is_training })
            }
            name="is_training"
          />
        }
        label="Is Training?"
      />
      {formData.options.map((option, index) => {
        const number = index + 1;
        return (
          <Box key={index}>
            <TextField
              label={`Option ${number}`}
              name={`option-${number}`}
              value={formData.options[index]}
              fullWidth
              margin="normal"
              onChange={(e) => handleOptionChange(e, index)}
            />
            <Button
              type="button"
              onClick={() => {
                const newOptions = [...formData.options];
                newOptions.splice(index, 1);
                setFormData((prevData) => ({
                  ...prevData,
                  options: newOptions,
                }));
              }}
            >
              Remove Option
            </Button>
          </Box>
        );
      })}
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={handleAddOption}
        fullWidth
      >
        Add Option
      </Button>
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
