let resData = null;
const container = document.getElementById("container");
const prevBtn = document.querySelector("#prevPage");
const nextBtn = document.querySelector("#nextPage");
let myUrl = `https://catfact.ninja/facts?page=1`;
let pageN = document.querySelector(".pageNumber");
const pageNumbers = document.querySelectorAll(".pageNumbers");
let brojevi = document.querySelector(".brojevi");
// functions
function getData() {
  fetch(myUrl)
    .then((response) => {
      return response.json();
    })
    .then((responseBody) => {
      resData = responseBody;
      let teksN = pageN.innerText.slice(0, 5);
      pageN.innerText = teksN + responseBody.current_page;

      if (resData.prev_page_url === null) {
        prevBtn.setAttribute("disabled", "true");
      }
      if (resData.next_page_url === null) {
        nextBtn.setAttribute("disabled", "true");
      }
      responseBody.data.forEach((el) => {
        container.appendChild(createCard(el));
      });
      // label - active
      resData.links.forEach((el) => {
        brojevi.appendChild(createN(el));
      });
    })
    .catch((err) => {
      console.log("GRESKAAA", err);
    });
}

function createN(catFact) {
  let broj = document.createElement("p");
  broj.innerHTML = catFact.label;
  if (catFact.label === "Next") {
    broj.classList.add("next");
  } else if (catFact.label === "Previous") {
    broj.classList.add("prev");
  } else {
    broj.classList.add("brojevi");
  }
  return broj;
}

function createCard(catFact) {
  let card = document.createElement("p");
  card.innerHTML = catFact.fact;
  card.classList.add("fact_card");
  return card;
}

function goToNextPage() {
  if (!resData.next_page_url) {
    return;
  }
  brojevi.innerHTML = "";
  container.innerHTML = "";
  myUrl = resData.next_page_url;
  prevBtn.removeAttribute("disabled");

  getData();
}

function goToPrevPage() {
  if (!resData.prev_page_url) {
    return;
  }
  nextBtn.removeAttribute("disabled");
  container.innerHTML = "";
  brojevi.innerHTML = "";

  myUrl = resData.prev_page_url;
  getData();
}

// ifi function
(function () {
  getData();
})();

// ---eventslistner ---
prevBtn.addEventListener("click", goToPrevPage);
nextBtn.addEventListener("click", goToNextPage);

brojevi.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("next")) {
    goToNextPage();
  }
  if (e.target.classList.contains("prev")) {
    goToPrevPage();
  }
  if (e.target.classList.contains("brojevi")) {
    container.innerHTML = "";
    brojevi.innerHTML = "";
    myUrl = `https://catfact.ninja/facts?page=${e.target.innerText}`;
    prevBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("disabled");

    getData();
  }
});

// pageNumbers.forEach((el) => {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const novi = Number(e.target.innerText);
//     if (!novi) {
//       return;
//     }
//     container.innerHTML = "";

//     myUrl = `https://catfact.ninja/facts?page=${novi}`;
//     prevBtn.removeAttribute("disabled");
//     nextBtn.removeAttribute("disabled");

//     getData();
//   });
// });

// function acitveColor() {
//   resData.links.forEach((res) => {
//     if (+res.label === responseBody.current_page) {
//       pageNumbers.forEach((el) => {
//         if (+el.innerText === +res.label) {
//           el.classList.add("current-acitve");
//         } else {
//           el.classList.remove("current-acitve");
//         }
//       });
//     }
//   });
// }
