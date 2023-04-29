import React from "react";

const obj = [
    {
        type: "Savings",
        color: "#f9c74f",
        percent: 45,
    },
    {
        type: "Investment",
        color: "#f9c74f",
        percent: 25,
    },
    {
        type: "Expense",
        color: "#f9c74f",
        percent: 30,
    },
];

function Labels() {
    return (
        <>
            {obj.map((v, i) => (
                <LabelComponent key={i} data={v} />
            ))}
        </>
    );
}

function LabelComponent({ data }) {
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div
                    className="w-2 h-2 rounded py-3"
                    style={{ backgroundColor: data.color ?? "#f9c74f" }}
                ></div>
                <h3 className="text-md">{data.type ?? ""}</h3>
            </div>
            <div className="font-bold">{data.percent ?? 0}%</div>
        </div>
    );
}

export default Labels;
