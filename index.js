
// start for nav script

const ninja = document.querySelector('#ninja');
const menu = document.querySelector('#menu');

ninja.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});

const visitHome = document.querySelector('#visitHome');
const visitFavorites = document.querySelector('#visitFavorites');
const visitAbout = document.querySelector('#visitAbout');
const homePage = document.querySelector('#homePage');
const favoritesPage = document.querySelector('#favoritesPage');
const aboutPage = document.querySelector('#aboutPage');

visitHome.addEventListener('click', () => { 
    console.log('visit home');
    // if (favoritesPage.classList.contains('hidden')) {
    //     favoritesPage.classList.remove('hidden');
    //     homePage.classList.add('block');
    // }
    if (homePage.classList.contains('hidden')) {
        homePage.classList.remove('hidden');
        favoritesPage.classList.add('hidden');
        aboutPage.classList.add('hidden');

        // mark as active style
        visitHome.classList.remove('border-white');
        visitHome.classList.add('border-primary');
        visitFavorites.classList.remove('border-primary');
        visitFavorites.classList.add('border-white');
        visitAbout.classList.remove('border-primary');
        visitAbout.classList.add('border-white');
    }
});

visitFavorites.addEventListener('click', () => { 
    console.log('visit favorites Page.');
    if (favoritesPage.classList.contains('hidden')) {
        favoritesPage.classList.remove('hidden');
        homePage.classList.add('hidden');
        aboutPage.classList.add('hidden');

        // mark as active style
        visitFavorites.classList.remove('border-white');
        visitFavorites.classList.add('border-primary');
        visitHome.classList.remove('border-primary');
        visitHome.classList.add('border-white');
        visitAbout.classList.remove('border-primary');
        visitAbout.classList.add('border-white');
    }
    // reload the favs
    getMealsToFavorites();

    createFavoritesMealsList();
});

visitAbout.addEventListener('click', (e) => {
    console.log('visit about page.');
    if (aboutPage.classList.contains('hidden')) {
        aboutPage.classList.remove('hidden');
        homePage.classList.add('hidden');
        favoritesPage.classList.add('hidden');
    }

    // mark as active style
    visitAbout.classList.remove('border-white');
    visitAbout.classList.add('border-primary');
    visitHome.classList.remove('border-primary');
    visitHome.classList.add('border-white');
    visitFavorites.classList.remove('border-primary');
    visitFavorites.classList.add('border-white');
});

// end for nav script

// APIs from themealdb.com

const mealsElement = document.getElementById('meals');

const closeModelElement = document.querySelector('#closeModelBtn');
const modelElement = document.getElementById('modelDetail');

closeModelElement.addEventListener('click', () => {
    console.log('close model element is clicked');
    if (modelElement.classList.contains('flex')) {
        modelElement.classList.remove('flex');
        modelElement.classList.add('hidden');
    } else {
        console.log('closed');
    }
});

const activeSvgInnerHTML =
    `<svg class="w-7 inline-block" data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
    </svg>`;

const inactiveSvgInnerHTML =
    `<svg class="w-7 inline-block" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
    </svg>`;


async function getMealsBySearch(term) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const responseData = await response.json();
    const meals = responseData.meals;

    return meals;
}

async function getMealById(id) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const responseData = await response.json();
    const meal = responseData.meals[0];

    return meal;
}

async function getRandomMeal() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const responseData = await response.json();
    const randomMeal = responseData.meals[0];

    console.log('meal:', randomMeal);
    addMeal(randomMeal, true);
}

