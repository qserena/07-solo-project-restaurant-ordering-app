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
	` +
		order
			.map((value, index) =>
				value > 0
					? `
					<div class="order-row">
						<p class="order-item-title">${value} ${menuArray[index].name}</p>
						<p class="order-item-remove">remove</p>
						<p class="align-right order-price">$${value * menuArray[index].price}</p>
					</div>
					`
					: ``
			)
			.join('') +
		`
			<div class="order-total-row">
				<p class="order-item-title">Total price:</p>
				<p class="align-right order-price">$${getTotalPrice()}</p>
			</div>
			` +
		`<button class="order-purchase-btn">Complete order</button>
		
	</div>`
}

function getTotalPrice() {
	let sum = 0
	order.forEach(function (value, index) {
		sum += value * menuArray[index].price
	})
	return sum
}

function getMenuHtml() {
	return menuArray
		.map(
			(item) => `
			<div class="menu-item">
				<img src="${item.image}" alt="image of ${item.name}"> 
				<div class="menu-item-details">
					<p class="menu-item-title">${item.name}</p>
					<p class="menu-item-ingredients">${item.ingredients.join(', ')}</p>
					<p class="menu-item-price">$${item.price}</p>
				</div>
				<div class="add-btn align-right" data-item-id="${item.id}">
					<p data-item-id="${item.id}">+</p>
				</div>
			</div>
			`
		)
		.join('')
}

menuContainer.innerHTML = getMenuHtml()
