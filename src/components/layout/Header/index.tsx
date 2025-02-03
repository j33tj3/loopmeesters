import { AppBar, Box } from "@mui/material";
import Image from "next/image";

export const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ padding: 2, display: "flex", alignItems: "center" }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Image
          src="/logo-wit.svg"
          alt="logo"
          width={30}
          height={30}
          className="-mt-1"
        />
        <Image
          src="/loopmeesters-wit.svg"
          alt="Loopmeesters"
          width={195}
          height={30}
          priority
        />
      </Box>
    </AppBar>
  );
};
