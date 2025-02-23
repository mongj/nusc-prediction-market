import dotenv from "dotenv";

// Load .env file into process.env
dotenv.config();

const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_NAME",
  "DB_PASSWORD",
  "DATABASE_URL",
  "ADMIN_ID",
  "ADMIN_PASSWORD",
  "COOKIE_SECRET",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(
    `❌ Missing required environment variable(s): ${missingVars.join(", ")}\n` +
      "Please check if you have a .env file in the root directory with the correct variables."
  );
  process.exit(0);
}

const config = {
  db: {
    host: process.env.DB_HOST!,
    port: (() => {
      const port = parseInt(process.env.DB_PORT!);
      if (isNaN(port)) {
        console.error("❌ DB_PORT must be a valid number");
        process.exit(0);
      }
      if (port < 1 || port > 65535) {
        console.error("❌ DB_PORT must be between 1 and 65535");
        process.exit(0);
      }
      return port;
    })(),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    url: process.env.DATABASE_URL!,
  },
  port: (() => {
    const port = parseInt(process.env.SERVER_PORT || "3000");
    if (isNaN(port)) {
      console.error("❌ SERVER_PORT must be a valid number");
      process.exit(0);
    }
    if (port < 1 || port > 65535) {
      console.error("❌ SERVER_PORT must be between 1 and 65535");
      process.exit(0);
    }
    return port;
  })(),
  nodeEnv: process.env.NODE_ENV || "production",
  adminId: process.env.ADMIN_ID!,
  adminPassword: process.env.ADMIN_PASSWORD!,
  cookieSecret: process.env.COOKIE_SECRET!,
};

export default config;
