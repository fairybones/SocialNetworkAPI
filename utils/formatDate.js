function formatDate(createdAt) {
    let date = new Date(createdAt);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    // return Day-Month(abbr)-Year
    return day + '-' + month + '-' + year;
};

module.exports = formatDate;