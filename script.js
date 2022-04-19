// DARKMODE
const darkMode = document.getElementById("dark-mode");
// Set dark by click toggle switch
darkMode.addEventListener("click", () => {
	const html = document.querySelector("html");
	darkMode.checked ? html.classList.add("dark") : html.classList.remove("dark");
});
// Set dark whenever system theme change
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		darkMode.click();
	});
// Set dark if system theme is dark on first load
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	darkMode.click();
}

// POPUP
const navBtn = document.querySelectorAll(".nav-bttn");
// Add click listener each navigation button to open n close popup window
navBtn.forEach((navBtn) => {
	navBtn.addEventListener("click", () => {
		const parent = navBtn.parentElement;
		const popup = parent.querySelector("section");
		const close = popup.querySelector(".popup-close");
		popup.classList.toggle("hidden");
		close.onclick = () => {
			popup.classList.toggle("hidden");
		};
	});
});
