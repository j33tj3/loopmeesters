"use client";

import { Box, useTheme } from "@mui/material";
import Image from "next/image";

export const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        marginTop: "auto",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src="/slogan.svg" alt="Loopmeesters" width={303} height={22} />
    </Box>
  );
};
