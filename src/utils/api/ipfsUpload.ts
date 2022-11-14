import { handleContractError, INFURA_IPFS_GATEWAY, IPFS, ipfsClient } from "utils";

export const getIpfsImage = (path: string, mockImage: string) => {
    const fullPath = INFURA_IPFS_GATEWAY + path?.replace(IPFS, "");
    return imageExists(fullPath) ? fullPath : mockImage;
};

export const storeNFT = async (image: File) => {
    try {
        const result = await ipfsClient.add(image);
        return ipfsFullPath(result.path);
    } catch (error) {
        handleContractError(error);
    }
};

const ipfsFullPath = (path: string) => IPFS + `${path}`;

const imageExists = (imageUrl: string) => {
    let http = new XMLHttpRequest();
    http.open("HEAD", imageUrl, false);
    http.send();
    return http.status != 404 && http.status != 400;
};
