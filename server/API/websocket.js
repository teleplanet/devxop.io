/* 
Meteor.onConnection((connection) => {
    let sessionId = connection.id;

    // Here store the sessionId somewhere.
    console.log(sessionId);
    console.log(connection);
    // log received messages
    connection.onMessage((message) => {
        console.log("receive", JSON.parse(message));
    });




    connection.onClose(() => {
        // Here delete the stored sessionId.
    });
});
 */
