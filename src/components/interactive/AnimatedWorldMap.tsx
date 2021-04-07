import React, { Component } from 'react';
import 'core-js';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { vw } from '../../@utils/useScrollPosition';
import { info } from '../../assets/data/info';
// import * as geodata from '@amcharts/amcharts4-geodata';

am4core.useTheme(am4themes_animated);

interface AnimatedWorldMapProps {
  enter: boolean;
  animatedMap: boolean;
}

interface AnimatedWorldMapState {
  map: am4maps.MapChart;
  start: boolean;
}

class AnimatedWorldMap extends Component<AnimatedWorldMapProps, AnimatedWorldMapState> {
  componentDidMount() {
    am4core.addLicense("CH224389178")
    am4core.addLicense("MP224380308");

    var map = am4core.create('mapWorldAnimated', am4maps.MapChart);
    map.geodata = am4geodata_worldHigh;
    map.projection = new am4maps.projections.Miller();
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ"];
    map.homeZoomLevel = 5;

    let polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.fill = am4core.color("#c4c4c4");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#12CBD6");
    polygonSeries.mapPolygons.template.events.on('hit', function (ev) {
      map.zoomToMapObject(ev.target);
    });

    map.chartContainer.wheelable = false;

    if (this.props.enter && this.props.animatedMap) {
      let imageSeries = map.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{title}";

      // Add line bullets
      let cities = map.series.push(new am4maps.MapImageSeries());
      cities.mapImages.template.nonScaling = true;

      let city = cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 6;
      city.fill = am4core.color('#65A1B9')
      city.strokeWidth = 2;
      city.stroke = am4core.color("#fff");

      city.events.on("inited", function (event) {
        animateBullet(event.target);
      })

      const animateBullet = (marker: any) => {
        let animation = marker.animate([{ property: "scale", from: 1, to: 1.5 }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function (event: any) {
          let nextAnimation = marker.animate([{ property: "scale", from: 1.5, to: 1 }], 1000, am4core.ease.circleOut);
          nextAnimation.events.on("animationended", function (event: any) {
            animateBullet(event.target.object);
          })
        })
      }

      const addCity = (coords: any, title: any) => {
        let city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
      }

      // Add lines
      let lineSeries: any = map.series.push(new am4maps.MapArcSeries());
      lineSeries.mapLines.template.line.strokeWidth = 2;
      lineSeries.mapLines.template.line.strokeOpacity = 0.5;
      lineSeries.mapLines.template.line.stroke = city.fill;
      lineSeries.mapLines.template.line.nonScalingStroke = true;
      lineSeries.mapLines.template.line.strokeDasharray = "1,1";
      lineSeries.zIndex = 10;

      const addLine = (from: any, to: any) => {
        let line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.3;

        return line;
      }

      const places = info.travel.mainPlaces

      for (let index in places) {
        if (Number(index) + 1 < places.length) {
          addLine(
            addCity({
              longitude: places[Number(index)].longitude,
              latitude: places[Number(index)].latitude,
            }, places[Number(index)].title),
            addCity({
              longitude: places[Number(index) + 1].longitude,
              latitude: places[Number(index) + 1].latitude,
            }, places[Number(index) + 1].title))
        } else {
          // For the last city, join to first city
          addLine(
            addCity({
              longitude: places[Number(index)].longitude,
              latitude: places[Number(index)].latitude,
            }, places[Number(index)].title),
            addCity({
              longitude: places[0].longitude,
              latitude: places[0].latitude,
            }, places[0].title))
        }
      }

      // Add plane
      let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
      plane.position = 0;
      plane.width = 48;
      plane.height = 48;

      plane.adapter.add("scale", function (scale: any, target: any) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
      })
      let planeImage = plane.createChild(am4core.Sprite);
      planeImage.scale = 0.05;
      planeImage.horizontalCenter = "middle";
      planeImage.verticalCenter = "middle";
      planeImage.path = "M71,515.3l-33,72.5c-0.9,2.1,0.6,4.4,2.9,4.4l19.7,0c2.8,0,5.4-1,7.5-2.9l54.1-39.9c2.4-2.2,5.4-3.4,8.6-3.4 l103.9,0c1.8,0,3,1.8,2.3,3.5l-64.5,153.7c-0.7,1.6,0.5,3.3,2.2,3.3l40.5,0c2.9,0,5.7-1.3,7.5-3.6L338.4,554c3.9-5,9.9-8,16.2-8c24.2,0,85.5-0.1,109.1-0.2c21.4-0.1,41-6.3,59-17.8c4.2-2.6,7.9-6.1,11.2-9.8c2.6-2.9,3.8-5.7,3.7-8.5c0.1-2.8-1.1-5.5-3.7-8.5c-3.3-3.7-7-7.2-11.2-9.8c-18-11.5-37.6-17.7-59-17.8c-23.6-0.1-84.9-0.2-109.1-0.2c-6.4,0-12.3-2.9-16.2-8L222.6,316.6c-1.8-2.3-4.5-3.6-7.5-3.6l-40.5,0c-1.7,0-2.9,1.7-2.2,3.3L237,470c0.7,1.7-0.5,3.5-2.3,3.5l-103.9,0c-3.2,0-6.2-1.2-8.6-3.4l-54.1-39.9c-2.1-1.9-4.7-2.9-7.5-2.9l-19.7,0c-2.3,0-3.8,2.4-2.9,4.4l33,72.5C72.6,507.7,72.6,511.8,71,515.3z";
      planeImage.fill = am4core.color('#4086A1')
      planeImage.strokeOpacity = 0;

      // Plane animation
      let currentLine = 0;
      let direction = 1;
      const flyPlane = () => {
        // Get current line to attach plane to
        plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
        plane.parent = lineSeries;

        // Set up animation
        let from, to;
        let numLines = lineSeries.mapLines.length;
        if (direction === 1) {
          from = 0
          to = 1;
          if (planeImage.rotation !== 0) {
            planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
          }
        }
        else {
          from = 1;
          to = 0;
          if (planeImage.rotation !== 180) {
            planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
          }
        }

        // Start the animation
        let animation = plane.animate({
          from: from,
          to: to,
          property: "position"
        }, 3000, am4core.ease.sinInOut);

        animation.events.on("animationprogress", (event: any) => {
          var point = plane.mapLine.positionToPoint(event.progress);
          var geoPoint = map.seriesPointToGeo(point);

          map.zoomToGeoPoint(geoPoint, map.zoomLevel, true, 0);
          map.seriesContainer.validatePosition();
        });

        animation.events.on("animationended", flyPlane)

        // Increment line, or reverse the direction
        currentLine += direction;
        if (currentLine < 0) {
          currentLine = 0;
          direction = 1;
        }
        else if ((currentLine + 1) > numLines) {
          currentLine = 0;
          // direction = -1;
        }
      }
      flyPlane();
      this.setState({
        start: true
      })
    }

    this.setState({
      map: map
    })
  }

