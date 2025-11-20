import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
});

export async function getNowPlaying() {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_REFRESH_TOKEN) {
        return null;
    }

    try {
        const data = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(data.body['access_token']);

        const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();

        if (currentTrack.body && currentTrack.body.item && currentTrack.body.is_playing) {
            const item = currentTrack.body.item as SpotifyApi.TrackObjectFull;
            return {
                isPlaying: true,
                title: item.name,
                artist: item.artists.map(artist => artist.name).join(', '),
                album: item.album.name,
                albumArt: item.album.images[0]?.url,
                url: item.external_urls.spotify,
            };
        }

        // If not playing, get recently played
        // const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
        // if (recentlyPlayed.body.items.length > 0) {
        //     const item = recentlyPlayed.body.items[0].track;
        //     return {
        //         isPlaying: false, // Still false to indicate not currently playing
        //         lastPlayed: true, // New flag to indicate this is history
        //         title: item.name,
        //         artist: item.artists.map(artist => artist.name).join(', '),
        //         album: item.album.name,
        //         albumArt: item.album.images[0]?.url,
        //         url: item.external_urls.spotify,
        //     };
        // }

        return { isPlaying: false };
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        return null;
    }
}
