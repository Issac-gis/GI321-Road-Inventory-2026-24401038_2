var wms_layers = [];


        var lyr_OpenTopoMap_0 = new ol.layer.Tile({
            'title': 'OpenTopoMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.openstreetmap.org/copyright">Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)</a>',
                url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        });
var format_02_WEB_READY_OUTPUTRiversandCreeks_1 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTRiversandCreeks_1 = format_02_WEB_READY_OUTPUTRiversandCreeks_1.readFeatures(json_02_WEB_READY_OUTPUTRiversandCreeks_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTRiversandCreeks_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTRiversandCreeks_1.addFeatures(features_02_WEB_READY_OUTPUTRiversandCreeks_1);
var lyr_02_WEB_READY_OUTPUTRiversandCreeks_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTRiversandCreeks_1, 
                style: style_02_WEB_READY_OUTPUTRiversandCreeks_1,
                popuplayertitle: '02_WEB_READY_OUTPUT — Rivers and Creeks',
                interactive: true,
    title: '02_WEB_READY_OUTPUT — Rivers and Creeks<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRiversandCreeks_1_0.png" /> Creek/stream<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRiversandCreeks_1_1.png" /> Major river<br />' });
var format_02_WEB_READY_OUTPUTInundationRiskZones_2 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTInundationRiskZones_2 = format_02_WEB_READY_OUTPUTInundationRiskZones_2.readFeatures(json_02_WEB_READY_OUTPUTInundationRiskZones_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTInundationRiskZones_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTInundationRiskZones_2.addFeatures(features_02_WEB_READY_OUTPUTInundationRiskZones_2);
var lyr_02_WEB_READY_OUTPUTInundationRiskZones_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTInundationRiskZones_2, 
                style: style_02_WEB_READY_OUTPUTInundationRiskZones_2,
                popuplayertitle: '02_WEB_READY_OUTPUT — Inundation Risk Zones',
                interactive: true,
    title: '02_WEB_READY_OUTPUT — Inundation Risk Zones<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTInundationRiskZones_2_0.png" /> No Risk<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTInundationRiskZones_2_1.png" /> Medium<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTInundationRiskZones_2_2.png" /> High<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTInundationRiskZones_2_3.png" /> Very High<br />' });
var format_02_WEB_READY_OUTPUTRoadCentreline_3 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTRoadCentreline_3 = format_02_WEB_READY_OUTPUTRoadCentreline_3.readFeatures(json_02_WEB_READY_OUTPUTRoadCentreline_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTRoadCentreline_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTRoadCentreline_3.addFeatures(features_02_WEB_READY_OUTPUTRoadCentreline_3);
var lyr_02_WEB_READY_OUTPUTRoadCentreline_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTRoadCentreline_3, 
                style: style_02_WEB_READY_OUTPUTRoadCentreline_3,
                popuplayertitle: '02_WEB_READY_OUTPUT — Road Centreline',
                interactive: true,
                title: '<img src="styles/legend/02_WEB_READY_OUTPUTRoadCentreline_3.png" /> 02_WEB_READY_OUTPUT — Road Centreline'
            });
var format_02_WEB_READY_OUTPUTRoadGradientandSlope_4 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTRoadGradientandSlope_4 = format_02_WEB_READY_OUTPUTRoadGradientandSlope_4.readFeatures(json_02_WEB_READY_OUTPUTRoadGradientandSlope_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTRoadGradientandSlope_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTRoadGradientandSlope_4.addFeatures(features_02_WEB_READY_OUTPUTRoadGradientandSlope_4);
var lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTRoadGradientandSlope_4, 
                style: style_02_WEB_READY_OUTPUTRoadGradientandSlope_4,
                popuplayertitle: '02_WEB_READY_OUTPUT — Road Gradient and Slope',
                interactive: true,
    title: '02_WEB_READY_OUTPUT — Road Gradient and Slope<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRoadGradientandSlope_4_0.png" /> Flat<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRoadGradientandSlope_4_1.png" /> Rolling<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRoadGradientandSlope_4_2.png" /> Hilly<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTRoadGradientandSlope_4_3.png" /> Mountainous<br />' });
var format_02_WEB_READY_OUTPUTStreamOutlets_5 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTStreamOutlets_5 = format_02_WEB_READY_OUTPUTStreamOutlets_5.readFeatures(json_02_WEB_READY_OUTPUTStreamOutlets_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTStreamOutlets_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTStreamOutlets_5.addFeatures(features_02_WEB_READY_OUTPUTStreamOutlets_5);
var lyr_02_WEB_READY_OUTPUTStreamOutlets_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTStreamOutlets_5, 
                style: style_02_WEB_READY_OUTPUTStreamOutlets_5,
                popuplayertitle: '02_WEB_READY_OUTPUT — Stream Outlets',
                interactive: true,
    title: '02_WEB_READY_OUTPUT — Stream Outlets<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTStreamOutlets_5_0.png" /> Perennial<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTStreamOutlets_5_1.png" /> Intermittent<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTStreamOutlets_5_2.png" /> Ephemeral<br />' });
