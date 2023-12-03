let BASE_URL;
//switches out the base url if NODE_ENV === production
if(import.meta.env.PROD) {
    BASE_URL = "https://change--cute-marigold-60670b.netlify.app/"
} else {
    BASE_URL = "http://localhost:8888"
}


export { BASE_URL }