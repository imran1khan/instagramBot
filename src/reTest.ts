import { uploadImageToinsta } from "./newApi";
import { uploadReel } from "./uploadReel";

// uploadImageToinsta().then(()=>console.log('compleated'));
const VideoUrl = `https://songoku.publit.io/file/f1/Meri-Ammi-Namaz-Nai-Padhti-Muslim-Bhen-Ka-Sawal.mp4`;
// uploadReel(VideoUrl)
uploadImageToinsta(VideoUrl);