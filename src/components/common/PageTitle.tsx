import { useLocation } from "react-router-dom";

// Function to convert lowercase to Title Case
const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const PageTitle = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  let pageTitle = "Dashboard"; 

  // Handle update pages (e.g., "/users/update-user/1")
  if (pathSegments.length > 2 && !isNaN(Number(pathSegments[pathSegments.length - 1]))) {
    pageTitle = toTitleCase(pathSegments[pathSegments.length - 2]); // Use second-last if last is a number
  } else if (pathSegments.length > 0) {
    pageTitle = toTitleCase(pathSegments[pathSegments.length - 1]); // Otherwise, use last segment
  }

  return <h1 className="text-2xl font-bold">{pageTitle}</h1>; // Display title in UI
};

export default PageTitle;
