import React, { useState, useCallback } from "react";
import Layout, {
    SubmitButton,
    DragAndDropImageForm,
    InputSupplyForm,
    InputTextForm,
    InputTextAreaForm,
} from "components";
import { NextPage } from "next";
import { JsonRpcProvider, Network } from "@mysten/sui.js";
import { ICreateCompany } from "interfaces";
import { handleChangeBasic, handleContractError, handleImageChange, handleTextChange, validateForm } from "utils";
import { storeNFT } from "services";
import { useDialogState } from "ariakit";
import { ethos } from "ethos-connect";
import { useCounter } from "usehooks-ts";
import ASSETS from "assets/image";
import Sidebar from "components/Layout/Main/Sidebar";

const Loyalty: NextPage = () => {
    const [formData, setFormData] = useState<ICreateCompany>({
        name: "",
        description: "",
        logo: {},
    });

    // connect to local RPC server
    const provider = new JsonRpcProvider(Network.DEVNET);
    const { wallet } = ethos.useWallet();

    const confirmDialog = useDialogState();
    const { count: activeStep, increment: incrementActiveStep, reset: resetActiveStep } = useCounter(0);

    const createCompany = useCallback(
        async (name: String, desciprtion: String, urlLink: String) => {
            if (!wallet) return;

            try {
                //TODO: Send to server info about company
                return "";
            } catch (error) {
                console.log(error);
            }
        },
        [wallet]
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validateForm(formData, ["ipfsAddress", "contractAddress"])) {
            return;
        }

        resetActiveStep();

        // SHOW DIALOG
        confirmDialog.toggle();

        try {
            const path = await storeNFT(formData.logo as File);
            console.log("path " + path);
            handleChangeBasic(path, setFormData, "ipfsAddress");
            console.log(formData.name, formData.description, path);
            incrementActiveStep();
            const objectID = await createCompany(formData.name, formData.description, path);
            console.log("OBJECT ID", objectID);
            incrementActiveStep();

            const tx = await provider.getObject(String(objectID));
            //setCollectionName(tx.details!.data.fields.name);
            incrementActiveStep();
        } catch (error) {
            handleContractError(error, { dialog: confirmDialog });
            resetActiveStep();
        }
    }

    return (
        <div>
            <Sidebar>
                <section className="relative w-full">
                    <form className="mx-auto flex max-w-4xl flex-col gap-4" onSubmit={onSubmit}>
                        <h1 className="text-highlighter">Create Project Page</h1>
                        <div className={"grid grid-cols-2"}>
                            <div className={"grid grid-flow-row"}>
                                <InputTextForm
                                    label="Name"
                                    name="name"
                                    className={"max-w-2xl"}
                                    placeholder="Collection Name"
                                    handleChange={(event) => handleTextChange(event, setFormData)}
                                />
                                <InputTextAreaForm
                                    label="Description"
                                    name="description"
                                    className={"max-w-2xl"}
                                    placeholder="A short description(Max. 250 characters or less)"
                                    maxLength={250}
                                    handleChange={(event) => handleTextChange(event, setFormData)}
                                />
                                <InputTextForm
                                    label="Twitter"
                                    name="name"
                                    className={"max-w-2xl"}
                                    placeholder="Collection Name"
                                    handleChange={(event) => handleTextChange(event, setFormData)}
                                />
                                <InputTextForm
                                    label="Discord"
                                    name="name"
                                    className={"max-w-2xl"}
                                    placeholder="Collection Name"
                                    handleChange={(event) => handleTextChange(event, setFormData)}
                                />
                                <InputTextForm
                                    label="Telegram"
                                    name="name"
                                    className={"max-w-2xl"}
                                    placeholder="Collection Name"
                                    handleChange={(event) => handleTextChange(event, setFormData)}
                                />
                            </div>
                            <div className={"flex"}>
                                <div className="divider divider-horizontal" />
                                <DragAndDropImageForm
                                    height={"h-full w-3/4"}
                                    label="Image"
                                    name="file"
                                    handleChange={(file) => handleImageChange(file, setFormData, "file")}
                                />
                            </div>
                        </div>
                        <SubmitButton className="mt-5 w-2/3 self-center">Create Contract</SubmitButton>
                    </form>
                </section>
                {/* <CreateNftDialog formData={formData} activeStep={activeStep} dialog={confirmDialog} /> */}
            </Sidebar>
        </div>
    );
};

export default Loyalty;
