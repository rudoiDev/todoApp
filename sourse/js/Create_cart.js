// @prepros-append main.js

class Create {
	constructor(option) {
		this.description = option; 
	}
	createCart() {
		return `<li class="ul_text animate__animated animate__bounceIn">
				<div class="ul_description">${this.description}</div>
				<div class="li_buttons">
					<button class="li_buttons__finish button_style"> 
						Готово
					</button>
					<button class="li_buttons_delete button_style">
						Удалить
					</button>
				</div>
			</li>` 
	}
	showPrevent() {
		let inf = document.querySelector(`.ul_inform`);
		let btnClear = document.querySelector('.btn_clear');
		if (document.querySelector('.ul_text')) {
			inf.style.display = 'none';
			btnClear.style.display = 'block';
		} else {
			inf.style.display = 'block';
			btnClear.style.display = 'none';
		}; // пока не существует элементов списка, выводится фраза "Список пуст". Как только появится элемент, будет добавлен специальный класс, который скрывает эту фразу
	}
	addCarts() {
		ulContainer.insertAdjacentHTML('afterbegin', this.createCart())
		input.value = ''; // обнуляем значение value
		this.showPrevent();
	}
}