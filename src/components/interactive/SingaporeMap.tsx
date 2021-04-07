import React, { Component } from 'react';
import 'core-js';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_singaporeHigh from '@amcharts/amcharts4-geodata/singaporeHigh';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { tooltipString } from '../../assets/data/mapTooltip';
import SINGAPORE_PIN from '../../assets/images/map/singapore-pin.svg'
import { vw } from '../../@utils/useScrollPosition';
// import * as geodata from '@amcharts/amcharts4-geodata';

am4core.useTheme(am4themes_animated);

interface SingaporeMapProps {
  enter: boolean;
}

interface SingaporeMapState {
  map: am4maps.MapChart;
  markerRendered: boolean;
}

class SingaporeMap extends Component<SingaporeMapProps, SingaporeMapState> {
  componentDidMount() {
    am4core.addLicense("CH224389178")
    am4core.addLicense("MP224380308");

    var map = am4core.create('mapSG', am4maps.MapChart);
    map.geodata = am4geodata_singaporeHigh;
    map.projection = new am4maps.projections.Miller();
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    polygonSeries.data = [{
      "id": "SG-01",
      "name": "Central Singapore",
    }, {
      "id": "SG-02",
      "name": "North East",
    }, {
      "id": "SG-03",
      "name": "North West",
    }, {
      "id": "SG-04",
      "name": "South East",
    }, {
      "id": "SG-05",
      "name": "South West",
    }];

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#CCCCCC");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#12CBD6");
    polygonSeries.mapPolygons.template.events.on('hit', function (ev) {
      map.zoomToMapObject(ev.target);
    });

    map.showOnInit = true;
    map.defaultState.transitionEasing = am4core.ease.elasticOut;
    map.defaultState.transitionDuration = 2000;
    map.hiddenState.properties.dy = vw < 1200 ? 200 : 300;
    map.tooltipPosition = 'pointer';
    map.hidden = true;

    map.chartContainer.wheelable = false;

    this.setState({
      map: map
    })
  }

  componentDidUpdate(prevProps: SingaporeMapProps) {
    const animateBullet = (marker: any) => {
      let animation = marker.animate([{ property: "y", from: -10, to: 10 }], 1000, am4core.ease.circleIn);
      animation.events.on("animationended", function (event: any) {
        let nextAnimation = marker.animate([{ property: "y", from: 10, to: -10 }], 1000, am4core.ease.circleOut);
        nextAnimation.events.on("animationended", function (event: any) {
          animateBullet(event.target.object);
        })
      })
    }

    if (this.props.enter !== prevProps.enter && this.props.enter && !this.state.markerRendered) {
      this.state.map.show()
      let imageSeries = this.state.map.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipHTML = tooltipString;
      let marker = imageSeries.mapImages.template.createChild(am4core.Image);
      marker.href = SINGAPORE_PIN;
      marker.width = 50;
      marker.height = 50;
      marker.nonScaling = true;
      marker.tooltipText = "{title}";
      marker.horizontalCenter = "middle";
      marker.verticalCenter = "bottom";

      marker.showOnInit = true;
      marker.defaultState.transitionEasing = am4core.ease.bounceOut;
      marker.defaultState.transitionDuration = 2500;
      marker.hiddenState.properties.dy = -300;
      marker.tooltipPosition = 'pointer';

      marker.events.on("inited", function (event) {
        animateBullet(event.target);
      })

      imageSeries.data = [{ longitude: 103.8536, latitude: 1.2789 }];

      this.setState({
        markerRendered: true
      })
    } else if (this.props.enter !== prevProps.enter && !this.props.enter) {
      this.state.map.hide();
      this.state.map.series.removeIndex(1).dispose();

      this.setState({
        markerRendered: false
      })
    }
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.dispose();
    }
  }

  render() {
    return (
      <div id='mapSG' style={{ width: '100%', height: vw < 1200 ? '35vh' : '60vh' }}></div>
    );
  }
}

export default SingaporeMap;