declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    SERVER_PORT: string;
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    ADMIN_ID: string;
    ADMIN_PASSWORD: string;
    COOKIE_SECRET: string;
  }
}
