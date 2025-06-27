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