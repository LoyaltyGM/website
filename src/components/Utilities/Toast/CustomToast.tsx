import toast, { ToastBar, Toaster } from "react-hot-toast";
import React from "react";

export const CustomToast = () => {
    return (
        <Toaster>
            {(t) => (
                <ToastBar
                    toast={t}
                    style={{
                        padding: 0,
                        margin: 0,
                    }}
                >
                    {({ icon, message }) => (
                        <button
                            className={"bg-primary/25 p-2 rounded-lg  flex items-center"}
                            onClick={() => toast.dismiss(t.id)}
                        >
                            {icon}
                            {message}
                        </button>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};
