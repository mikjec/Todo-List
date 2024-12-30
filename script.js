let todoInput,
	errorInfo,
	addBtn,
	ulList,
	popup,
	taskCounter = 0

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('ul')
	popup = document.querySelector('.popup')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	todoInput.addEventListener('keydown', event => {
		if (event.key == 'Enter') {
			addNewTask()
		}
	})
}
document.addEventListener('DOMContentLoaded', main)

const addNewTask = () => {
	if (todoInput.value) {
		let li = document.createElement('li')
		let liSpan = document.createElement('span')
		li.appendChild(liSpan)
		liSpan.textContent = todoInput.value
		li.appendChild(addTools())
		ulList.appendChild(li)
		todoInput.value = null

		addBtnsFunc(li)
		taskCounter++
        checkTasks()
	} else {
		errorInfo.textContent = 'Musisz podać treść zadania!'
	}
}

const checkTasks = () =>{
    if (taskCounter == 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	} else {
		errorInfo.textContent = ''
	}
}

const addTools = element => {
	let tools = document.createElement('div')
	tools.classList.add('tools')

	let b1 = document.createElement('button')
	b1.classList.add('complete')
	let i1 = document.createElement('i')
	i1.classList.add('fas')
	i1.classList.add('fa-check')
	b1.appendChild(i1)

	let b2 = document.createElement('button')
	b2.classList.add('edit')
	b2.textContent = 'EDIT'

	let b3 = document.createElement('button')
	b3.classList.add('delete')
	let i3 = document.createElement('i')
	i3.classList.add('fas')
	i3.classList.add('fa-times')
	b3.appendChild(i3)

	tools.appendChild(b1)
	tools.appendChild(b2)
	tools.appendChild(b3)

	return tools
}

const addBtnsFunc = li => {
	const compB = li.querySelector('.complete')
	const editB = li.querySelector('.edit')
	const delB = li.querySelector('.delete')

	compB.addEventListener('click', () => {
		compB.closest('li').classList.toggle('completed')
		if (compB.closest('li').classList.contains('completed')) {
			compB.style.color = 'var(--light-dark)'
			editB.style.color = 'var(--light-dark)'
			editB.style.pointerEvents = 'none'
		} else {
			compB.style.color = ' var(--light-blue)'
			editB.style.color = 'rgb(15, 179, 69)'
			editB.style.removeProperty('pointer-events')
		}
	})

	editB.addEventListener('click', () => editTask(editB))

	delB.addEventListener('click', () => {
		delB.closest('li').remove()
		taskCounter--
        checkTasks()
	})
}

const editTask = btn => {
	popup.style.display = 'flex'

	let popupInput = popup.querySelector('.popup-input')
	let popupAcc = popup.querySelector('.accept')
	let popupCanc = popup.querySelector('.cancel')
	let popupInfo = popup.querySelector('.popup-info')

	popupInput.addEventListener('keydown', event => {
		if (event.key == 'Enter') {
			if (popupInput.value) {
				btn.parentElement.previousElementSibling.textContent = popupInput.value
				popupInput.value = null
				popup.style.display = 'none'
			} else {
				popupInfo.textContent = 'Musisz podać treść zadania!'
			}
		}
	})

	popupAcc.addEventListener('click', () => {
		if (popupInput.value) {
			btn.parentElement.previousElementSibling.textContent = popupInput.value
			popupInput.value = null
			popup.style.display = 'none'
		} else {
			popupInfo.textContent = 'Musisz podać treść zadania!'
		}
	})

	popupCanc.addEventListener('click', () => {
		popupInput.value = null
		popup.style.display = 'none'
	})
}