var format_02_WEB_READY_OUTPUTCulverts_6 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTCulverts_6 = format_02_WEB_READY_OUTPUTCulverts_6.readFeatures(json_02_WEB_READY_OUTPUTCulverts_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTCulverts_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTCulverts_6.addFeatures(features_02_WEB_READY_OUTPUTCulverts_6);
var lyr_02_WEB_READY_OUTPUTCulverts_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTCulverts_6, 
                style: style_02_WEB_READY_OUTPUTCulverts_6,
                popuplayertitle: '02_WEB_READY_OUTPUT — Culverts',
                interactive: true,
    title: '02_WEB_READY_OUTPUT — Culverts<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTCulverts_6_0.png" /> Deteriorated<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTCulverts_6_1.png" /> Barely Functional<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTCulverts_6_2.png" /> Functional<br />\
    <img src="styles/legend/02_WEB_READY_OUTPUTCulverts_6_3.png" /> Unclassified<br />' });
var format_02_WEB_READY_OUTPUTChainagePoints_7 = new ol.format.GeoJSON();
var features_02_WEB_READY_OUTPUTChainagePoints_7 = format_02_WEB_READY_OUTPUTChainagePoints_7.readFeatures(json_02_WEB_READY_OUTPUTChainagePoints_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_02_WEB_READY_OUTPUTChainagePoints_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_02_WEB_READY_OUTPUTChainagePoints_7.addFeatures(features_02_WEB_READY_OUTPUTChainagePoints_7);
var lyr_02_WEB_READY_OUTPUTChainagePoints_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_02_WEB_READY_OUTPUTChainagePoints_7,
maxResolution:7.00111653806549,
 minResolution:0.28004466152261964,

                style: style_02_WEB_READY_OUTPUTChainagePoints_7,
                popuplayertitle: '02_WEB_READY_OUTPUT — Chainage Points',
                interactive: true,
                title: '<img src="styles/legend/02_WEB_READY_OUTPUTChainagePoints_7.png" /> 02_WEB_READY_OUTPUT — Chainage Points'
            });

