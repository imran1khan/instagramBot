import axios from "axios";


export async function uploadReel(videoUrl: string) {
    try {
        const response = await axios.post<{ id: string, uri: string }>(
            `https://graph.facebook.com/v20.0/${process.env.PAGE_ID}/media`,
            {
                media_type: 'REELS',
                upload_type: "resumable",
                video_url: videoUrl,
                caption: "first reel upload",
                access_token: process.env.ACCESS_TOKEN
            },
        );
        console.log(response.data)
        const response2 = await axios.post(`https://graph.facebook.com/v20.0/${process.env.PAGE_ID}/media_publish`,{
            creation_id: response.data.id,
          },{
            headers: {
                Authorization: `OAuth ${process.env.ACCESS_TOKEN}`,
                file_url: videoUrl,
            }
        })
        const response4= await axios.get(`https://graph.facebook.com/v20.0/${process.env.PAGE_ID}?fields=status_code`);
        console.log(response4.data)
        const response3 = await axios.post(`${response.data.uri}`, {
            headers: {
                Authorization: `OAuth ${process.env.ACCESS_TOKEN}`,
                file_url: videoUrl,
            }
        });

        console.log(response2.data);
    } catch (error: any) {
        console.error('Error uploading reel:', error.response ? error.response.data : error.message);
    }
}