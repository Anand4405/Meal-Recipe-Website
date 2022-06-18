const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const section1 = document.querySelector('.section1')
let searchQuery = '';
const APP_ID = "243fded9";
const APP_KEY = "952f623a31eece8b6cf3256007de913b"
// const Base_url = `https://api.edamam.com/api/recipes/v2?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`;

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
    
})

async function fetchAPI(){
    const Base_url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(Base_url);
    const data = await response.json();
    generateHTML(data.hits);
    
}

function generateHTML(results)
{
    container.classList.remove('initial')
    section1.classList.remove('section2')
    let generatedHTML = ''
    results.map(result=>{
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class = "view-button" href="${result.recipe.url}" target = "_blank" >View Receipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label: ${result.recipe.dietLabels.length >0? result.recipe.dietLabels:"No data found" }</p>
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
    </div>
    `

    })
    searchResultDiv.innerHTML = generatedHTML;
}
