$(document).ready(function () {
	$("#toggle-theme").click(function () {
		if ($("#theme-icon").attr("src").includes("light-theme")) {
			$("#theme-icon").attr("src", "icons/dark-theme.svg");
			document.documentElement.style.setProperty("--primary-text-color", "#313131");
			document.documentElement.style.setProperty("--secondary-text-color", "#00000050");
			document.documentElement.style.setProperty("--primary-box-color", "#fff");
			document.documentElement.style.setProperty("--secondary-box-color", "#F4F4F4");
			document.documentElement.style.setProperty("--bg-color", "#E8E8E8");
			document.documentElement.style.setProperty("--accent-color", "#5267fa");
			document.documentElement.style.setProperty("--input-color", "#fff");
		} else if ($("#theme-icon").attr("src").includes("dark-theme")) {
			$("#theme-icon").attr("src", "icons/light-theme.svg");
			document.documentElement.style.setProperty("--primary-text-color", "#fff");
			document.documentElement.style.setProperty("--secondary-text-color", "#dcddde");
			document.documentElement.style.setProperty("--tertiary-text-color", "#ffffff6d");
			document.documentElement.style.setProperty("--primary-box-color", "#18191b");
			document.documentElement.style.setProperty("--secondary-box-color", "#25272c");
			document.documentElement.style.setProperty("--bg-color", "#2f3136");
			document.documentElement.style.setProperty("--accent-color", "#5267fa");
			document.documentElement.style.setProperty("--input-color", "#464a52");
		}
	});
});
