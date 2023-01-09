export const MockupTextCard = ({ label, text }) => {
    return (
        <div className="text-center my-32">
            <div className="font-semibold">{label}</div>
            <div className="text-base-content/50">{text}</div>
        </div>
    );
};
