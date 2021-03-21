function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  // buildCharts(newSample);
}
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: "+result.id);
    PANEL.append("h6").text("ETHNICITY: "+result.ethnicity);
    PANEL.append("h6").text("GENDER: "+result.gender);
    PANEL.append("h6").text("AGE: "+result.age);
    PANEL.append("h6").text("LOCATION: "+result.location);
    PANEL.append("h6").text("BBTYPE: "+result.bbtype);
    PANEL.append("h6").text("WFREQ: "+result.wfreq);
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    // var chartID = sampleArray.filter(function(ID){
    //   return buildCharts(sampleArray) == ID;
    // });
    var samples = metadata.filter(ID => buildCharts(samples) == ID);
    //  5. Create a variable that holds the first sample in the array.
    var firstID = samples[0]

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuID = samples.otu_ids
    var otuLabels = samples.otu_labels
    var sampleValues = samples.sample_values

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yvalues = otuID;
        yvalues.sort();
        yvalues.reverse();

    var yticks = yvalues.slice(0,9);

    // 8. Create the trace for the bar chart. 
    var trace = [{
      x: sampleValues,
      y: otuID,
      text: otuLabels,
      type: 'bar'
    }
      
    ];
    var barData = trace
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {ticks: yticks
      },
      };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newplot("bar", barData, barLayout)
  });
}
