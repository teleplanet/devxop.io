Template.test.onRendered(function () {
    document.aColorPicker.from('.picker')
        .on('change', (picker, color) => {
            document.body.style.backgroundColor = color;
        });
});