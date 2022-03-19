const setColordate = (Date: Date): string => {
  const dayName = Date.toLocaleDateString("en-EN", {
    weekday: "long"
  });

  if (dayName === "Monday") {
    return "bg-yellow-500";
  } else if (dayName === "Tuesday") {
    return "bg-pink-500";
  } else if (dayName === "Wednesday") {
    return "bg-Wednesday";
  } else if (dayName === "Thursday") {
    return "bg-amber-600";
  } else if (dayName === "Friday") {
    return "bg-blue-500";
  } else if (dayName === "Saturday") {
    return "bg-purple-500";
  } else if (dayName === "Sunday") {
    return "bg-red-500";
  } else {
    return "";
  }
};
export default setColordate;
