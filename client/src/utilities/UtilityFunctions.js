import _ from 'lodash';

export function getSum(transaction, type) {
    let sum = _(transaction)
        .groupBy('type')
        .map((objs, key) => {
            if (!type) return _.sumBy(objs, 'amount'); //[1,23,4]
            return {
                type: key,
                color: objs[0].color,
                total: _.sumBy(objs, 'amount'),
            };
        })
        .value();
    return sum;
}

export function getLabels(transaction) {
    let amountSum = getSum(transaction, 'type');
    let total = _.sum(getSum(transaction));

    let percent = _(amountSum)
        .map((objs) => _.assign(objs, { percent: (100 * objs.total) / total }))
        .value();
    return percent;
}

export function chartData(transaction, custom) {
    let dataValue = getSum(transaction);
    let bg = _.map(transaction, (a) => a.color);
    bg = _.uniq(bg);
    const config = {
        data: {
            datasets: [
                {
                    data: dataValue,
                    backgroundColor: bg,
                    hoverOffset: 4,
                    borderRadius: 30,
                    spacing: 5,
                },
            ],
        },
        options: {
            cutout: 115,
        },
    };

    return custom ?? config;
}

export function getTotal(transaction) {
    let sum = _.sum(getSum(transaction));
    return formatAmount(sum);
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0,
});

export function formatAmount(amount) {
    return INTEGER_FORMATTER.format(amount);
}
