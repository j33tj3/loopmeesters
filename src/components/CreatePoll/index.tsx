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
import { DatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";

type FormData = {
  title: string;
  date: string;
  time: string;
  trainer: string;
  is_training: boolean;
  location: string;
  options: string[];
};

const Form = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: todaysDate(),
    time: dayjs(`${todaysDate()}T09:00`).format("HH:mm"),
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

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      axios.post(`https://ben-erbij.guidodiepen.nl/api/polls/`, formData),
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(formData);
        router.push("/");
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Titel"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <DatePicker
        label="Date"
        onChange={(newValue) =>
          setFormData((prevData) => ({
            ...prevData,
            date: newValue ? newValue.format("YYYY-MM-DD") : todaysDate(),
          }))
        }
        value={dayjs(formData.date)}
        sx={{ width: "100% " }}
      />
      <DesktopTimePicker
        label="Time"
        ampm={false}
        value={dayjs(`${formData.date}T${formData.time}`)}
        onChange={(newValue) => {
          setFormData((prevData) => ({
            ...prevData,
            time: newValue ? newValue.format("HH:mm") : "",
          }));
        }}
      />
      <TextField
        label="Trainer"
        name="trainer"
        value={formData.trainer}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        required
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
      {formData.options.map((_option, index) => {
        const number = index + 1;
        return (
          <Box key={index}>
            <TextField
              label={`Option ${number}`}
              name={`option-${number}`}
              value={formData.options[index]}
              fullWidth
              required
              onChange={(e) => handleOptionChange(e, index)}
            />
            {formData.options.length !== 1 && (
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
            )}
          </Box>
        );
      })}
      <Button
        type="button"
        variant="outlined"
        size="large"
        fullWidth
        onClick={handleAddOption}
      >
        Add Option
      </Button>
      <Button type="submit" variant="contained" size="large" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default Form;
