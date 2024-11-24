
function showAddRecipeForm() {
    document.getElementById('add-recipe-form').style.display = 'block';
}

function hideAddRecipeForm() {
    document.getElementById('add-recipe-form').style.display = 'none';
}

async function fetchRecipes() {
    const response = await fetch('http://localhost:5000/api/recipes');
    const recipes = await response.json();

    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.ingredients.join(', ')}</p>
            <p>${recipe.instructions}</p>
            <img src="${recipe.imageUrl}" alt="${recipe.title}" width="200">
        `;
        recipeList.appendChild(recipeItem);
    });
}

async function addRecipe() {
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    const imageUrl = document.getElementById('imageUrl').value;

    const recipe = { title, ingredients, instructions, imageUrl };

    const response = await fetch('http://localhost:5000/api/recipes/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    const data = await response.json();

    console.log('Recipe added:', data);

    fetchRecipes();
    hideAddRecipeForm();
}

fetchRecipes();
