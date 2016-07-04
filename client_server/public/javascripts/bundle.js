(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';
  // var knex = require('../../db/knex');


  // console.log(routes);

  L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
  const map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.018, -105.27], 14);

  let line_points = [
    [40.018, -105.27111],
    [40.018, -105.27112],
  ]
  let polyline_options = { color: 'red' }
  let polyline = L.polyline(line_points, polyline_options).addTo(map);

})()

},{}]},{},[1]);
