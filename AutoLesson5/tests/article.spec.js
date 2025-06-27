import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/user.builders';
import { ArticleBuilder } from '../src/helpers/article.builders';
import { App } from '../src/pages/app.page';
import { MyPage } from '../src/pages/MyPage.js';


test('Создание статьи авторизованным пользователем', async ({page}) => {

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

    const randomArticle = new ArticleBuilder()
    .generateArticleTitle()
    .generateArticleInfo()
    .generateArticleContent()
    .generateArticleTag()
    .generate();

    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await expect(page.getByRole('button', { name: 'Delete Article' }).first()).toBeVisible();
})


test('Проставить лайк статье из раздела Global Feed', async ({page}) => {
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

    const randomArticle = new ArticleBuilder()
    .generateArticleTitle()
    .generateArticleInfo()
    .generateArticleContent()
    .generateArticleTag()
    .generate();

    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await app.main.open();
    await app.globalFeed.open();
    await app.globalFeed.likePost();
    const myPage = new MyPage(page);

    await expect(myPage.cartCounterButton()).toBeVisible();
})

test('Фильтрация статей по популярному тэгу', async ({page}) => {
    let app = new App(page);
    
    await app.main.open();
    await app.main.popularTagButtonClick();
    await expect(page.getByRole('button', { name: 'реклама' }).first()).toBeVisible();
})