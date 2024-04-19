window.addEventListener("load",function(){
    // 하단 패밀리 펼림 기능
    // 목록 열기 버튼
    const openBt = this.document.querySelector(".footer-link")
    // 목록 닫기 버튼
    const closeBt = this.document.querySelector(".family-close")
    // 보여질 패밀리 목록
    const family = this.document.querySelector(".family")
    // 기능처리
    openBt.addEventListener("click",function(){
        family.classList.add("active")
        this.classList.add("active")

    })
    closeBt.addEventListener("click",function(){
        family.classList.remove("active")
        openBt.classList.remove("active")

    })
// <!-- 고정메뉴 -->
// 위로 가기 기능
const fixTopBt = this.document.querySelector(".fix-top");
fixTopBt.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});





})
