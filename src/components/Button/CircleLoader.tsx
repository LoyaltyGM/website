import React from "react";
import { motion, Transition } from "framer-motion";

const circleStyle: Object = {
    display: "block",
    width: "2.0rem",
    height: "2.0rem",
    border: "0.4rem solid #e9e9e9",
    borderTop: "0.4rem solid #C527D8",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
};

const spinTransition: Transition = {
    repeatType: "loop",
    repeat: Infinity,
    ease: "linear",
    duration: 1,
};

export default function CircleLoader() {
    return (
        <div className="relative w-[2.0rem] h-[2.0rem] box-border">
            <motion.span style={circleStyle} animate={{ rotate: 360 }} transition={spinTransition} />
        </div>
    );
}
