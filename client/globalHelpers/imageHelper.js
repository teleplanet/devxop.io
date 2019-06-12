Template.registerHelper("getUrlFromBlob", function (blob) {
    console.log(blob);
	return URL.createObjectURL(blob);
});