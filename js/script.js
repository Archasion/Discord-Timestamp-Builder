// Format: 2015-03-25T12:00:00-06:30

$(document).ready(function () {
	for (var i = -12; i <= 14; i++) {
		let formattedTimezone = "GMT";

		if (i < 0) formattedTimezone = `GMT${i}`;
		else if (i > 0) formattedTimezone = `GMT+${i}`;

		let value = "+00:00";

		if (i < 0) value = `+${i * -1}:00`;
		if (i > 0) value = `-${i}:00`;
		if (value.match(/^[+-]\d{1}:00$/gi)) value = `${value[0]}0${value.slice(1)}`;

		if (value === "+00:00")
			$("#timezone").append(
				`<option value="${value}" default selected>${formattedTimezone}</option>`
			);
		else $("#timezone").append(`<option value="${value}">${formattedTimezone}</option>`);
	}

	const currentDate = new Date(Date.now());

	const options = {
		F: {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric"
		},
		f: {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric"
		},
		D: {
			year: "numeric",
			month: "long",
			day: "numeric"
		},
		d: {},
		T: {
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		},
		t: {
			hour: "numeric",
			minute: "numeric"
		}
	};

	$("#year").val(currentDate.getFullYear());
	$("#month").val(currentDate.getMonth() + 1);
	$("#day").val(currentDate.getDate());
	$("#hour").val(currentDate.getHours());
	$("#minute").val(currentDate.getMinutes());
	$("#second").val(currentDate.getSeconds());

	$("#raw-timestamp").text(`<t:${parseInt(currentDate / 1000)}:F>`);
	$("#user-message").text(currentDate.toLocaleString("en-US", options.F));

	$("#clear").click(function () {
		$("input").val("");
	});

	$("#copy").click(function () {
		navigator.clipboard.writeText($("#raw-timestamp").text());

		$(this).text("COPIED");
		$(this).css("background", "#52bf52");

		setTimeout(function () {
			$("#copy").text("COPY");
			$("#copy").removeAttr("style");
		}, 1000);
	});

	$("#convert").click(function () {
		const dateItems = { day: null, month: null, year: null, hour: null, minute: null, second: null };
		const selectionItems = { timezone: null, type: null };

		for (const item in dateItems) dateItems[item] = $(`#${item}`).val();
		for (const item in selectionItems) selectionItems[item] = $(`#${item} :selected`).val();

		let { day, month, year, hour, minute, second } = dateItems;
		let { timezone, type } = selectionItems;

		if (!year) year = currentDate.getFullYear();
		if (!month) month = currentDate.getMonth() + 1;
		if (!day) day = currentDate.getDate();
		if (!hour) hour = currentDate.getHours();
		if (!minute) minute = currentDate.getMinutes();
		if (!second) second = currentDate.getSeconds();

		if (year.toString().match(/^\d{2}$/gi)) year = `20${year}`;
		if (month.toString().match(/^\d{1}$/gi)) month = `0${month}`;
		if (day.toString().match(/^\d{1}$/gi)) day = `0${day}`;
		if (hour.toString().match(/^\d{1}$/gi)) hour = `0${hour}`;
		if (minute.toString().match(/^\d{1}$/gi)) minute = `0${minute}`;
		if (second.toString().match(/^\d{1}$/gi)) second = `0${second}`;

		const dateString = `${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`;

		console.log(dateString);

		try {
			const date = new Date(dateString);
			$("#raw-timestamp").text(`<t:${parseInt(date / 1000)}:${type}>`);

			// prettier-ignore
			if (!type.match(/[tr]/gi)) $("#user-message").text(date.toLocaleDateString("en-US", options[type]));
			else if (type === "R") $("#user-message").text(moment(date.toISOString()).fromNow());
			else $("#user-message").text(date.toLocaleTimeString("en-US", options[type]));
		} catch {
			alert("Invalid date");
			$("input").val("");
			return;
		}
	});

	$("#toggle-theme").click(function () {
		if ($("#theme-icon").attr("src").includes("light-theme")) {
			$("#theme-icon").attr("src", "icons/dark-theme.svg");
			document.documentElement.style.setProperty("--primary-text-color", "#313131");
			document.documentElement.style.setProperty("--secondary-text-color", "#00000050");
			document.documentElement.style.setProperty("--primary-box-color", "#fff");
			document.documentElement.style.setProperty("--secondary-box-color", "#F4F4F4");
			document.documentElement.style.setProperty("--tertiary-box-color", "#00000021");
			document.documentElement.style.setProperty("--bg-color", "#E8E8E8");
			document.documentElement.style.setProperty("--pattern-color", "#dbdde4");
			document.documentElement.style.setProperty("--accent-color", "#5267fa");
			document.documentElement.style.setProperty("--input-color", "#fff");
		} else if ($("#theme-icon").attr("src").includes("dark-theme")) {
			$("#theme-icon").attr("src", "icons/light-theme.svg");
			document.documentElement.style.setProperty("--primary-text-color", "#fff");
			document.documentElement.style.setProperty("--secondary-text-color", "#dcddde");
			document.documentElement.style.setProperty("--tertiary-text-color", "#ffffff6d");
			document.documentElement.style.setProperty("--primary-box-color", "#18191b");
			document.documentElement.style.setProperty("--secondary-box-color", "#25272c");
			document.documentElement.style.setProperty("--tertiary-box-color", "#ffffff13");
			document.documentElement.style.setProperty("--bg-color", "#2f3136");
			document.documentElement.style.setProperty("--pattern-color", "#27282c");
			document.documentElement.style.setProperty("--accent-color", "#5267fa");
			document.documentElement.style.setProperty("--input-color", "#464a52");
		}
	});
});
