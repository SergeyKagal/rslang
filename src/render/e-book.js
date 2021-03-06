import Header from '../Pages/layout/header';
import Footer from '../Pages/layout/footer';

const renderEbookScreen = {
  render: `
  <div class="wrapper">
  
  ${Header.render}

  <main class="main">

  <div class="ebook">
      <div class="ebook__container">
        <div class="ebook__header">
          <div class="ebook__pag tui-pagination" id="tui-pagination-container"></div>
          <div class="ebook__menu">
            <a href="#/audiocall"><button class="ebook__audiocall">
            Audiocall
            <img src="assets/images/svg/audiocall.svg"/></button></a>
            <a href="#/sprint"><button class="ebook__sprint">Sprint
            <img src="assets/images/svg/sprint.svg"/></button></a>
          </div>
        </div>
        <div class="ebook__main">
          <div class="tabs__container" id="tabs" role="tablist">
            <div class="tab active" data-group="0" role="tab">Chapter 1</div>
            <div class="tab" data-group="1" role="tab">Chapter 2</div>
            <div class="tab" data-group="2" role="tab">Chapter 3</div>
            <div class="tab" data-group="3" role="tab">Chapter 4</div>
            <div class="tab" data-group="4" role="tab">Chapter 5</div>
            <div class="tab" data-group="5" role="tab">Chapter 6</div>
            <div class="tab" data-group="6" role="tab">Difficult</div>
          </div>
          <div class="content__container">
            <div class="content hide">
            </div>
            <div class="content hide"></div>
            <div class="content hide"></div>
            <div class="content hide"></div>
            <div class="content hide"></div>
            <div class="content hide"></div>
            <div class="content hide"></div>
          </div>
        </div>
      </div>
    </div>
    
    </main>

    ${Footer.render}

</div>`,
};
export default renderEbookScreen;
