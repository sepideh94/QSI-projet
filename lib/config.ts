export const config = {
  projectsApiBaseUrl: process.env.PROJECTS_API_BASE_URL || "http://localhost:3001",
  contributionsApiBaseUrl: process.env.CONTRIBUTIONS_API_BASE_URL || "http://localhost:3002",
  port: process.env.PORT || "3003"
};