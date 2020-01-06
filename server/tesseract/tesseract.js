import Tesseract from 'tesseract.js';



Meteor.methods({
    'tesseract.recognize': async function (file) {

        Tesseract.recognize(
            file,
            'por',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
        })

        return;
    },
})
