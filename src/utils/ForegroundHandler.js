import React, { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

export default ForegroundHandler = () => {
    useEffect(() => {
        //forGround Message
        const unSubscribe =
            messaging().onMessage(async remoteMessage => {
                console.log('Notification caused app open from foreground state  in the ForegroundHandler component', remoteMessage);
                console.log("trying to load ForegroundHandler component")
                PushNotification.localNotification({
                    channelId: "your-channel-id",
                    title: 'cctv app ',
                    messageId: '',
                    imageUrl: '',
                    body: "body test",
                    soundName: 'default',
                    vibrate: true,
                    playSound: true,

                })

            });
        return unSubscribe
    }, [])
    return null
}