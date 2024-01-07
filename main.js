const categotyBtnContainer = document.querySelector(".categories");
const contentContainer = document.querySelector(".container");

const loadCategoryBtn = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => displayBtns(data.data));
};
loadCategoryBtn();

const displayBtns = (data) => {
  // console.log(data)
  data.forEach((button) => {
    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = button.category;
    buttonElement.classList.add("btn");
    categotyBtnContainer.appendChild(buttonElement);
  });
};

const loadContent = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayContent(data.data));
};

const displayContent = (data) => {
  console.log(data);
  data.forEach((content) => {
    const div = document.createElement("div");
    div.classList.add("w-25", "p-1");
    div.innerHTML = `
        <div class="card">
            <img src=${
              content.thumbnail
            } class="card-img-top w-100" style="height: 250px; object-fit:cover">
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
                </div>
            </div>
        </div>
        `;
    contentContainer.appendChild(div);
  });
};

loadContent(1000);

