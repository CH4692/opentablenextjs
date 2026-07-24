import { test, expect, Page } from "@playwright/test";
import { STRONG_PASSWORD, goHome, uniqueEmail } from "./helpers";

function authModal(page: Page, heading: string) {
  return page.locator(".MuiModal-root").filter({ hasText: heading });
}

test.describe("Auth", () => {
  test("signs up, shows greeting, then signs out", async ({ page }) => {
    const email = uniqueEmail("signup");
    await goHome(page);

    await page.getByRole("button", { name: "Sign up" }).click();
    const modal = authModal(page, "Create your Seatly account");
    await expect(modal).toBeVisible();

    await modal.getByPlaceholder("First Name").fill("Taylor");
    await modal.getByPlaceholder("Last Name").fill("Demo");
    await modal.getByPlaceholder("Email").fill(email);
    await modal.getByPlaceholder("Phone").fill("+14165551234");
    await modal.getByPlaceholder("City").fill("ottawa");
    await modal.getByPlaceholder("Password").fill(STRONG_PASSWORD);
    await modal.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Hi, Taylor")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();

    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("signs in with an existing account", async ({ page, request }) => {
    const email = uniqueEmail("signin");
    const password = STRONG_PASSWORD;

    const signup = await request.post("/api/auth/signup", {
      data: {
        firstName: "Jordan",
        lastName: "Guest",
        email,
        phone: "+14165554567",
        city: "toronto",
        password,
      },
    });
    expect(signup.ok()).toBeTruthy();

    await goHome(page);
    await page.getByRole("button", { name: "Sign in" }).click();
    const modal = authModal(page, "Log into your account");
    await expect(modal).toBeVisible();

    await modal.getByPlaceholder("Email").fill(email);
    await modal.getByPlaceholder("Password").fill(password);
    await modal.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Hi, Jordan")).toBeVisible({ timeout: 15_000 });
  });

  test("shows error for invalid sign-in credentials", async ({ page }) => {
    await goHome(page);
    await page.getByRole("button", { name: "Sign in" }).click();
    const modal = authModal(page, "Log into your account");
    await expect(modal).toBeVisible();

    await modal.getByPlaceholder("Email").fill("nobody@example.com");
    await modal.getByPlaceholder("Password").fill("WrongPass1!");

    await modal.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByTestId("auth-error")).toContainText(
      /Email or password is invalid/i,
      { timeout: 15_000 }
    );
  });
});
