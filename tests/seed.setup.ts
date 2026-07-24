import { test as setup, expect } from "@playwright/test";

setup("seed database", async ({ request }) => {
  const response = await request.get("/api/seed");
  expect(
    response.ok(),
    `Seed failed: ${response.status()} ${await response.text()}`
  ).toBeTruthy();
});
