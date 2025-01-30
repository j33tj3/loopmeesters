export const todaysDate = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return date.toLocaleDateString("en-CA", options);
};

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  const newDate = `${day}-${month}-${year}`;
  return newDate;
};

export const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("nl-NL", { weekday: "long" }).format(date);
};

export const baseUrl = "https://ben-erbij.guidodiepen.nl/"; // TODO: Update when live to loopmeesters.nl
export const apiUrl = `${baseUrl}api/`;
export const pollsUrl = `${apiUrl}polls/`;
export const voteUrl = `${apiUrl}votes/`;
export const pollOptionUrl = `${apiUrl}poll_option/`;
export const trainersUrl = `${apiUrl}trainers`;
export const locationsUrl = `${apiUrl}locations`;
