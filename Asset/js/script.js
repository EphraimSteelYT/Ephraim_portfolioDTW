
document.addEventListener('DOMContentLoaded',function(){

	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// Live clock
	const clockEl = document.getElementById('headerClock');
	if(clockEl){
		function updateClock(){
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-US', {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});
			clockEl.textContent = timeString;
		}
		updateClock();
		setInterval(updateClock, 1000);
	}

	const toggle = document.getElementById('menuToggle');
	const nav = document.getElementById('nav');
	if(toggle && nav){
		toggle.addEventListener('click',()=>{
			nav.classList.toggle('open');
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click',e=>{
			const target = a.getAttribute('href');
			if(target.length>1){
				const el = document.querySelector(target);
				if(el){
					e.preventDefault();
					el.scrollIntoView({behavior:'smooth',block:'start'});
					if(nav) nav.classList.remove('open');
				}
			}
		})
	});

	const revealItems = document.querySelectorAll('.card, .about-card, .hero-left');
	const io = new IntersectionObserver((entries,obs)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.style.opacity = 1;
				entry.target.style.transform = 'none';
				obs.unobserve(entry.target);
			}
		}); 
	},{threshold:0.12});
	revealItems.forEach(it=>{
		it.style.opacity = 0; it.style.transform = 'translateY(12px)';
		io.observe(it);
	});

	// gallery drag/drop support
	const drop = document.getElementById('dropZone');
	const input = document.getElementById('fileInput');
	const thumbs = document.getElementById('thumbs');
	function handleFiles(files){
		for(const file of files){
			if(!file.type.startsWith('image/')) continue;
			const img = document.createElement('img');
			img.src = URL.createObjectURL(file);
			thumbs.appendChild(img);
		}
	}
	drop.addEventListener('click',()=> input.click());
	drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('hover');});
	drop.addEventListener('dragleave',()=>drop.classList.remove('hover'));
	drop.addEventListener('drop',e=>{
		e.preventDefault();drop.classList.remove('hover');
		handleFiles(e.dataTransfer.files);
	});
	input.addEventListener('change',()=> handleFiles(input.files));
});