function addMeal(meal, random = false) {
    const mealElement = document.createElement('div');
    mealElement.classList.add('card');
    mealElement.classList.add('cursor-pointer');
    mealElement.classList.add('hover:shadow-lg');

    mealElement.innerHTML =
        `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 sm:h-52 object-cover">
        <div class="flex flex-row justify-between items-center p-4">
            <div class="open-meal-details">
                <span class="text-slate-700 meal-text-title">${meal.strMeal}</span>
                <span class="block text-gray-500 text-sm">${meal.strArea}</span>
            </div>
            <div class="pl-2">
                <span class="p-2 text-primary border border-gray-400 rounded-md">${meal.strCategory}</span>
            </div>
        </div>
        <div class="p-4 border-t-2 max-h-28 mb-4">
            <p class="meal-text-description ">$${meal.strInstructions}</p>
        </div>
        <div id="fav${meal.idMeal}" class="fav-badge">        
            <svg class="w-7 inline-block" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
              </svg>
        </div>`;
        
    mealsElement.appendChild(mealElement);

    // var openMealDetails = document.querySelector('.open-meal-details');

    mealElement.addEventListener('click', () => { 
        // Open Model for meal Details
        console.log('meal clicked : ', meal.strMeal);

        var model = document.getElementById('modelDetail');
        if (model.classList.contains('hidden')) {
            model.classList.add('flex');
            model.classList.remove('hidden');
        }

        viewMealDetails(meal);
    });

    var favButton = document.querySelector(`#fav${meal.idMeal}`);

    const activeSvg = createSvgElement(activeSvgInnerHTML);
    const inactiveSvg = createSvgElement(inactiveSvgInnerHTML);

    // add to Favorites2
    favButton.addEventListener('click', (event) => {
        // reload the favs
        getMealsToFavorites()

        event.stopPropagation();
        if (favButton.classList.contains('active')) {
            console.log('inactive');
            favButton.classList.remove('active');
            replaceSvgElement(favButton, inactiveSvg);
            removeMealFromLocalStorage(meal.idMeal);
        } else {
            console.log('active');
            favButton.classList.add('active');
            replaceSvgElement(favButton, activeSvg);
            // addMealToFavorites(meal);
            addMealToLocalStorage(meal.idMeal);
        }

    });
}

function getMealsFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

function addMealToLocalStorage(mealId) {
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

    console.log('add Meal to storage:: ', mealIds);
}

function removeMealFromLocalStorage(mealId) {
    const mealIds = getMealsFromLocalStorage();

    mealId = mealId.toString();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId || !mealId.includes(id))));

    console.log('remove Meal to storage:: ', mealIds);
}

function getMealsToFavorites() {
    var mealIds = getMealsFromLocalStorage();

    const emptyFavsElement = document.getElementById('emptyFavs');
    const markAsFavsElement = document.getElementById('markAsFavs');

    console.log('meal ids', mealIds);

    if (mealIds === null || mealIds.length == 0) {
        markAsFavsElement.classList.add('hidden');
        emptyFavsElement.classList.remove('hidden');
    } else {
        emptyFavsElement.classList.add('hidden');
        markAsFavsElement.classList.remove('hidden');
    }

}

// clear all favorites 
document.getElementById('clearFavs').addEventListener('click', () => {
    localStorage.clear();
    
    var allFavBadges = document.querySelectorAll('.fav-badge');

    allFavBadges.forEach((currentFav) => {
        // console.log('current ', currentFav);
        currentFav.innerHTML = inactiveSvgInnerHTML;
    })

    console.log('clear local storage clicked');
    getMealsToFavorites();
});

function createSvgElement(svgInnerHTML) {
    const div = document.createElement('div');
    div.innerHTML = svgInnerHTML.trim(); // Remove leading/trailing whitespaces
    return div.firstChild;
}

function replaceSvgElement(parentElement, newSvgElement) {
    const oldSvgElement = parentElement.querySelector('svg');
    console.log('oldSvgElement', oldSvgElement);
    console.log('newSvgElement', newSvgElement);
    if (oldSvgElement) {
        parentElement.replaceChild(newSvgElement, oldSvgElement);
    }
}

