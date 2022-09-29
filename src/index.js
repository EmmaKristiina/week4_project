// Lähteinä kurssimateriaalien lisäksi:
// https://stackoverflow.com/questions/9422974/createelement-with-id
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

if (document.readyState !== "loading") {
  console.log("valmis");
  initialize();
} else {
  document.addEventListener("DOMContetntLoaded", function () {
    console.log("else valmis");
    initialize();
  });
}

function initialize() {
  const but = document.getElementById("submit-data");

  but.addEventListener("click", function () {
    const text = document.getElementById("input-show").value;

    async function getdata() {
      const base = "https://api.tvmaze.com/search/shows?q=";
      const url = base + text;
      console.log(url);
      const dataPromise = await fetch(url);
      const dataJSON = await dataPromise.json();
      console.log(dataJSON);

      for (let i = 0; i < dataJSON.length; i++) {
        const newClass = document.createElement("div");
        newClass.setAttribute("class", "show-data");
        const newClass2 = document.createElement("div");
        newClass2.setAttribute("class", "show-info");
        const newTitle = document.createElement("h1");
        const newSummary = document.createElement("p1");
        const newPic = document.createElement("img");

        const temp1 = dataJSON[i].show.name;
        const temp2 = dataJSON[i].show.summary;

        newTitle.innerHTML = temp1;
        newSummary.innerHTML = temp2;

        newClass2.appendChild(newTitle);
        newClass2.appendChild(newSummary);
        newClass.appendChild(newClass2);

        if (dataJSON[i].show.image) {
          const temp = dataJSON[i].show.image.medium;
          newPic.src = temp;
          newClass2.appendChild(newPic);
        }
        document.getElementById("body").appendChild(newClass);
      }
    }

    getdata();
  });
}
