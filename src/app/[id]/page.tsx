"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PollById } from "@/components/PollById";
import { use } from "react";
import { EnterName } from "@/components/EnterName";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";
import { CardWrapper } from "@/components/layout/Card";
import { Box } from "@mui/material";

export type UserData = {
  name: string;
  uuid: string;
};

export default function PollIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the async params
  const [changeName, setChangeName] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
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

  const handleUserSubmit = (name: string) => {
    const newUserData = {
      name,
      uuid: userData?.uuid ?? uuidv4(),
    };
    // Save user data object in localStorage
    localStorage.setItem("userData", JSON.stringify(newUserData));
    setUserData(newUserData);
    setChangeName(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData || changeName) {
    return (
      <Box sx={{ padding: { xs: 0, md: 4 } }}>
        <CardWrapper>
          <EnterName
            onSubmit={handleUserSubmit}
            changeName={changeName}
            name={userData?.name}
          />
        </CardWrapper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 0, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardWrapper>
        <PollById
          id={id}
          userData={userData}
          onChangeName={() => {
            setChangeName(!changeName);
          }}
        />
      </CardWrapper>
    </Box>
  );
}
