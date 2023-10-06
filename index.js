import { menuArray } from './data.js'

const order = menuArray.map((item) => 0)
const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')

document.addEventListener('click', function (e) {
	if (e.target.dataset.itemId) {
		handleAddClick(e.target.dataset.itemId)
	}
})

function handleAddClick(itemId) {
	order[itemId]++
	console.log(order)
	renderOrder()
}

function renderOrder() {
	orderContainer.innerHTML =
		`
	<div id="order-element">
		<p class="order-header">Your order</p>
	</div>
	` +
		order
			.map((value, index) =>
				value > 0
					? `
					<div class="order-row">
						<p class="item-title">${value} ${menuArray[index].name}</p>
						<p>remove</p>
						<p class="align-right">$</p>
					</div>
					`
					: ``
			)
			.join('')
}

function getMenuHtml() {
	return menuArray
		.map(
			(item) => `
			<div class="menu-item">
				<img src="${item.image}" alt="image of ${item.name}"> 
				<div>
					<p class="item-title">${item.name}</p>
					<p class="item-ingredients">${item.ingredients.join(', ')}</p>
					<p class="item-price">$${item.price}</p>
				</div>
				<div class="add-btn align-right" data-item-id="${item.id}">
					<p>+</p>
				</div>
			</div>
			`
		)
		.join('')
}

menuContainer.innerHTML = getMenuHtml()