lyr_OpenTopoMap_0.setVisible(true);lyr_02_WEB_READY_OUTPUTRiversandCreeks_1.setVisible(false);lyr_02_WEB_READY_OUTPUTInundationRiskZones_2.setVisible(false);lyr_02_WEB_READY_OUTPUTRoadCentreline_3.setVisible(true);lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4.setVisible(true);lyr_02_WEB_READY_OUTPUTStreamOutlets_5.setVisible(true);lyr_02_WEB_READY_OUTPUTCulverts_6.setVisible(true);lyr_02_WEB_READY_OUTPUTChainagePoints_7.setVisible(false);
var layersList = [lyr_OpenTopoMap_0,lyr_02_WEB_READY_OUTPUTRiversandCreeks_1,lyr_02_WEB_READY_OUTPUTInundationRiskZones_2,lyr_02_WEB_READY_OUTPUTRoadCentreline_3,lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4,lyr_02_WEB_READY_OUTPUTStreamOutlets_5,lyr_02_WEB_READY_OUTPUTCulverts_6,lyr_02_WEB_READY_OUTPUTChainagePoints_7];
lyr_02_WEB_READY_OUTPUTRiversandCreeks_1.set('fieldAliases', {'fid': 'fid', 'waterway_id': 'Waterway ID', 'waterway_type': 'Waterway Type', });
lyr_02_WEB_READY_OUTPUTInundationRiskZones_2.set('fieldAliases', {'fid': 'fid', 'risk_zone_id': 'Risk Zone ID', 'risk_level': 'Inundation Risk', 'risk_rank': 'risk_rank', 'source_description': 'source_description', });
lyr_02_WEB_READY_OUTPUTRoadCentreline_3.set('fieldAliases', {'fid': 'fid', 'road_id': 'Road ID', 'feature_type': 'Feature Type', 'length_m': 'Road Length (m)', });
lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4.set('fieldAliases', {'fid': 'fid', 'segment_id': 'Segment ID', 'gradient_pct': 'Gradient (%)', 'terrain_class': 'Terrain Class', 'chainage': 'chainage', 'segment_length_m': 'Segment Length (m)', 'source_gradient': 'source_gradient', 'source_category': 'source_category', });
lyr_02_WEB_READY_OUTPUTStreamOutlets_5.set('fieldAliases', {'fid': 'fid', 'outlet_id': 'outlet_id', 'waterway_name': 'waterway_name', 'flow_status': 'flow_status', });
lyr_02_WEB_READY_OUTPUTCulverts_6.set('fieldAliases', {'fid': 'fid', 'culvert_id': 'Culvert ID', 'structure': 'Culvert Type', 'length_m': 'Culvert Length (m)', 'diameter_m': 'Diameter (m) ', 'condition': 'condition', 'function': 'function', 'recommendation': 'Recommended Action', 'source_condition': 'source_condition', 'data_note': 'Verification Note', });
lyr_02_WEB_READY_OUTPUTChainagePoints_7.set('fieldAliases', {'fid': 'fid', 'chainage_id': 'Chainage ID', 'chainage': 'chainage', 'elevation_m': 'Elevation (m)', 'easting': 'Easting (m)', 'northing': 'Northing (m)', });
lyr_02_WEB_READY_OUTPUTRiversandCreeks_1.set('fieldImages', {'fid': 'Hidden', 'waterway_id': 'TextEdit', 'waterway_type': 'TextEdit', });
lyr_02_WEB_READY_OUTPUTInundationRiskZones_2.set('fieldImages', {'fid': 'Hidden', 'risk_zone_id': 'TextEdit', 'risk_level': 'TextEdit', 'risk_rank': 'TextEdit', 'source_description': 'Hidden', });
lyr_02_WEB_READY_OUTPUTRoadCentreline_3.set('fieldImages', {'fid': 'Hidden', 'road_id': 'TextEdit', 'feature_type': 'TextEdit', 'length_m': 'TextEdit', });
lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4.set('fieldImages', {'fid': 'Hidden', 'segment_id': 'TextEdit', 'gradient_pct': 'TextEdit', 'terrain_class': 'TextEdit', 'chainage': 'TextEdit', 'segment_length_m': 'TextEdit', 'source_gradient': 'Hidden', 'source_category': 'Hidden', });
lyr_02_WEB_READY_OUTPUTStreamOutlets_5.set('fieldImages', {'fid': 'TextEdit', 'outlet_id': 'TextEdit', 'waterway_name': 'TextEdit', 'flow_status': 'TextEdit', });
lyr_02_WEB_READY_OUTPUTCulverts_6.set('fieldImages', {'fid': 'Hidden', 'culvert_id': 'TextEdit', 'structure': 'TextEdit', 'length_m': 'TextEdit', 'diameter_m': 'TextEdit', 'condition': 'TextEdit', 'function': 'TextEdit', 'recommendation': 'TextEdit', 'source_condition': 'Hidden', 'data_note': 'TextEdit', });
lyr_02_WEB_READY_OUTPUTChainagePoints_7.set('fieldImages', {'fid': 'Hidden', 'chainage_id': 'TextEdit', 'chainage': 'TextEdit', 'elevation_m': 'TextEdit', 'easting': 'TextEdit', 'northing': 'TextEdit', });
lyr_02_WEB_READY_OUTPUTRiversandCreeks_1.set('fieldLabels', {'waterway_id': 'inline label - always visible', 'waterway_type': 'inline label - always visible', });
lyr_02_WEB_READY_OUTPUTInundationRiskZones_2.set('fieldLabels', {'risk_zone_id': 'inline label - always visible', 'risk_level': 'inline label - always visible', 'risk_rank': 'inline label - always visible', });
lyr_02_WEB_READY_OUTPUTRoadCentreline_3.set('fieldLabels', {'road_id': 'inline label - always visible', 'feature_type': 'inline label - always visible', 'length_m': 'inline label - always visible', });
lyr_02_WEB_READY_OUTPUTRoadGradientandSlope_4.set('fieldLabels', {'segment_id': 'inline label - always visible', 'gradient_pct': 'inline label - always visible', 'terrain_class': 'inline label - always visible', 'chainage': 'inline label - always visible', 'segment_length_m': 'inline label - always visible', });
lyr_02_WEB_READY_OUTPUTStreamOutlets_5.set('fieldLabels', {'fid': 'hidden field', 'outlet_id': 'inline label - always visible', 'waterway_name': 'inline label - always visible', 'flow_status': 'inline label - always visible', });
lyr_02_WEB_READY_OUTPUTCulverts_6.set('fieldLabels', {'culvert_id': 'inline label - always visible', 'structure': 'inline label - always visible', 'length_m': 'inline label - always visible', 'diameter_m': 'inline label - always visible', 'condition': 'inline label - always visible', 'function': 'inline label - always visible', 'recommendation': 'inline label - visible with data', 'data_note': 'inline label - visible with data', });
lyr_02_WEB_READY_OUTPUTChainagePoints_7.set('fieldLabels', {'chainage_id': 'inline label - always visible', 'chainage': 'inline label - always visible', 'elevation_m': 'inline label - always visible', 'easting': 'hidden field', 'northing': 'hidden field', });
lyr_02_WEB_READY_OUTPUTChainagePoints_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});