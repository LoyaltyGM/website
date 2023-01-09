// import { errors } from "ethers";
import toast from "react-hot-toast";
import { IErrorHandlerOptions } from "interfaces";


export const handleContractError = (error, option?: IErrorHandlerOptions) => {
    let message: string;
    // if (error.code === errors.ACTION_REJECTED) {
    //     message = "User reject transaction";
    // } else if (error.code === errors.INSUFFICIENT_FUNDS) {
    //     message = "Insufficient funds";
    // } else if (error.error) {
    //     message = error.error?.message?.includes("reverted")
    //         ? error.error.message
    //         : error.error.data?.message?.includes("reverted")
    //         ? error.error.data.message
    //         : "Execution reverted";
    // } else {
    //     message = "Something went wrong";
    // }
    option?.dialog?.hide();
    !option?.hideToast && toast.error(message);
    console.error(error);
    return;
};
