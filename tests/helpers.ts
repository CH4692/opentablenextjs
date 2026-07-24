import { expect, Page } from "@playwright/test";

export const DEMO_CITY = "ottawa";
export const DEMO_RESTAURANT = "Vivaan - fine Indian";
export const DEMO_SLUG = "vivaan-fine-indian-cuisine-ottawa";

export function uniqueEmail(prefix = "e2e") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
}

export const STRONG_PASSWORD = "Str0ng!Pass99";

export async function goHome(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Seatly" })).toBeVisible();
}

export async function openRestaurantFromHome(page: Page) {
  await goHome(page);
  await page.getByRole("link", { name: DEMO_RESTAURANT }).first().click();
  await expect(page).toHaveURL(new RegExp(`/restaurant/${DEMO_SLUG}`));
}
