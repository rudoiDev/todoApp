
let input = document.querySelector(`.input_text`); // получаю поле input

let start = document.getElementById(`input_submit`); // получаю кнопку "добавить задачу"

let ulContainer = document.querySelector(`.ul_list`); // получаю контейнер для карточек

let storageCarts = [];
new Create().showPrevent();
showStorageCarts(); 

ulContainer.addEventListener('click', e => {
	if (e.target.matches('.li_buttons__finish')) {
		e.target.classList.toggle('active_button-complete');
		e.target.closest('.ul_text').classList.toggle('active_task');
		for (let i = 0; i < storageCarts.length; i++) {
			if (e.target.closest('.ul_text').children[0].textContent.trim() == storageCarts[i].text && e.target.closest('.active_task')) {
				storageCarts[i].complete = true;
			} else if (e.target.closest('.ul_text').children[0].textContent.trim() == storageCarts[i].text && !e.target.closest('.active_task')) {
				storageCarts[i].complete = false;
			}
		}
		saveStorageCarts();
	} else if (e.target.closest('.li_buttons_delete')) {
		if (confirm(`Вы уверены?`)) {
			let elem = e.target.closest('.ul_text');
			elem.classList.add('animate__bounceOut');
			deleteStorageCarts(elem);
			setTimeout(() => {
				elem.remove();
				new Create().showPrevent();
			}, 800)
		};
	}
})

document.querySelector('.btn_clear').addEventListener('click', () => {
	if (confirm('Очистить список?')) {
		localStorage.clear();
		storageCarts = [];
		showStorageCarts()
		document.querySelectorAll('.ul_text').forEach(item => {
			item.remove()
		});
		new Create().showPrevent();
	}
})

document.addEventListener(`submit`, e => {
	e.preventDefault(); // отменяем стандартное действие браузера - перезагрузку страницы
	if (input.value == 0) {
		alert(`Поле не заполнено`); // если поле пустое
	} else {
		let newCart = new Create(input.value);
		if (!document.querySelector('.ul_description')) {
			storageCarts.push({
				text: input.value,
				complete: false
			});
			saveStorageCarts();
			newCart.addCarts();
		} else {
			let carts = document.querySelectorAll('.ul_description');
			let repeatCart = false; // счетчик, который меняется, в зависимости от того, если повторяющаяся карта
			for (let item of carts) {
				if (item.textContent.trim().toLowerCase() == input.value.trim().toLowerCase()) {
					repeatCart = true;
					alert('Такая карточка уже есть!');
					return;
				}
			}
			if (repeatCart == false) {
				storageCarts.push({
					text: input.value,
					complete: false
				});
				saveStorageCarts();
				newCart.addCarts();
			}
		}
	};
});

function saveStorageCarts() {
	localStorage.setItem('cart', JSON.stringify(storageCarts))
}
function deleteStorageCarts(elem) {
	for (let i = 0; i < storageCarts.length; i++) {
		if (elem.children[0].textContent.trim() == storageCarts[i].text) {
			storageCarts.splice(i, 1)
			saveStorageCarts();
			return;
		}
	}
}
function showStorageCarts() {
	let todoItems = localStorage.getItem('cart');
	let arrCarts = JSON.parse(todoItems);
	let spinner = document.querySelector('.ul_spinner');
	if (todoItems != null) {
		let inf = document.querySelector(`.ul_inform`);
		inf.style.display = 'none';
		spinner.style.display = 'block';
		setTimeout(() => {
			spinner.style.display = 'none';
			for (let i = 0; i < arrCarts.length; i++) {
				storageCarts.push(arrCarts[i]);
				let newCart = new Create(arrCarts[i].text);
				newCart.addCarts(); // создаю карточки из сохраненных
			}
			for (let i = 0; i < storageCarts.length; i++) {
				if (storageCarts[i].complete == true) {
					document.querySelectorAll('.ul_text').forEach(item => {
						if (item.children[0].textContent.trim() == storageCarts[i].text) {
							item.classList.add('active_task');
							item.children[1].children[0].classList.add('active_button-complete')
						}
					})
				}
			}
		}, 1000); // имитация работы сервера (задержка)
	}
}






