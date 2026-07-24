import { test, expect } from "@playwright/test";
import { DEMO_RESTAURANT, DEMO_SLUG } from "./helpers";

test.describe("Reservation", () => {
  test("find a time opens reserve page with booking details", async ({
    page,
  }) => {
    await page.goto(`/restaurant/${DEMO_SLUG}`);

    await page.locator("#party-size").selectOption("3");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = tomorrow.toISOString().split("T")[0];
    await page.locator("#date").fill(date);
    await page.locator("#time").selectOption({ index: 0 });
    await page.getByRole("button", { name: "Find a Time" }).click();

    await expect(page).toHaveURL(new RegExp(`/reserve/${DEMO_SLUG}`));
    await expect(page).toHaveURL(/partySize=3/);
    await expect(page).toHaveURL(new RegExp(`date=${date}`));
    await expect(
      page.getByRole("heading", { name: "Confirm your table" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: DEMO_RESTAURANT })).toBeVisible();
  });

  test("completes a reservation successfully", async ({ page }) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const date = tomorrow.toISOString().split("T")[0];

    await page.goto(
      `/reserve/${DEMO_SLUG}?date=${date}&time=19:00&partySize=2`
    );

    await expect(
      page.getByRole("heading", { name: "Confirm your table" })
    ).toBeVisible();

    const firstName = page.locator('input[name="firstName"]');
    const lastName = page.locator('input[name="lastName"]');
    const phone = page.locator('input[name="phone"]');
    const email = page.locator('input[name="email"]');

    await firstName.fill("Casey");
    await lastName.fill("Tester");
    await phone.fill("+14165559876");
    await email.fill(`reserve-${Date.now()}@example.com`);
    await page.locator('input[name="occasion"]').fill("Birthday");

    await expect(firstName).toHaveValue("Casey");
    await expect(email).not.toHaveValue("");

    await page.getByRole("button", { name: "Complete reservation" }).click();

    await expect(page.getByRole("heading", { name: /You're booked/i })).toBeVisible();
    await expect(page.getByText(/A confirmation was saved/i)).toBeVisible();
  });

  test("shows guidance when booking params are missing", async ({ page }) => {
    await page.goto(`/reserve/${DEMO_SLUG}`);
    await expect(
      page.getByRole("heading", { name: "Missing booking details" })
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to restaurant" }).click();
    await expect(page).toHaveURL(`/restaurant/${DEMO_SLUG}`);
  });
});
