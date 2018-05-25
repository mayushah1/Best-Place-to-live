    /*--------------------------------------------------------------------------
                                                                                                                                 +++ Create public vs private school graph
                                                                                                                            -------------------------------------------------------------------------*/

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

    var xText = [];
    perPrivPub.forEach(function (data) {
        let num = Math.round(data['Total Enrolled'] * (data['Percent Public School'] / 100));
        let result = num.toString() + ' Students'
        xText.push(result);
    });

    var yText = [];
    perPrivPub.forEach(function (data) {
        let num = Math.round(data['Total Enrolled'] * (data['Percent Private School'] / 100));
        let result = num.toString() + ' Students'
        yText.push(result);
    });

    //Set up bars
    var trace1 = {
        x: xBar,
        y: yBar,
        name: '% Public',
        text: xText,
        type: 'bar',
        marker: {
            color: 'rgb(31, 72, 100)',
            opacity: 0.75
        }
    };

    var trace2 = {
        x: xBar,
        y: yBarTwo,
        name: '% Private',
        text: yText,
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
        legend: {
            x: 0,
            y: 1.2,
        },
        xaxis: {
            tickangle: -30
        },
        barmode: 'stack'
    };

    //plot shit
    Plotly.newPlot('plotPerPrivPub', allData, layout);



    /*--------------------------------------------------------------------------
        +++ Create total enrollment graph
        --------------------------------------------------------------------------*/
    var yBarThree = [];
    perPrivPub.forEach(function (data) {
        yBarThree.push(data["Total Enrolled"]);
    });

    var data2 = {
        x: xBar,
        y: yBarThree,
        type: 'bar',
        marker: {
            color: 'rgb(255, 203, 53)',
            opacity: 0.75
        }
    };

    var layout2 = {
        title: 'Total Students Enrolled by School District',
        xaxis: {
            tickangle: -30
        }
    };

    //plot shit
    Plotly.newPlot('totalEnrolled', [data2], layout2);


    /*--------------------------------------------------------------------------
         +++ Create median income by school district and education level
    -------------------------------------------------------------------------*/

    var xBar2 = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        xBar2.push(date["School District"]);
    });

    var lessThanHS = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        lessThanHS.push(date["Less than high school graduate"]);
    });

    var highSchool = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        highSchool.push(date["High school graduate (includes equivalency)"]);
    });

    var someCollege = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        someCollege.push(date["Some college or associate's degree"]);
    });

    var bachelors = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        bachelors.push(date["Bachelor's degree"]);
    });

    var graduateDegree = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (date) {
        graduateDegree.push(date["Graduate or professional degree"]);
    });


    var dataLessThan = {
        x: xBar2,
        y: lessThanHS,
        type: 'bar',
        name: 'Less than High School',
        marker: {
            color: 'rgb(31, 72, 100)',
            opacity: 0.75
        }
    };

    var dataHighSchool = {
        x: xBar2,
        y: highSchool,
        name: 'High School (or Equivalency)',
        type: 'bar',
        marker: {
            color: 'rgb(215, 226, 233)',
            opacity: 0.75
        }
    };

    var dataSomeCollege = {
        x: xBar2,
        y: someCollege,
        name: 'Some College (or Associate\'s)',
        type: 'bar',
        marker: {
            color: 'rgb(255, 203, 53)',
            opacity: 0.75
        }
    };

    var dataBachelors = {
        x: xBar2,
        y: bachelors,
        name: 'Bachelor\'s Degree',
        type: 'bar',
        marker: {
            color: 'rgb(233, 92, 64)',
            opacity: 0.75
        }
    };

    var dataGraduate = {
        x: xBar2,
        y: graduateDegree,
        name: 'Graduate Degree',
        type: 'bar',
        marker: {
            color: 'rgb(80, 2, 27)',
            opacity: 0.75
        }
    };

    var layout3 = {
        title: 'Median Income by Education Level & School District',
        xaxis: {
            tickangle: -30
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1.1,
            orientation: 'h'
        },
        barmode: 'stack'
    };

    var data3 = [dataLessThan, dataHighSchool, dataSomeCollege, dataBachelors, dataGraduate];
    console.log(data3);

    //plot shit
    Plotly.newPlot('incomeByEdu', data3, layout3);
