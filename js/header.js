window.addEventListener("load", function () {
  const wrap = this.document.querySelector(".wrap");
  const header = this.document.querySelector(".header");
  let scy = 0;
  this.window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });
  //   펼침 목록들 보기 기능
  // 더보기 목록기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  //  조합원센터 목록기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  // 배열 순서번호가 주어진다.(배열순서번호 index)

  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerBt];
  // 펼침 목록 모두 닫기
  this.document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
      item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });
  // 목록전체를 클릭해도 이벤트 전달을 막아줌
  toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
  // 코드 블럭이 같은 기능을 반복된다
  // 기능을 만들어서 쓴다
  function listToggle(bt, list) {
    // 처음에는 목록을 보여주기 않는다.
    list.style.display = "none";
    // 클릭이벤드가 발생하면 함수 실행
    bt.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      console.log(list);
      const nowListId = list.getAttribute("id");
      const hideArr = toggleListArr.filter(function (item) {
        let id = item.getAttribute("id");
        // console.log(id);
        if (id !== nowListId) {
          return this;
        }
      });
      // 새로 저장된 배열의 목록
      console.log(hideArr);
      hideArr.forEach(function (item) {
        item.style.display = "none";
      });
      const css = getComputedStyle(list).display;
      // display값 비교한다.
      if (css === "none") {
        list.style.display = "block";
        // 클래스를 강제로 추가한다.
        bt.classList.add("active");
      } else {
        list.style.display = "none";
        // 클래스를 강제로 추가한다.
        bt.classList.remove("active");
      }
    });
  }
  listToggle(menuBt, menuList);
  // toggleListArr[0] = menuList
  listToggle(joinBt, joinList);
  // toggleListArr[1] = joinList
  listToggle(centerBt, centerList);
  // toggleListArr[2] = centerList
  // ====================================================
  // 전체메뉴 펼침 기능
  const allMenuArea = this.document.querySelector(".all-menu-area");
  const allMenu = this.document.querySelector(".all-menu");
  const cateList = this.document.querySelector(".all-menu-cate");
  // const dellist = this.document.querySelector(".bell");
  // ul 인 cate-list로 선언하니 스크롤 부분에 커서올리면 메뉴가 사라짐
  const cateListWrap = this.document.querySelector(".all-menu-cate-wrap");
  cateList.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active"); //기능되기 전 가림
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  // dellist.addEventListener("mouseenter", function () {
  //   allMenu.classList.remove("active");
  // });
  allMenu.classList.add("active");
  cateListWrap.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  //서브 카테고리 보여주기 기능
  const cateLists = this.document.querySelectorAll(".cate-list > li");
  const cateDepth2 = this.document.querySelectorAll(".cate-depth2-list");
  cateLists.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none";
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
    });
  });
  // data.json을 로딩, 연결시킨다.
  const xhttp = new XMLHttpRequest();
  // console.log(xhttp);
  xhttp.onreadystatechange = function (e) {
    const req = e.target;
    // console.log(req);
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      // 글자로 온 데이터를 객체로 변환
      // 글자가 json 규칙대로 만들어진 문자열
      // 그러므로 json글자를 객체로 변환해서 활용한다.
      let obj = JSON.parse(str);

      VISUAL_ARR = obj.visual;

      showVisual(); //비주얼을 화면에 배치
    }
  };
  //   자료 호출한다.
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능 실행 할수 있도록 요청
  xhttp.send();
  // 비주얼 슬라이드
  let VISUAL_ARR;
  let visualTag = this.document.getElementById("data-visual");

  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
      const tag = `
        <div class="swiper-slide">
                <div class="visual-slide-page">
                  <a href="${item.link}">
                    <img src="images/${item.pic}" alt="${item.name}" />
                  </a>
                </div>
              </div>
        `;
      // json의 변수를 가져와서 item으로 선언
      html += tag;
    });
    visualTag.innerHTML = html;
    //   비주얼 슬라이드 기능
    const swVisual = new Swiper(".sw-visual", {
      loop: true, // loop : 무한으로 도는 것.
      autoplay: {
        delay: 2500,
        disableOnInteraction: false, // 상관없이 계속 autoplay.
      },
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
    });
  }
  //  888888888888888888888888888888888888888888888888888
});
