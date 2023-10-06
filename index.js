import { menuArray } from './data.js'

const menuElement = document.getElementById('menu-element')

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
				<div class="add-btn align-right">
					<p>+</p>
				</div>
				<!-- <img class="align-right" src="./img/Ellipse.png" alt="Circle icon"> -->
			</div>
			`
		)
		.join('')
}

menuElement.innerHTML = getMenuHtml()
const test = getMenuHtml()
console.log(test)
