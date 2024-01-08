const categotyBtnContainer = document.querySelector(".categories");
const contentContainer = document.querySelector(".content-container");
const sortBtn = document.querySelector(".sort-btn");
let content;

const loadCategoryBtn = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => {
      displayBtns(data.data);
    });
};
loadCategoryBtn();

const displayBtns = (data) => {
  // console.log(data);
  data.forEach((button) => {
    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = button.category;
    buttonElement.classList.add("btn");
    buttonElement.id = button.category_id;
    categotyBtnContainer.appendChild(buttonElement);
  });

  let categotyBtns = categotyBtnContainer.querySelectorAll("button");
  handleCategoryBtns(categotyBtns);
};

const loadContent = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayContent(data.data);
      content = data.data;
    });
};

const displayContent = (data) => {
  contentContainer.innerHTML = "";
  if (data.length === 0) {
    contentContainer.innerHTML = `
    <div class="text-center w-100">
      <img src=${"./Icon.png"}>
      <h3>Opps!! Sorry, There is no content here</h3>
    </div>
    `;
  }

  data.forEach((content) => {
    let time = content.others.posted_date;
    const hour = Math.floor(time / 3600);
    time = time - hour * 3600;
    const minute = Math.floor(time / 60);
    const formattedTime = `${hour}hrs ${minute}min ago`;
    const div = document.createElement("div");
    div.classList.add("content-card", "p-1");
    div.innerHTML = `
        <div class="card h-100">
            <div class="position-relative">
              <img src=${
                content.thumbnail
              } class="card-img-top w-100" style="height: 250px; object-fit:cover">
              <span class="position-absolute text-white z-2 end-0 bottom-0 bg-dark p-1 rounded">${formattedTime}</span>
            </div>
            <div class="card-body d-flex gap-2">
                <img src=${
                  content.authors[0].profile_picture
                } class="rounded-circle" style="height: 40px; width:40px; object-fit:cover">
                <div>
                    <h5>${content.title}</h5>
                    <div class="d-flex align-items-start">
                        <p>${content.authors[0].profile_name}</p>
                        ${
                          content.authors[0].verified == true
                            ? "<img src='./blue_tick.png'>"
                            : "<span></span>"
                        }
                    </div>
                    <p style="margin-top: -10px">${content.others.views} views</p>
                </div>
            </div>
        </div>
        `;
    contentContainer.appendChild(div);
  });
};

loadContent(1000);

const handleCategoryBtns = (buttons) => {
  for (const button of buttons) {
    button.addEventListener("click", () => {
      loadContent(button.id);
    });
  }
};

sortBtn.addEventListener("click", () => {
  const sortedContent = content.sort(
    (a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1)
  );
  console.log(sortedContent);
  displayContent(sortedContent);
});