  componentDidUpdate(prevProps: AnimatedWorldMapProps) {
    if (this.props.enter !== prevProps.enter && this.props.enter && !this.state.start) {
      let imageSeries = this.state.map.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{title}";

      // Add line bullets
      let cities = this.state.map.series.push(new am4maps.MapImageSeries());
      cities.mapImages.template.nonScaling = true;

      let city = cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 6;
      city.fill = am4core.color('#65A1B9')
      city.strokeWidth = 2;
      city.stroke = am4core.color("#fff");

      city.events.on("inited", function (event) {
        animateBullet(event.target);
      })

      const animateBullet = (marker: any) => {
        let animation = marker.animate([{ property: "scale", from: 1, to: 1.5 }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function (event: any) {
          let nextAnimation = marker.animate([{ property: "scale", from: 1.5, to: 1 }], 1000, am4core.ease.circleOut);
          nextAnimation.events.on("animationended", function (event: any) {
            animateBullet(event.target.object);
          })
        })
      }

      const addCity = (coords: any, title: any) => {
        let city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
      }

      // Add lines
      let lineSeries: any = this.state.map.series.push(new am4maps.MapArcSeries());
      lineSeries.mapLines.template.line.strokeWidth = 2;
      lineSeries.mapLines.template.line.strokeOpacity = 0.5;
      lineSeries.mapLines.template.line.stroke = city.fill;
      lineSeries.mapLines.template.line.nonScalingStroke = true;
      lineSeries.mapLines.template.line.strokeDasharray = "1,1";
      lineSeries.zIndex = 10;

      const addLine = (from: any, to: any) => {
        let line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.3;

        return line;
      }

      const places = info.travel.mainPlaces

      for (let index in places) {
        if (Number(index) + 1 < places.length) {
          addLine(
            addCity({
              longitude: places[Number(index)].longitude,
              latitude: places[Number(index)].latitude,
            }, places[Number(index)].title),
            addCity({
              longitude: places[Number(index) + 1].longitude,
              latitude: places[Number(index) + 1].latitude,
            }, places[Number(index) + 1].title))
        } else {
          // For the last city, join to first city
          addLine(
            addCity({
              longitude: places[Number(index)].longitude,
              latitude: places[Number(index)].latitude,
            }, places[Number(index)].title),
            addCity({
              longitude: places[0].longitude,
              latitude: places[0].latitude,
            }, places[0].title))
        }
      }

      // Add plane
      let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
      plane.position = 0;
      plane.width = 48;
      plane.height = 48;

      plane.adapter.add("scale", function (scale: any, target: any) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
      })
      let planeImage = plane.createChild(am4core.Sprite);
      planeImage.scale = 0.05;
      planeImage.horizontalCenter = "middle";
      planeImage.verticalCenter = "middle";
      planeImage.path = "M71,515.3l-33,72.5c-0.9,2.1,0.6,4.4,2.9,4.4l19.7,0c2.8,0,5.4-1,7.5-2.9l54.1-39.9c2.4-2.2,5.4-3.4,8.6-3.4 l103.9,0c1.8,0,3,1.8,2.3,3.5l-64.5,153.7c-0.7,1.6,0.5,3.3,2.2,3.3l40.5,0c2.9,0,5.7-1.3,7.5-3.6L338.4,554c3.9-5,9.9-8,16.2-8c24.2,0,85.5-0.1,109.1-0.2c21.4-0.1,41-6.3,59-17.8c4.2-2.6,7.9-6.1,11.2-9.8c2.6-2.9,3.8-5.7,3.7-8.5c0.1-2.8-1.1-5.5-3.7-8.5c-3.3-3.7-7-7.2-11.2-9.8c-18-11.5-37.6-17.7-59-17.8c-23.6-0.1-84.9-0.2-109.1-0.2c-6.4,0-12.3-2.9-16.2-8L222.6,316.6c-1.8-2.3-4.5-3.6-7.5-3.6l-40.5,0c-1.7,0-2.9,1.7-2.2,3.3L237,470c0.7,1.7-0.5,3.5-2.3,3.5l-103.9,0c-3.2,0-6.2-1.2-8.6-3.4l-54.1-39.9c-2.1-1.9-4.7-2.9-7.5-2.9l-19.7,0c-2.3,0-3.8,2.4-2.9,4.4l33,72.5C72.6,507.7,72.6,511.8,71,515.3z";
      planeImage.fill = am4core.color('#4086A1')
      planeImage.strokeOpacity = 0;

      // Plane animation
      let currentLine = 0;
      let direction = 1;
      const flyPlane = () => {
        // Get current line to attach plane to
        plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
        plane.parent = lineSeries;

        // Set up animation
        let from, to;
        let numLines = lineSeries.mapLines.length;
        if (direction === 1) {
          from = 0
          to = 1;
          if (planeImage.rotation !== 0) {
            planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
          }
        }
        else {
          from = 1;
          to = 0;
          if (planeImage.rotation !== 180) {
            planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
          }
        }

        // Start the animation
        let animation = plane.animate({
          from: from,
          to: to,
          property: "position"
        }, 3000, am4core.ease.sinInOut);

        animation.events.on("animationprogress", (event: any) => {
          var point = plane.mapLine.positionToPoint(event.progress);
          var geoPoint = this.state.map.seriesPointToGeo(point);

          this.state.map.zoomToGeoPoint(geoPoint, this.state.map.zoomLevel, true, 0);
          this.state.map.seriesContainer.validatePosition();
        });

        animation.events.on("animationended", flyPlane)

        // Increment line, or reverse the direction
        currentLine += direction;
        if (currentLine < 0) {
          currentLine = 0;
          direction = 1;
        }
        else if ((currentLine + 1) > numLines) {
          currentLine = 0;
          // direction = -1;
        }
      }
      flyPlane();
      this.setState({
        start: true
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
      <div id='mapWorldAnimated' style={{ width: '100%', height: vw < 1200 ? '35vh' : '50vh' }}></div>
    );
  }
}

export default AnimatedWorldMap;