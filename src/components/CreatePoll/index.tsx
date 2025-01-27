"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pollsUrl, todaysDate } from "@/utils/utils";
import { DatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { useTrainers } from "@/utils/uesTrainers";
import { Remove } from "@mui/icons-material";
import { useLocations } from "@/utils/useLocations";

type FormData = {
  title: string;
  date: string;
  time: string;
  trainer: string;
  is_training: boolean;
  location: string;
  options: string[];
};

const CreatePoll = () => {
  const router = useRouter();
  const { data: trainers } = useTrainers();
  const [otherTrainer, setOtherTrainer] = useState(false);
  const { data: locations } = useLocations();
  const [otherLocations, setOtherLocations] = useState(false);

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
    mutationFn: (formData: FormData) => axios.post(pollsUrl, formData),
  });

  useEffect(() => {
    if (formData.trainer === "anders") {
      setOtherTrainer(true);
      setFormData((prevData) => ({
        ...prevData,
        trainer: "",
      }));
    }
    if (formData.location === "anders") {
      setOtherLocations(true);
      setFormData((prevData) => ({
        ...prevData,
        location: "",
      }));
    }
  }, [formData, formData.location, formData.trainer]);

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
        label="Naam"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <DatePicker
        label="Datum"
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
        label="Tijd"
        ampm={false}
        value={dayjs(`${formData.date}T${formData.time}`)}
        onChange={(newValue) => {
          setFormData((prevData) => ({
            ...prevData,
            time: newValue ? newValue.format("HH:mm") : "",
          }));
        }}
      />
      {otherTrainer ? (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <TextField
            label="Trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="button"
            variant="outlined"
            size="large"
            sx={{ width: "fit-content" }}
            onClick={() => {
              setOtherTrainer(false);
              formData.trainer = "";
            }}
          >
            <Remove />
          </Button>
        </Box>
      ) : (
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Trainer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
          >
            {trainers?.map((trainer: string, index: number) => (
              <MenuItem key={index} value={trainer}>
                {trainer}
              </MenuItem>
            ))}
            <MenuItem value="anders">Anders</MenuItem>
          </Select>
        </FormControl>
      )}
      {otherLocations ? (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <TextField
            label="Locatie"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="button"
            variant="outlined"
            size="large"
            sx={{ width: "fit-content" }}
            onClick={() => {
              setOtherLocations(false);
              formData.location = "";
            }}
          >
            <Remove />
          </Button>
        </Box>
      ) : (
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Locatie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Locatie"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            {locations?.map((location: string, index: number) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
            <MenuItem value="anders">Anders</MenuItem>
          </Select>
        </FormControl>
      )}
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
        label="Training?"
      />
      {formData.options.map((_option, index) => {
        const number = index + 1;
        return (
          <Box key={index}>
            <TextField
              label={`Stem optie ${number}`}
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
                Verwijder optie {number}
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
        Voeg nieuwe optie toe
      </Button>
      <Button type="submit" variant="contained" size="large" fullWidth>
        Maak poll aan
      </Button>
    </Box>
  );
};

export default CreatePoll;
