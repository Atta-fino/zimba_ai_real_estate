import React from 'react';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { AgoraVideoPlayer, IAgoraRTCRemoteUser, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const useClient = createClient({ mode: "rtc", codec: "vp8" });
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = ({ channel, token, appId }) => {
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const client = useClient();
    const [users, setUsers] = React.useState([]);
    const [start, setStart] = React.useState(false);

    React.useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", (user, type) => {
                if (type === "audio") {
                    user.audioTrack?.stop();
                }
                if (type === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            await client.join(appId, name, token, null);
            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        };

        if (ready && tracks) {
            init(channel);
        }
    }, [channel, client, ready, tracks]);

    return (
        <div style={{ height: "100%" }}>
            {start && tracks && <AgoraVideoPlayer videoTrack={tracks[1]} />}
            {users.length > 0 &&
                users.map((user) => {
                    if (user.videoTrack) {
                        return (
                            <AgoraVideoPlayer
                                videoTrack={user.videoTrack}
                                key={user.uid}
                            />
                        );
                    } else return null;
                })}
        </div>
    );
}

export default VideoCall;
