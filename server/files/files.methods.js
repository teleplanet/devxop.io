const httpDeleteAsync = (url, data) =>
    new Promise((resolve, reject) => {
        HTTP.call("DELETE", url, {
            data: data
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

/* Meteor.methods({
    async 'test'({ url, options }) {
        try {
            const response = await httpGetAsync(url, options);
            return response;
        } catch (ex) {
            throw new Meteor.Error('some-error', 'An error has happened');
        }
    },
}); */

Meteor.methods({
    'files.remove': async function (id) {

        let file = Files.findOne(id);

        if (file && file.user_id == this.userId) {
            let data = {
                'user_id': file.user_id,
                'file_id': file._id,
                'file_extension': file.extension
            };

            try {
                const response = await httpDeleteAsync(origins().files, data);
                return response;
            } catch (ex) {
                console.log(ex);
                throw new Meteor.Error('some-error', 'An error has happened');
            }


        }


    },
})