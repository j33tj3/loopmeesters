export const todaysDate = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return date.toLocaleDateString("en-CA", options); // For now the schema for date is in en-CA format (YYYY-MM-DD)
};
