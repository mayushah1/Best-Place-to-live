    /*--------------------------------------------------------------------------
                                                                                                                                                        Public vs private school
                                                                                                                                                        */
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

    // parse data from all data sets 

    // parse consolidated date
    var xBar2 = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        xBar2.push(data["School District"]);
    });

    var lessThanHS = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        lessThanHS.push(data["Less than high school graduate"]);
    });

    var highSchool = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        highSchool.push(data["High school graduate (includes equivalency)"]);
    });

    var someCollege = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        someCollege.push(data["Some college or associate's degree"]);
    });

    var bachelors = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        bachelors.push(data["Bachelor's degree"]);
    });

    var graduateDegree = [];
    medianIncomeBySchoolDistrictAndEducation.forEach(function (data) {
        graduateDegree.push(data["Graduate or professional degree"]);
    });

    // create traces with all created arrays
    // consolidated data
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

    // women data

    // parse female income
    var xBar3 = [];
    womenIncome.forEach(function (data) {
        xBar3.push(data["School District"]);
    });

    var womenLessThanHS = [];
    womenIncome.forEach(function (data) {
        womenLessThanHS.push(data["Less than high school graduate"]);
    });

    var womenHS = [];
    womenIncome.forEach(function (data) {
        womenHS.push(data["High school graduate (includes equivalency)"]);
    });

    var womenSomeCollege = [];
    womenIncome.forEach(function (data) {
        womenSomeCollege.push(data["Some college or associate's degree"]);
    });

    var womenBachelors = [];
    womenIncome.forEach(function (data) {
        womenBachelors.push(data["Bachelor's degree"]);
    });

    var womenGraduateDegree = [];
    womenIncome.forEach(function (data) {
        womenGraduateDegree.push(data["Graduate or professional degree"]);
    });
    var womenLessThanHSTrace = {
        x: xBar3,
        y: womenLessThanHS,
        type: 'bar',
        name: 'Less than High School',
        marker: {
            color: 'rgb(31, 72, 100)',
            opacity: 0.75
        }
    };

    var womenHighSchoolTrace = {
        x: xBar3,
        y: womenHS,
        name: 'High School (or Equivalency)',
        type: 'bar',
        marker: {
            color: 'rgb(215, 226, 233)',
            opacity: 0.75
        }
    };

    var womenSomeCollegeTrace = {
        x: xBar3,
        y: womenSomeCollege,
        name: 'Some College (or Associate\'s)',
        type: 'bar',
        marker: {
            color: 'rgb(255, 203, 53)',
            opacity: 0.75
        }
    };

    var womenBachelorsTrace = {
        x: xBar3,
        y: womenBachelors,
        name: 'Bachelor\'s Degree',
        type: 'bar',
        marker: {
            color: 'rgb(233, 92, 64)',
            opacity: 0.75
        }
    };

    var womenGraduateTrace = {
        x: xBar3,
        y: womenGraduateDegree,
        name: 'Graduate Degree',
        type: 'bar',
        marker: {
            color: 'rgb(80, 2, 27)',
            opacity: 0.75
        }
    };


    // men data

    // parse male income
    var xBar4 = [];
    maleIncome.forEach(function (data) {
        xBar4.push(data["School District"]);
    });

    var menLessThanHS = [];
    maleIncome.forEach(function (data) {
        menLessThanHS.push(data["Less than high school graduate"]);
    });

    var menHS = [];
    maleIncome.forEach(function (data) {
        menHS.push(data["High school graduate (includes equivalency)"]);
    });

    var menSomeCollege = [];
    maleIncome.forEach(function (data) {
        menSomeCollege.push(data["Some college or associate's degree"]);
    });

    var menBachelors = [];
    maleIncome.forEach(function (data) {
        menBachelors.push(data["Bachelor's degree"]);
    });

    var menGraduateDegree = [];
    maleIncome.forEach(function (data) {
        menGraduateDegree.push(data["Graduate or professional degree"]);
    });

    var menLessThanHSTrace = {
        x: xBar4,
        y: menLessThanHS,
        type: 'bar',
        name: 'Less than High School',
        marker: {
            color: 'rgb(31, 72, 100)',
            opacity: 0.75
        }
    };

    var menHSTrace = {
        x: xBar4,
        y: menHS,
        name: 'High School (or Equivalency)',
        type: 'bar',
        marker: {
            color: 'rgb(215, 226, 233)',
            opacity: 0.75
        }
    };

    var menSomeCollegeTrace = {
        x: xBar4,
        y: menSomeCollege,
        name: 'Some College (or Associate\'s)',
        type: 'bar',
        marker: {
            color: 'rgb(255, 203, 53)',
            opacity: 0.75
        }
    };

    var menBachelorsTrace = {
        x: xBar4,
        y: menBachelors,
        name: 'Bachelor\'s Degree',
        type: 'bar',
        marker: {
            color: 'rgb(233, 92, 64)',
            opacity: 0.75
        }
    };

    var menGraduateTrace = {
        x: xBar4,
        y: menGraduateDegree,
        name: 'Graduate Degree',
        type: 'bar',
        marker: {
            color: 'rgb(80, 2, 27)',
            opacity: 0.75
        }
    };

    // create layout
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


    // set up arrays with all necessary data
    var consolidatedData = [dataLessThan, dataHighSchool, dataSomeCollege, dataBachelors, dataGraduate];
    var womenData = [womenLessThanHSTrace, womenHighSchoolTrace, womenSomeCollegeTrace, womenBachelorsTrace, womenGraduateTrace];
    var menData = [menLessThanHSTrace, menHSTrace, menSomeCollegeTrace, menBachelorsTrace, menGraduateTrace];

    //plot shit and set up switching functionality
    Plotly.plot('incomeByEdu', consolidatedData, layout3);


    function updatePlotly(newdata) {
        Plotly.purge("incomeByEdu");
        Plotly.plot("incomeByEdu", newdata, layout3);
    };

    function getData(dataset) {
        var data;
        switch (dataset) {
            case "men":
                data = menData;
                break;
            case "women":
                data = womenData;
                break;
            case "all":
                data = consolidatedData;
                break;
        }
        updatePlotly(data);
    };
