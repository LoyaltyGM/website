import { FileUploader } from "react-drag-drop-files";
import ASSETS from "assets/image/index";
import Image from "next/image";
import { IDragAndDropProps } from "interfaces/formInterfaces";
import { useState } from "react";
import classNames from "classnames";

const fileTypes = ["JPEG", "PNG", "JPG"];

export const DragAndDropImage = ({
    label,
    name,
    className,
    multipleFiles = false,
    hoverTitle = "Drag and drop file here",
    handleChange,
    height,
    ...props
}: IDragAndDropProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string | undefined>();
    const [preview, setPreview] = useState("");

    const onTypeError = (err = 1) => {
        setErrorMessages(err.toString());
        setError(true);
    };
    const onSizeError = (err = 1) => {
        setErrorMessages(err.toString());
        setError(true);
    };
    const localHandleChange = (file: File) => {
        setFile(file);
        setError(false);
        setPreview(() => URL.createObjectURL(file));
    };
    return (
        <div className={classNames(className, "h-full w-full")}>
            <label className="label">
                <span className="input-label">{label}</span>
            </label>
            <FileUploader
                hoverTitle={hoverTitle}
                multiple={multipleFiles}
                handleChange={(file: File) => {
                    localHandleChange(file);
                    handleChange(file);
                }}
                name={name}
                disabled={false}
                maxSize={1}
                types={fileTypes}
                onSizeError={onSizeError}
                onTypeError={onTypeError}
                {...props}
            >
                <div
                    className={classNames(
                        "flex flex-col max-h-80 text-center border-dashed rounded-md border-2 justify-center border-base-200 hover:border-primary focus:text-base-content",
                        height
                    )}
                >
                    {error ? (
                        <p className="text-error mt-1">Error: {errorMessages}</p>
                    ) : (
                        <>
                            {file ? (
                                <div className={"flex flex-col h-full w-full p-3"}>
                                    <div className={"w-full h-full overflow-hidden relative"}>
                                        <Image src={preview} layout={"fill"} />
                                    </div>
                                    <div>
                                        <p className="text-primary mt-1">File is accepted ✅</p>
                                        <p className={"truncate"}>File name: {file?.name}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={"flex flex-col"}>
                                    <div>
                                        <Image src={ASSETS.imageIcon} width={"50"} height={"50"} />
                                    </div>
                                    <p className="text-base-content/50 mt-6 text-sm px-4">
                                        PNG, JPEG and JPG accept. Max 1mb.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </FileUploader>
        </div>
    );
};
