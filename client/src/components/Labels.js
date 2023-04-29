import React from 'react';
import { getLabels } from '../utilities/UtilityFunctions';
function Labels({ data }) {
    return (
        <>
            {getLabels(data).map((v, i) => (
                <LabelComponent key={i} data={v} />
            ))}
        </>
    );
}

function LabelComponent({ data }) {
    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div
                    className='w-2 h-2 rounded py-3'
                    style={{ backgroundColor: data.color ?? '#f9c74f' }}
                ></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <div className='font-bold'>{Math.round(data.percent) ?? 0}%</div>
        </div>
    );
}

export default Labels;
