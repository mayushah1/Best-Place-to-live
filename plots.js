    /*--------------------------------------------------------------------------
        +++ Create public vs private school graph
        --------------------------------------------------------------------------*/

    var xBar = [];
    perPrivPub.forEach(function (data) {
        xBar.push(data.schoolDistrict);
    });

    var yBar = [];
    perPrivPub.forEach(function (data) {
        yBar.push(data["Percent Public School"]);
    });

    var yBarTwo = [];
    perPrivPub.forEach(function (data) {
        yBarTwo.push(data["Percent Private School"]);
    });
    console.log(yBarTwo);


    //Set up bars
    var trace1 = {
        x: xBar,
        y: yBar,
        name: '% Public School',
        type: 'bar',
        marker: {
            color: 'rgb(31, 72, 100)',
            opacity: 0.75
        }
    };

    var trace2 = {
        x: xBar,
        y: yBarTwo,
        name: '% Private School',
        type: 'bar',
        marker: {
            color: 'rgb(233, 92, 64)',
            opacity: 0.75
        }
    };

    //set up data and layout
    var allData = [trace1, trace2];
    var layout = {
        title: 'Percent Public or Private School by School District',
        showlegend: true,
        xaxis: {
            tickangle: -30
        },
        barmode: 'stack'
    };

    //plot shit
    Plotly.newPlot('plotPerPrivPub', allData, layout);
