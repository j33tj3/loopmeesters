import { Card } from "@mui/material";
import { ReactNode } from "react";

export const CardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      sx={{
        height: "fit-content",
        maxWidth: { xs: "100%", md: "500px" },
        width: "100%",
        margin: "auto",
        marginTop: { xs: 2, md: 4 },
        marginBottom: { xs: 2, md: 4 },
        padding: { xs: 2, md: 2 },
        boxShadow: { xs: 0, md: 2 },
      }}
    >
      {children}
    </Card>
  );
};
