let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const editEventModal = document.getElementById('editEventModal');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventDescription = document.getElementById('eventDescription');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
	clicked = date;
	
	const eventForDay = events.find(e => e.date === clicked);
	
	if (eventForDay) {
		document.getElementById('editTitleInput').value = eventForDay.title;
		document.getElementById('editDescription').value = eventForDay.description;
		editEventModal.style.display = 'block';
	} else {
		newEventModal.style.display = 'block';
	}
}

function load() {
	const dt = new Date();
	
	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav);
	}		
	
	const day = dt.getDate();
	const month = dt.getMonth();
	const year = dt.getFullYear();
	
	const firstDayOfMonth = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	
	const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
	const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
	
	document.getElementById('monthDisplay').innerText = 
		`${dt.toLocaleDateString ('en-us', { month: 'long' })} ${year}`;
		
	calendar.innerHTML = '';
	
	for(let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');		
		daySquare.classList.add('day');
		
		const dayString = `${month + 1}/${i - paddingDays}/${year}`;
		
		if (i > paddingDays) {
		  daySquare.innerText = i - paddingDays;
		  
		  const eventForDay = events.find(e => e.date === dayString);
		  
		  if (eventForDay) {
			const eventDiv = document.createElement('div');
			eventDiv.classList.add('event');
			eventDiv.innerText = eventForDay.title;
			daySquare.appendChild(eventDiv);
		  }
		  
		  daySquare.addEventListener('click', () => openModal(dayString));
		} else {
		  daySquare.classList.add('padding');
		}
		
		calendar.appendChild(daySquare);
	};
};

function saveEvent() {
	if (eventTitleInput.value) {
		eventTitleInput.classList.remove('error');
		
		events.push({
			date: clicked,
			title: eventTitleInput.value,
			description: eventDescription.value,
		});
		
	    localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {
		eventTitleInput.classList.add('error');
	}
}

function saveEditEvent() {
	if (editTitleInput.value) {
		editTitleInput.classList.remove('error');
		
		events.push({
			date: clicked,
			title: editTitleInput.value,
			description: editDescription.value,
		});
		
	    localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {
		editTitleInput.classList.add('error');
	}
}

function closeModal() {
	eventTitleInput.classList.remove('error');
	editEventModal.style.display = 'none';
	newEventModal.style.display = 'none';
	eventTitleInput.value = '';
	eventDescription.value = '';
	clicked = null;
	load();
}

function deleteEvent() {
	events = events.filter(e => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}

function initButtons() {
	document.getElementById('nextButton').addEventListener('click', () => {
		nav++;
		load();
	});
	document.getElementById('backButton').addEventListener('click', () => {
		nav--;
		load();
	});
	
	document.getElementById('saveButton').addEventListener('click', saveEvent);
	
	document.getElementById('saveEditButton').addEventListener('click', saveEditEvent);
	
	document.getElementById('cancelButton').addEventListener('click', closeModal);
	
	document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}

initButtons();
load();