import Tesseract from 'tesseract.js';

Template.mediaImages.events({
    'change #imageUploadButton': async ({ target: { files } }) => {
        const { data: { text } } = await Tesseract.recognize(files[0], 'eng', {
            logger: m => console.log(m),
        });
        console.log(text);
    },
});