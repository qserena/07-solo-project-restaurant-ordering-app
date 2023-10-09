import { menuArray } from './data.js'

const order = menuArray.map((item) => 0)
const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')
const modal = document.getElementById('modal')
const paymentForm = document.getElementById('payment-form')
const confirmationContainer = document.getElementById('confirmation-container')
let name = ''

document.addEventListener('click', function (e) {
	if (e.target.dataset.itemId) {
		handleAddClick(e.target.dataset.itemId)
	} else if (e.target.dataset.orderId) {
		handleRemoveClick(e.target.dataset.orderId)
	} else if (e.target.id === 'order-purchase-btn') {
		handlePurchaseClick()
	}
})

paymentForm.addEventListener('submit', function (e) {
	e.preventDefault()

	const paymentFormData = new FormData(paymentForm)
	name = paymentFormData.get('full-name')

	modal.style.display = 'none'

	let addButtons = document.getElementsByClassName('add-btn')
	Array.from(addButtons).forEach(function (btn) {
		btn.classList.add('disabled')
	})

	const firstName = name.includes(' ')
		? name.substring(0, name.indexOf(' '))
		: name

	document.getElementById(
		'confirmation-text'
	).textContent = `Thanks, ${firstName}! Your order is on its way!`

	confirmationContainer.classList.remove('hidden')
})

function handleAddClick(itemId) {
	order[itemId]++
	renderOrder()
}

function handleRemoveClick(itemId) {
	order[itemId]--
	renderOrder()
}

function handlePurchaseClick() {
	modal.style.display = 'inline'
	orderContainer.style.display = 'none'
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
						<p class="order-item-remove" data-order-id="${menuArray[index].id}">remove</p>
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
		`<button class="order-purchase-btn" id="order-purchase-btn">Complete order</button>
		
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
