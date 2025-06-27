class  MyPage {
    page
  constructor(page) {
    this.page = page;
  }

  cartCounterButton() {
    return this.page.getByRole('button', { name: '( 1 )' }).first();
  }
}

export {MyPage}


class ArticlePage {
    page
  constructor(page) {
    this.page = page;
  }

  deleteArticleButtonFirst() {
    return this.page.getByRole('button', { name: 'Delete Article' }).first();
  }
}

export {ArticlePage}


class AdvertisementPage {
    page
  constructor(page) {
    this.page = page;
  }

   firstAdvertisementButton() {
    return this.page.getByRole('button', { name: 'реклама' }).first();
  }
}

export  {AdvertisementPage};