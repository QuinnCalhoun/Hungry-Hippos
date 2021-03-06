const clearIngredientsBtn = $("#clear-ingredients-button")
const addIngredientBtn = $("#add-ingredient")
// const ingredientList = $("#ingredient-list")
const newIngredientInput = document.querySelector("#new-ingredient-input")
const searchBar = $("#search-bar")
var mainIngredientList = $('#main-ingredient-list')
var activeUserIngredientArray = []
if(JSON.parse(localStorage.getItem(`hh-activeUserIngredientArray`)) !== null){
	activeUserIngredientArray = JSON.parse(localStorage.getItem(`hh-activeUserIngredientArray`))
} 

var ingredientTextInput = $("#ingredient-text-input")
var submitNewIngredientBtn = $("#submit-new-button")

addNewIngredient()

// Adding on click listeners to buttons

// Ingredient List listener
mainIngredientList.on("click", function(){
	appendNewIngredient()
})

// Search bar enter function
$(searchBar).keydown(function (event) {
	if (event.which === 13) {
		event.preventDefault()
		apiSearch()
	}
})

// Add ingredient text bar
$(ingredientTextInput).keydown(function (event) {
	if (event.which === 13) {
		event.preventDefault()
		storeNewIngredient()
		appendNewIngredient()
	}
})

// Clear all checked ingredients button
$(clearIngredientsBtn).on("click", function () {
	clearCheckedIngredients()
})

// Add ingredient button
$(addIngredientBtn).on("click", function () {
	console.log("j")
	addNewIngredient()
})

// Add button to submit a new ingredient
$(submitNewIngredientBtn).on("click", function (e) {
	e.preventDefault()
	storeNewIngredient()
	appendNewIngredient()
})

// Adding Functions

// Clears all checked ingredients
function clearCheckedIngredients() {
	for (var i = activeUserIngredientArray.length - 1; i >= 0; i--) {
		var itemChecked = document.getElementById("check-" + i)
		if (itemChecked.checked === true) {
			activeUserIngredientArray.splice(i, 1)
		}
	}
	appendNewIngredient()
}

// Appends a text input and adds a new ingredient from that search
function addNewIngredient() {
	console.log("h")
	$(ingredientTextInput).empty()

	$(ingredientTextInput).toggle()

	$(submitNewIngredientBtn).toggle()
}

// Append the items in the activeUserIngredientArray
function appendNewIngredient() {
	resultsDiv.empty()
	for (i = 0; i < activeUserIngredientArray.length; i++) {

		var li = $("<li>")
		.addClass("groceries")

		var checkbox = $("<input>")
			.attr("type", "checkbox")
			.attr("id", "check-" + i)
			.attr("class", "checkboxes")
			.val(activeUserIngredientArray[i])

		var label = $("<label>")
			.attr("for", "check-" + i)
			.text(activeUserIngredientArray[i])

		li.appendTo(resultsDiv)
		$(checkbox).appendTo(li)
		$(label).appendTo(li)

	}
}

// Store new ingredients to the activeUserIngredientArray
function storeNewIngredient() {

	activeUserIngredientArray.push(ingredientTextInput.val())
}