function viewMealDetails(meal) {
    console.log('meal to view: ', meal);
    var mealTitle = document.getElementById('recipeDetailTitle');
    var mealArea = document.getElementById('recipeDetailArea');
    var mealCategory = document.getElementById('recipeDetailCategory');
    var mealThumb = document.getElementById('recipeDetailThumb');
    var mealInstructions = document.getElementById('recipeDetailInstructions');
    var mealSource = document.getElementById('recipeDetailSource');
    var mealYouTube = document.getElementById('recipeDetailYouTube');

    mealTitle.innerHTML = meal.strMeal;
    mealArea.innerHTML = meal.strArea;
    mealCategory.innerHTML = meal.strCategory;
    mealInstructions.innerHTML = meal.strInstructions;

    // mealSource.innerHTML = meal.strMeal;
    // mealThumb.innerHTML = meal.strMealThumb;
    // mealYouTube.innerHTML = meal.strMeal;
    mealThumb.setAttribute('src', meal.strMealThumb);
    mealSource.setAttribute('href', meal.strSource);
    
    var youtubeEmbedUrl = convertToEmbeddedUrl(meal.strYoutube); 
    mealYouTube.setAttribute('src', youtubeEmbedUrl);

    // get array of meal Ingredients by meal for table
    var mealIngredients = getMealIngredients(meal);
    console.log(mealIngredients);

    var mealMeasures = getMealMeasures(meal);
    console.log(mealMeasures);

    var mealIngredientsTable = document.getElementById('recipeDetailTBodyIngredients');

    for (let index = 0; index < mealMeasures.length; index++) {
        // const td1 = mealIngredients[index];
        // const td2 = mealMeasures[index];
        // <tr class="hover: bg-opacity-30 hover:bg-gray-950 hover:rounded-md">
        //     <td class="px-4 py-2 text-left uppercase">onine paste</td>
        //     <td class="px-4 py-2 text-right uppercase">1</td>
        // </tr>
        // console.log('meal ingredient index: ', mealIngredients[index]);
        if (mealIngredients == null || mealIngredients[index].trim() === "" || mealMeasures[index].trim() === "") {
            break;
        }

        const row = document.createElement('tr');
        row.classList.add('hover:bg-opacity-30');
        row.classList.add('hover:bg-gray-950');
        row.classList.add('hover:rounded-md');

        for (let col = 0; col < 1; col++) {
            const cell1 = document.createElement('td');
            cell1.classList.add('px-4');
            cell1.classList.add('py-2');
            cell1.classList.add('text-left');
            cell1.classList.add('uppercase');
            
            cell1.textContent = mealIngredients[index];

            const cell2 = document.createElement('td');
            cell2.classList.add('px-4');
            cell2.classList.add('py-2');
            cell2.classList.add('text-right');
            cell2.classList.add('uppercase');

            cell2.textContent = mealMeasures[index];

            row.appendChild(cell1);
            row.appendChild(cell2);
        };

        mealIngredientsTable.appendChild(row);
    }

    var tags = meal.strTags ? meal.strTags.split(',') : [];

    var mealTags = document.getElementById('recipeDetailTags');

    for (let index = 0; index < tags.length; index++) {
        const element = tags[index];
        // <div id="recipeDetailTags" class="mb-8">
        //     <span class="rounded-full p-2 text-white bg-green-600 mr-4">tag 1</span>
        //     <span class="rounded-full p-2 text-white bg-rose-600 mr-4">tag 2</span>
        // </div>
        const tagElement = document.createElement('span');
        tagElement.classList.add('rounded-full');
        tagElement.classList.add('inline-block');
        tagElement.classList.add('p-2');
        tagElement.classList.add('mb-4');
        tagElement.classList.add('text-white');
        tagElement.classList.add('bg-rose-300');
        tagElement.classList.add('mr-4');
        // tagElement.classList.add('px-4');
        // tagElement.classList.add('py-2');
        // tagElement.classList.add('border');

        tagElement.textContent = element;

        mealTags.appendChild(tagElement);
    }
}

function getMealMeasures(meal) {
    var measures = [];

    console.log('ingredients measures:: ');
    for (let index = 1; index <= 20; index++) {
        const measureKey = `strMeasure${index}`;
        // console.log(' ', measureKey);
        if (meal[measureKey]) {
            measures.push(meal[measureKey]);
        }
    }

    return measures;
}

function getMealIngredients(meal) {
    var ingredients = [];

    console.log('ingredients items:: ');
    for (let index = 1; index <= 20; index++) {
        const ingredientKey = `strIngredient${index}`;
        // console.log(' ', ingredientKey);
        if (meal[ingredientKey]) {
            ingredients.push(meal[ingredientKey]);
        }
    }

    return ingredients;
}

