import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/user.builders';
import { App } from '../src/pages/app.page'
import {LoginPage} from '../src/pages/yoursettings.page.js'

test('Выход из учетной записи юзера', async ({ page }) => {
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    let app = new App(page);
    await app.main.open();
    await app.main.gotoSignUp();
    await app.register.signUp(randomUser);
    await expect(app.yourFeed.profileNameField).toContainText(randomUser.username);

    await app.navigation.clickLogoutButton();
    const isVisible = await LoginPage.isLoginLinkVisible();
    await expect(isVisible).toBe(true);
})