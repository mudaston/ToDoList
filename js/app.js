'use strict'

document.addEventListener('DOMContentLoaded', () => {
	const ready = document.querySelectorAll('.task-ready');
	const menu = document.querySelector('.menu');
	const points = menu.querySelectorAll('.list__item');
	const wrapper = document.querySelector('.content__wrapper');
	let arr = [Array.from(document.querySelectorAll('.task')), Array.from(ready)];

	menu.addEventListener('click', item => {
		const target = item.target;

		if (target && target.matches('.list__item')) {
			points.forEach(item => {
				item.classList.remove('list__item-active');
			});
			wrapper.innerHTML = '';
			wrapper.style.justifyContent = 'flex-start';
			points.forEach((item, i) => {
				if (target === item) {
					switch (i) {
						case 0:
							arr[0].forEach(item => {
								wrapper.append(item);
							});
							break;
						case 1:
							arr[1].forEach(item => {
								wrapper.append(item);
							});
							break;
						case 2:
							const date = new Date(Date.now());
							const formatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

							wrapper.style.justifyContent = 'center';
							wrapper.innerHTML = `
											<form id="task-add" class="task-add" action="#">
												<div class="task-add__wrapper">
													<label><input type="text" class="task-add__objective" placeholder="Your task..."></label>
													<label><input type="date" value=${formatted} min="2018-01-01" max="2025-12-31"></label>
												</div>
												<button type="submit">add</button>
											</form>`;
							break;
					}
				}
			});

			target.classList.toggle('list__item-active');
		}
	});

	wrapper.addEventListener('click', (e) => {
		const target = e.target;
		const parent = target.parentElement.parentElement;

		if (target && target.matches('img')) {


			if (parent.classList.contains('task-ready')) {
				arr[1].forEach((item, i) => {
					if (item === parent) {
						for (let i = 0; i <= 100; i++) animationToRight(item, i);
						setTimeout(() => item.remove(), 250);
						arr[1].length === 1 ? arr[1] = [] : arr[1].splice(i, 1);
					}
				});
			} else if (parent.classList.contains('task')) {
				arr[0].forEach((item, i) => {
					if (item === parent) {
						for (let i = 0; i <= 100; i++) animationToRight(item, i);
						setTimeout(() => item.remove(), 250);
						arr[0].length === 1 ? arr[0] = [] : arr[0].splice(i, 1);
					}
				});
			}

		} else if (target && target.matches('.task__check')) {
			const temp = target.parentElement.parentElement;
			const text = temp.querySelector('.task__text').innerText;
			const date = temp.querySelector('.task__date').innerText;

			const element = document.createElement('div');

			element.classList.add('task', 'task-ready');
			element.innerHTML = `
				<div class="task__descr">
					<p title="Сделать to do list" class="task__text task-ready__text">${text}</p>
					<p class="task__date">${date}</p>
				</div>
				<div class="task__delete">
					<img src="icons/trash.svg" alt="delete">
				</div>
			`;
			arr[1].push(element);

			setTimeout(() => {
				arr[0].forEach((item, i) => {
					if (temp === item) {
						arr[0][i].remove();
						arr[0].splice(i, 1);
					}
				});
			}, 250);
		} else if (target && target.matches('[type="submit"]')) {
			const date = target.previousElementSibling.querySelector('[type="date"]'),
				input = target.previousElementSibling.querySelector('input');

			if (date.value !== '' && input.value !== '') {
				const element = document.createElement('div');

				element.classList.add('task');
				element.innerHTML = `
					<label><input class="task__check" type="checkbox"></label>
					<div class="task__descr">
						<p title="Сделать to do list" class="task__text">${input.value}</p>
						<p class="task__date">${date.value}</p>
					</div>
					<div class="task__delete">
						<img src="icons/trash.svg" alt="delete">
					</div>
			`;

				arr[0].push(element);
				input.value = '';
			}
		}

	});

});


function animationToRight(item, i) {
	setTimeout(() => {
		item.style.left = `${i}%`;
	}, i * 2);
}
