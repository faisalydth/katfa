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
const popupClose = document.querySelectorAll(".popup-close");
// Add click listener each navigation button to open n close popup window
navBtn.forEach((navBtn) => {
	navBtn.addEventListener("click", () => {
		const parent = navBtn.parentElement;
		const popup = parent.querySelector(".popup");
		popup.classList.remove("hidden");
	});
});

popupClose.forEach((close) => {
	close.addEventListener("click", () => {
		const parent = close.parentElement;
		parent.parentElement.classList.add("hidden");
	});
});

// Message Incorrect close by timer for 2 second
const msgIncor = document.getElementById("msg-incor");
if (!msgIncor.parentElement.classList.contains("hidden")) {
	setTimeout(() => {
		msgIncor.parentElement.classList.add("hidden");
	}, 2000);
}
