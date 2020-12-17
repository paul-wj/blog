import React, {FC, ReactElement, useEffect, useLayoutEffect, useState} from "react";
// @ts-ignore
import APlayer from 'aplayer';
import {getSongList} from "../../../../service/user";
import {SongInfo} from "../../../../types/user";
import './index.scss';

interface APlayerProps {
    name: string;
    artist: string;
    url: string;
    cover: string;
}

export const AppPlayer: FC = (): ReactElement => {

    const [songList, setSongList] = useState<APlayerProps[]>([]);

    const fetchGetSongList = async () => {
        const {flags, data} = await getSongList();
        if (flags === 'success') {
            if (data?.length) {
                setSongList(data.map(({name, picUrl, author, url}: SongInfo) => ({
                    name,
                    artist: author,
                    url,
                    cover: picUrl,
                })));
            }
        }
    };

    useEffect(() => {
        fetchGetSongList();
    }, []);

    useLayoutEffect(() => {
        const aPlayer = new APlayer({
            container: document.getElementById('music-player'),
            fixed: true,
            autoplay: true,
            audio: songList
        });
        return () => {
            aPlayer.destroy();
        }
    }, [songList]);

    return (
        <div id="music-player" />
    )
};

export default AppPlayer;
