"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PollById } from "@/components/PollById";
import { use } from "react";
import { EnterName } from "@/components/EnterName";
import { LoadingSpinner } from "@/components/layout/LoadingSpinner";

export type UserData = {
  name: string;
  uuid: string;
};

export default function PollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the async params

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
      uuid: uuidv4(),
    };
    // Save user data object in localStorage
    localStorage.setItem("userData", JSON.stringify(newUserData));
    setUserData(newUserData);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return <EnterName onSubmit={handleUserSubmit} />;
  }

  return <PollById id={id} userData={userData} />;
}
