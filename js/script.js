//catch selector
const milestonesData = JSON.parse(data).data;
const milestonesList = document.querySelector(".milestones");
const title = document.querySelector(".title");
const details = document.querySelector(".details");
const milestoneImage = document.querySelector(".milestoneImage");
const doneList = document.querySelector(".doneList");

//Milestones show
function loadMilestones() {
  milestonesList.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div class="milestone border-b " id=${milestone._id}>
  <div class="flex">
    <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${
      milestone._id
    })"/></div>
    <div onclick="openMilestone(this,${milestone._id})">
      <p>
       ${milestone.name}
        <span><i class="fas fa-chevron-down"></i></span>
      </p>
    </div>
  </div>
  <div class="hidden_panel">
    ${milestone.modules
      .map((module) => {
        return `<div class="module border-b">
      <p>${module.name}</p>
    </div>`;
      })
      .join("")}
  </div>
</div>`;
    })
    .join("")}`;
}

//MOULE SHOW AND HIDE
function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");
  //active class add & remove
  if (!milestoneElement.classList.contains("active") && active) {
    active.classList.remove("active");
  }
  milestoneElement.classList.toggle("active");
  //show class add and remove
  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }
  currentPanel.classList.toggle("show");
  showMilestone(id);
}
//show milestone image , title and description change dinamically

function showMilestone(id) {
  milestoneImage.style.opactiy = "0";
  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}
//listenar for image load
milestoneImage.onload = function () {
  this.style.opactiy = "1";
};

function markMilestone(checkbox, id) {
  const item = document.getElementById(id);
  if (checkbox.checked) {
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  } else {
    milestonesList.appendChild(item);
    //!Remove and sort
    // Get the parent container
    const nodeList = document.querySelector(".milestones");
    // Get the child div elements
    const arrayList = [...nodeList.children];
    // Sort the child div elements based on their numeric id attribute
    arrayList.sort((a, b) => {
      const idA = parseInt(a.id);
      const idB = parseInt(b.id);
      return idA - idB;
    });
    // Append the sorted elements back to the container
    arrayList
      .map((milestone) => {
        milestonesList.appendChild(milestone);
      })
      .join("");
    doneList.removeChild(item);
  }
}

loadMilestones();
