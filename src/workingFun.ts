
import axios from 'axios';

const GRAPH_API_VERSION = 'v20.0';

const uploadReelsToContainer = async (
    accessToken: string,
    instagramAccountId: string,
    caption: string,
    videoUrl: string,
    coverUrl?: string
) => {
    const response = await axios.post(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${instagramAccountId}/media`,
        {
            access_token: accessToken,
            caption,
            media_type: 'REELS',
            video_url: videoUrl,
            cover_url: coverUrl,
        }
    );
    return response.data;
};
const getStatusOfUpload = async (accessToken: string, igContainerId: string) => {
    const response = await axios.get(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${igContainerId}`,
        { params: { access_token: accessToken, fields: 'status_code' } }
    );

    return response.data.status_code;
};
const publishMediaContainer = async (accessToken: string, instagramAccountId: string, creationId: string) => {
    const response = await axios.post(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${instagramAccountId}/media_publish`,
        { access_token: accessToken, creation_id: creationId }
    );

    return response.data;
};
const fetchPermalink = async (accessToken: string, mediaId: string) => {
    const response = await axios.get(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${mediaId}`,
        { params: { access_token: accessToken, fields: 'permalink' } }
    );

    return response.data;
};

const postInstagramReel = async (
    accessToken: string,
    pageId: string,
    description: string,
    Videourl:string
) => {
    const { id: containerId } = await uploadReelsToContainer(
        accessToken,
        pageId,
        description,
        Videourl,
    );

    let status = null;
    const TWO_MINUTES = 2 * 60 * 1000;
    const startTime = Date.now();

    while (status !== 'FINISHED') {
        if (Date.now() - startTime > TWO_MINUTES) {
            throw new Error('Upload took longer than 2 minutes.');
        }

        status = await getStatusOfUpload(accessToken, containerId);
        console.log(status);
        await new Promise((r) => setTimeout(r, 1000));
    }

    const { id: creationId } = await publishMediaContainer(accessToken, pageId, containerId);

    const { permalink } = await fetchPermalink(accessToken, creationId);


    return { creationId, permalink };
};
if(process.env.ACCESS_TOKEN && process.env.PAGE_ID){
    postInstagramReel(process.env.ACCESS_TOKEN,process.env.PAGE_ID,"first reel upload",'https://songoku.publit.io/file/f1/Meri-Ammi-Namaz-Nai-Padhti-Muslim-Bhen-Ka-Sawal.mp4').then((res)=>console.log(res));
}