var perPrivPub = 'data/perPrivPub'

//School districts
var trace1 = {
    x: perPrivPub.schoolDistrict,
    y: perPrivPub['Percent Public'],
    type: 'bar',
};

Plotly.newPlot('plotPerPrivPub', trace1);
