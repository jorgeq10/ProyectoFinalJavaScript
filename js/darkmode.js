
const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');

	// Se guarda el modo en localstorage

	if(document.body.classList.contains('dark')){
		localStorage.setItem('dark-mode', 'true');
		Toastify({

			text: "Modo Nocturno On ✅",
			
			duration: 3000
			
			}).showToast();
		
	} else {
		localStorage.setItem('dark-mode', 'false');
		Toastify({

			text: "Modo Nocturno Off ❌",
			
			duration: 3000
			
			}).showToast();
		
	}
	
});

if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.add('dark');
	btnSwitch.classList.add('active');

} else {
	document.body.classList.remove('dark');
	btnSwitch.classList.remove('active');

}
