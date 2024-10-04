const SearchBox =document.querySelector('.SearchBox');
const SearchButton =document.querySelector('.SearchButton');

const  recipeDetailsContent =document.querySelector('.recipe-details-content');

const recipeCloseBtn =document.querySelector('.recipe-close-btn');


const receipecontainer = document.querySelector('.receipecontainer') ;

// function to get recipes

const fetchRecipes = async (kuchbhiChalega) =>{
    receipecontainer.innerHTML="<h2> Fetching Recipes...</h2>";
const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${kuchbhiChalega}`);

const response =  await data.json();
receipecontainer.innerHTML="";
response.meals.forEach (meal => {
   const recipeDiv = document.createElement('div');
   recipeDiv.classList.add('recipe');


recipeDiv.innerHTML = `
   <img src="${meal.strMealThumb}">
   <h3>${meal.strMeal}</h3>
   <p><span>${meal.strArea}</span> Dish</p>
   <p> Belongs to <span> ${meal.strCategory}</span> Category</p>

   `
   const button = document.createElement('button');
//    Ye line ek naya button element create karti hai aur button variable mein store karti hai.

button.textContent = "View Recipe";
//    Is line se button ka text "View Recipe" set kiya ja raha hai.

   recipeDiv.appendChild(button);

   
   //    Ye line button ko recipeDiv ke andar add kar rahi hai.
   


  

button.addEventListener('click', ()=>{
openRecipePopup(meal)
});

 //    Adding Eventlsitner to recipe button

   receipecontainer.appendChild(recipeDiv);

//    Is line se poora recipeDiv (jisme button bhi hai) ko receipecontainer ke andar add kiya ja raha hai.

  
});

//  JO bhi hum search karenge vo iNPUT FETCHREPIES FUNCTION K kbC SE VO THE MEALDB K API ME JAEGA OR SEACH HOGA
}

const fetchingredients = (meal) =>{
let inglist = "";

for(let i=1 ; i<=20; i++){
  let ing = meal[`strIngredient${i}`];
   if(ing){
      const measure =meal[`strMeasure${i}`];
inglist += `<li>${measure} ${ing}</li>`
   }
   else {
      break;
   }
}
return inglist;
}
const openRecipePopup =(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>

    <h3> Ingredients: </h3>
    <ul class="IngredientsList"> ${fetchingredients(meal)}:</ul>
    <div class="recipeInstructions">
    <h3>Instructions</h3>
   <p>${meal.strInstructions}</p>
   </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}


recipeCloseBtn.addEventListener('click',() =>{
   recipeDetailsContent.parentElement.style.display="none";
})

SearchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if(!searchInput){
      receipecontainer.innerHTML=`<h2> Type the meal in the search box...</h2>`;
      return;
    }
    fetchRecipes(searchInput);
 console.log("Button Clicked");

})