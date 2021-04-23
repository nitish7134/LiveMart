const { Expo } = require('expo-server-sdk');
const expo = new Expo();
const sendNotifications = async (pushTokens, title, body) => {
    try {
        // Create the messages that you want to send to clents
        let messages = [];
        for (let pushToken of pushTokens) {
            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
            // Construct a message
            const message = {
                to: pushToken,
                sound: 'default',
                title,
                body
            }
            messages.push(message)
        }
        // Batching nofications
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sendNotifications,
    expo
}