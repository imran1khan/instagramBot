import axios from 'axios';
import {
    Client, GetPageInfoRequest, GetPageInfoResponse, PostPageReelMediaRequest,
    GetPageMediaRequest, PostPagePhotoMediaRequest,
    PostPublishMediaRequest
} from 'instagram-graph-api';

export async function uploadImageToinsta(url:string) {
    if (!process.env.ACCESS_TOKEN || !process.env.PAGE_ID) {
        console.log(`ACCESS_TOKEN=${process.env.ACCESS_TOKEN} And PAGE_ID=${process.env.PAGE_ID}`)
        return;
    }
    try {
        const request: GetPageInfoRequest = new GetPageInfoRequest(process.env.ACCESS_TOKEN, process.env.PAGE_ID);

        // request.execute().then((response: GetPageInfoResponse) => {
        //     console.log(`The page ${response.getName()} has ${response.getFollowers()} followers.`);
        // });
        const request2 = new PostPageReelMediaRequest(process.env.ACCESS_TOKEN, process.env.PAGE_ID,url, 'new post 001');
        request2.execute().then(async (response) => {
            if (!process.env.ACCESS_TOKEN || !process.env.PAGE_ID) {
                console.log('error here 001')
                return
            }
            const req3 = new PostPublishMediaRequest(process.env.ACCESS_TOKEN,process.env.PAGE_ID,response.getId());
            req3.execute().then((res)=>console.log(res)).catch((e:any)=>console.log(e))
        });
    } catch (error: any) {
        console.log(error)
    }
}
