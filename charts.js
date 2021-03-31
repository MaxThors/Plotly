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
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
  })}
  
init();


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


// 1. Create the buildCharts function.
function buildCharts(sample_id) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let sample = samples.filter(_ => _.id == sample_id)[0];
    console.log(sample);
    //  5. Create a variable that holds the first sample in the array.
    var otuID = sample.otu_ids
    var otuLabels = sample.otu_labels
    var sampleValues = sample.sample_values
    console.log(otuID);
    var yticks = otuID.slice(0,10).map(otuID => `otu${otuID}`).reverse();
    // 8. Create the trace for the bar chart. 
    var trace = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];
    var barData = trace
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {ticks: yticks},
      };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)
    
    // 1. Create the trace for the bubble chart.
    var trace2 = [{
      x: otuID,
      y:sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuID,
        size: sampleValues
      }
    }];
    var bubbleData = trace2;  

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {
        title: "OTU ID"
      },
      hovermode: 'closest',
      paper_bgcolor: 'bisque'        
    };

    // 3. Use Plotly to plot the data with the layout.    
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata
    let gaugeSample = metadata.filter(_ => _.id == sample_id)[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    gaugeID = otuID;
    gaugeLabel = otuLabels;
    gaugeValue = sampleValues;

    // 3. Create a variable that holds the washing frequency.
    gaugeFreq = gaugeSample.wfreq.toFixed(0);

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        value: gaugeFreq,
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
          axis: {range: [0, 10]},
          bar: {color: 'black'},
          steps: [
            {range: [0, 2], color: 'red'},
            {range: [2, 4], color: 'orange'},
            {range: [4, 6], color: 'yellow'},
            {range: [6, 8], color: 'yellowgreen'},
            {range: [8, 10], color: 'green'}
          ],
          threshold: {
            line: {color: 'black', width: 1},
            thickness: 0.4
          }
          
        }
    }
     ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 400,
      title: {text: 'Belly Button Washing Frequency', font: {size: 24}},
      paper_bgcolor: 'bisque'  
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout)
  });
}
