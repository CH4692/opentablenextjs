import { test, expect } from "@playwright/test";
import {
  DEMO_RESTAURANT,
  DEMO_SLUG,
  openRestaurantFromHome,
} from "./helpers";

test.describe("Restaurant detail & menu", () => {
  test("shows overview content and reservation card", async ({ page }) => {
    await openRestaurantFromHome(page);

    await expect(
      page.getByRole("heading", { name: DEMO_RESTAURANT }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Menu" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Make a Reservation" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Find a Time" })).toBeVisible();
  });

  test("navigates to menu page", async ({ page }) => {
    await page.goto(`/restaurant/${DEMO_SLUG}`);
    await page.getByRole("link", { name: "Menu" }).click();
    await expect(page).toHaveURL(`/restaurant/${DEMO_SLUG}/menu`);
    await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();
  });

  test("shows not-found for unknown slug", async ({ page }) => {
    await page.goto("/restaurant/does-not-exist-xyz");
    await expect(
      page.getByText(/couldn't find that restaurant/i)
    ).toBeVisible();
  });
});
