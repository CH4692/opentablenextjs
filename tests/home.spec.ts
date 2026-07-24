import { test, expect } from "@playwright/test";
import { DEMO_RESTAURANT, goHome } from "./helpers";

test.describe("Home", () => {
  test("shows brand hero, restaurant cards, and footer signature", async ({
    page,
  }) => {
    await goHome(page);

    await expect(
      page.getByRole("heading", { name: /Find your table for any occasion/i })
    ).toBeVisible();
    await expect(page.getByPlaceholder(/ottawa|toronto|niagara/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Popular restaurants" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: DEMO_RESTAURANT })).toBeVisible();

    await expect(page.getByText(/Made with/i)).toBeVisible();
    await expect(page.getByText("CharlesHeller")).toBeVisible();
  });

  test("search from hero navigates to search results", async ({ page }) => {
    await goHome(page);
    await page.getByPlaceholder(/ottawa|toronto|niagara/i).fill("ottawa");
    await page.getByRole("button", { name: /Let's go/i }).click();
    await expect(page).toHaveURL(/\/search\?city=ottawa/i);
    await expect(page.getByText(DEMO_RESTAURANT)).toBeVisible();
  });
});
