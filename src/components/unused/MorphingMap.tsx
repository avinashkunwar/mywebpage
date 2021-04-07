import React, { Component } from 'react';
import 'core-js';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { vw } from '../../@utils/useScrollPosition';
// import { info } from '../../assets/data/info';
// import PIN_ICON from '../../assets/images/map/pin-icon.svg'
// import * as geodata from '@amcharts/amcharts4-geodata';

am4core.useTheme(am4themes_animated);

interface WorldMapProps {
  enter: boolean;
}

interface DataMapState {
  map: am4maps.MapChart;
}

class MorphingMap extends Component<{}, DataMapState> {
  componentDidMount() {
    am4core.addLicense("CH224389178")
    am4core.addLicense("MP224380308");

    let countryCodes = ["TH", "ID", "AU", "CN", "TW", "JP", "KR", "IT", "JO", "AE", "US"];

    let chart = am4core.create("chartdiv", am4maps.MapChart);


    try {
      chart.geodata = am4geodata_worldHigh;
    }
    catch (e) {
      chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }

    chart.projection = new am4maps.projections.Mercator();
    chart.padding(10, 20, 10, 20);
    chart.minZoomLevel = 0.9;
    chart.zoomLevel = 0.9;
    chart.maxZoomLevel = 1;

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.include = ["TH"];


    let chart1 = am4core.create("hiddenchartdiv", am4maps.MapChart);
    chart1.padding(10, 20, 10, 20);
    chart1.geodata = am4geodata_worldHigh;
    chart1.projection = new am4maps.projections.Mercator();

    let polygonSeries1 = chart1.series.push(new am4maps.MapPolygonSeries());
    polygonSeries1.useGeodata = true;
    polygonSeries1.include = ["TH"];


    let label = chart.chartContainer.createChild(am4core.Label);
    label.x = 100;
    label.y = 100;
    label.fill = am4core.color("#CCCCCC");
    label.fontSize = 35;
    label.fontWeight = "bold";
    label.text = "Thailand";
    label.fillOpacity = 0.2;

    let slider = chart.createChild(am4core.Slider);
    slider.padding(0, 15, 0, 60);
    slider.background.padding(0, 15, 0, 60);
    slider.marginBottom = 15;
    slider.valign = "bottom";

    let currentIndex = -1;
    // let colorset = new am4core.ColorSet();

    setInterval(function () {
      let next = slider.start + 1 / countryCodes.length;
      if (next >= 1) {
        next = 0;
      }
      slider.animate({ property: "start", to: next }, 300);
    }, 2000)

    slider.events.on("rangechanged", function () {
      changeCountry();
    })

    function changeCountry() {
      let totalCountries = countryCodes.length - 1;
      let countryIndex = Math.round(totalCountries * slider.start);

      let morphToPolygon: any;

      if (currentIndex !== countryIndex) {
        polygonSeries1.data = [];
        polygonSeries1.include = [countryCodes[countryIndex]];

        currentIndex = countryIndex;

        polygonSeries1.events.once("validated", function () {

          morphToPolygon = polygonSeries1.mapPolygons.getIndex(0);
          if (morphToPolygon) {
            let countryPolygon: any = polygonSeries.mapPolygons.getIndex(0);

            let morpher = countryPolygon.polygon.morpher;
            morpher.morphToPolygon(morphToPolygon.polygon.points);

            // countryPolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);

            let animation = label.animate({ property: "y", to: 1000 }, 300);

            animation.events.once("animationended", function () {
              label.text = morphToPolygon.dataItem.dataContext["name"];
              label.y = -50;
              label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
            })
          }
        })
      }
    }

    chart.chartContainer.wheelable = false;

    this.setState({
      map: chart
    })
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.dispose();
    }
  }

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div id='chartdiv' style={{ width: '100%', maxWidth: '100%', height: vw < 1200 ? '25vh' : '50vh' }}></div>
        <div id='hiddenchartdiv' style={{
          width: '100%',
          maxWidth: '100%',
          height: vw < 1200 ? '25vh' : '50vh',
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}></div>
      </div>
    );
  }
}

export default MorphingMap;