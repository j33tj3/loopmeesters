import { Card } from "@mui/material";
import { ReactNode } from "react";

export const CardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      sx={{
        height: "fit-content",
        maxWidth: { xs: "100%", md: "500px" },
        width: "100%",
        marginX: "auto",
        padding: { xs: 2, md: 2 },
        boxShadow: { xs: 0, md: 2 },
      }}
    >
      {children}
    </Card>
  );
};
