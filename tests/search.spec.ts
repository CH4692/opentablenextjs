import { test, expect } from "@playwright/test";
import { DEMO_RESTAURANT } from "./helpers";

test.describe("Search", () => {
  test("filters by city, cuisine, and price", async ({ page }) => {
    await page.goto("/search?city=ottawa");
    await expect(page.getByText(DEMO_RESTAURANT)).toBeVisible();

    await page.getByRole("link", { name: "indian", exact: true }).click();
    await expect(page).toHaveURL(/cuisine=indian/);
    await expect(page.getByText(DEMO_RESTAURANT)).toBeVisible();

    await page.getByRole("link", { name: "$$", exact: true }).click();
    await expect(page).toHaveURL(/price=REGULAR/);
    await expect(page.getByText(DEMO_RESTAURANT)).toBeVisible();
  });

  test("shows empty state for unknown city", async ({ page }) => {
    await page.goto("/search?city=nowhereville");
    await expect(page.getByRole("heading", { name: "No matches" })).toBeVisible();
    await expect(
      page.getByText(/Try another city like ottawa, toronto, or niagara/i)
    ).toBeVisible();
  });

  test("opens restaurant detail from search results", async ({ page }) => {
    await page.goto("/search?city=ottawa");
    await page.getByRole("link", { name: "View more information" }).first().click();
    await expect(page).toHaveURL(/\/restaurant\//);
    await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Menu" })).toBeVisible();
  });
});