// Function to convert YouTube URL to embedded format
function convertToEmbeddedUrl(youtubeUrl) {
    const videoId = getYoutubeVideoId(youtubeUrl);
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
// Function to extract video ID from YouTube URL
function getYoutubeVideoId(youtubeUrl) {
    const regex = /[?&]v=([^?&]+)/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
}

function createFavoritesMealsList() {
    var mealIds = getMealsFromLocalStorage();

    const favMealsElement = document.getElementById('markAsFavs');

    favMealsElement.innerHTML = '';

    mealIds.forEach(async mealId => {
        var meal = await getMealById(mealId);
        console.log(`meal by id: ${mealId}`, meal);
        var favMealItemElement = document.createElement('div');
        favMealItemElement.classList.add('fav-item');      
        favMealItemElement.id = `removeFavRecepie${meal.idMeal}`;
        favMealItemElement.innerHTML =
            `<div class="flex justify-between items-center hover:bg-slate-600 p-2 mb-4 rounded-md">
                <img id="favRecipe${mealId}" src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-24 h-24 object-cover rounded-full border-2 border-spacing-1 border-white mr-4 cursor-pointer p-1">
                <span class="select-none" >${meal.strMeal}</span> 
                <div onClick="removeAndUpdateFavsMeals(${meal.idMeal})" class="fav-close-btn p-2 rounded-full hover:bg-red-500 cursor-pointer">
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>                                  
                </div>
            </div>`;
        
        favMealsElement.appendChild(favMealItemElement);

        var openFavMeal = document.getElementById(`favRecipe${mealId}`);
        openFavMeal.addEventListener('click', (event) => {
            // event.stopPropagation();
            console.log('getting view request for ::', meal);
            var model = document.getElementById('modelDetail');
            if (model.classList.contains('hidden')) {
                model.classList.add('flex');
                model.classList.remove('hidden');
            } else {
                console.log('unable to open model.');
            }

            viewMealDetails(meal);
        });

        // var removeFavMeal = document.getElementById(`#removeFavRecepie${meal.mealId}`);
        // // removeFavMeal.addEventListener('click', (event) => {
        // //     console.log('tring to close:: meal', mealId);
        // //     removeMealFromLocalStorage(meal.idMeal);
        // // });

        // console.log('removeFavMeal::', removeFavMeal);

        // var removeFavMeal = document.querySelector('.fav-close-btn .p-2 .rounded-full .cursor-pointer');
        // console.log(removeFavMeal);
    });
}



// search meal 
const searchRecipesContentsElement = document.getElementById('searchRecipesContents');
const searchMealFormElement = document.getElementById('searchMealForm');
const searchInputElement = document.getElementById('searchItem');
const searchButtonElement = document.getElementById('search');
const emptySearchResultsElement = document.getElementById('emptySearchResults');
const searchResultsElement = document.getElementById('searchResults');
const searchedMealCountsElement = document.getElementById('searchedMealCounts');
const searchMealsElement = document.getElementById('searchMeals');

searchButtonElement.addEventListener('click', async (e) => { 
    e.preventDefault();
    // view search recipes contents
    searchRecipesContentsElement.classList.remove('hidden');

    var searchValue = searchInputElement.value;
    console.log('search value: ', searchValue);

    if (searchValue === "" || searchValue === null) {
        alert('Please Enter any Value');
        return;
    }

    searchInputElement.value = "";

    const searchStringHTML = document.getElementById('searchingString');
    searchStringHTML.textContent = `"${searchValue.trim()}"`;

    // search data on api
    var searchResultMeals = await getMealsBySearch(searchValue);
    console.log(`search result for ${searchValue}:: ${searchResultMeals}`);

    searchMealsElement.innerHTML = '';

    if (searchResultMeals == null) {
        // show empty Search Results div
        emptySearchResultsElement.classList.remove('hidden');
        searchResultsElement.classList.add('hidden');
    } else {
        emptySearchResultsElement.classList.add('hidden');
        searchResultsElement.classList.remove('hidden');

        var searchedMealCounts = searchResultMeals.length;

        searchedMealCountsElement.textContent = searchedMealCounts;

        // display results
        for (let index = 0; index < searchResultMeals.length; index++) {
            const meal = searchResultMeals[index];
            console.info('meal::', meal);
            var searchCard = document.createElement('div');
            searchCard.classList.add('card');
            searchCard.classList.add('shadow-md');
            searchCard.classList.add('hover:shadow-lg');

            searchCard.innerHTML =
                `<div class="flex flex-col justify-between">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-32 sm:h-48 object-cover" />
                    
                    <div class="flex flex-col text-black ml-4 my-4 mr-4">
                        <span class="meal-text-title">${meal.strMeal}</span>
                        <span class="text-xl font-semibold">${meal.strArea}</span>
                        <span class="text-base font-light text-primary">${meal.strCategory}</span>
                        <p class="meal-text-description">${meal.strInstructions.trim()}</p>
                        <button id="searchRecipe${meal.idMeal}" type="button" class="h-10 w-auto max-w-[50%] mt-2 text-white bg-primary rounded-md">View</button>
                    </div>
                    
                    <div id="searchFav${meal.idMeal}" class="fav-badge">        
                        <svg class="w-7 inline-block" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                            </svg>
                    </div>

                </div>`;
            
            searchMealsElement.appendChild(searchCard);

            var openResultMeal = document.getElementById(`searchRecipe${meal.idMeal}`);
            openResultMeal.addEventListener('click', (event) => {
                // event.stopPropagation();
                console.log('getting view request for ::', meal);
                var model = document.getElementById('modelDetail');
                if (model.classList.contains('hidden')) {
                    model.classList.add('flex');
                    model.classList.remove('hidden');
                } else {
                    console.log('unable to open model.');
                }

                viewMealDetails(meal);
            });

            let searchFavButton = document.querySelector(`#searchFav${meal.idMeal}`);
            const searchActiveSvg = createSvgElement(activeSvgInnerHTML);
            const searchInactiveSvg = createSvgElement(inactiveSvgInnerHTML);

            // searchFavButton.addEventListener('click', toggleFavorite);

            function toggleFavorite(event) {

                event.stopPropagation();
                if (searchFavButton.classList.contains('active')) {
                    console.log('inactive meal fav: ', meal.idMeal);
                    searchFavButton.classList.remove('active');
                    replaceSvgElement(searchFavButton, searchInactiveSvg);
                    removeMealFromLocalStorage(meal.idMeal);
                } else {
                    console.log('active meal fav: ', meal.idMeal);
                    searchFavButton.classList.add('active');
                    replaceSvgElement(searchFavButton, searchActiveSvg);
                    addMealToLocalStorage(meal.idMeal);
                }
            }

            // add to Favorites2
            searchFavButton.addEventListener('click', toggleFavorite);

            // searchFavButton.addEventListener('click', (event) => {
            //     // reload the favs
            //     getMealsToFavorites()
            
            //     event.stopPropagation();
            //     if (searchFavButton.classList.contains('active')) {
            //         console.log('inactive');
            //         searchFavButton.classList.remove('active');
            //         replaceSvgElement(searchFavButton, searchInactiveSvg);
            //         removeMealFromLocalStorage(meal.idMeal);
            //     } else {
            //         console.log('active');
            //         searchFavButton.classList.add('active');
            //         replaceSvgElement(searchFavButton, searchActiveSvg);
            //         // addMealToFavorites(meal);
            //         addMealToLocalStorage(meal.idMeal);
            //     }
            // });
        }
    }

});

function removeAndUpdateFavsMeals(mealId) {
    console.log('update or remove::', mealId);
    var itemToDel = document.getElementById(`removeFavRecepie${mealId}`);
    console.log('HTML item: ', itemToDel);
    removeMealFromLocalStorage([mealId]);
    itemToDel.remove();

    if (getMealsFromLocalStorage().length == 0) {
        getMealsToFavorites();
    }
}


function init() {
    for (let index = 0; index < 8; index++) {
        getRandomMeal();
    }
}

init();

const loadMoreElement = document.querySelector('#loadMore');

loadMoreElement.addEventListener('click', () => { init(); });
