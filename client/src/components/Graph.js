import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { default as api } from '../store/apiSlice';
import { chartData, getTotal } from '../utilities/UtilityFunctions';

Chart.register(ArcElement);
function Graph() {
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    let graphData;
    let labelsData;
    if (isFetching) {
        graphData = <div>Fetching...</div>;
        labelsData = <div>Fetching...</div>;
    } else if (isSuccess) {
        graphData = <Doughnut {...chartData(data)}></Doughnut>;
        labelsData = <Labels data={data}></Labels>;
    } else if (isError) {
        graphData = <div>Error!</div>;
        labelsData = <div>Error!</div>;
    }
    return (
        <div className='flex justify-content max-w-xs mx-auto'>
            <div className='item'>
                <div className='chart relative'>
                    {graphData}
                    <h3 className='mb-4 font-bold title'>
                        Total
                        <span className='block text-3xl text-emerald-400'>
                            ₹{getTotal(data) ?? 0}
                        </span>
                    </h3>
                </div>

                <div className='flex flex-col py-10 gap-4'>{labelsData}</div>
            </div>
        </div>
    );
}

export default Graph;
