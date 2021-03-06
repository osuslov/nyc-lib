import './nyc-index'

import _nyc_ol from 'nyc/ol'
import _nyc_ol_Basemap from 'nyc/ol/Basemap'
import _nyc_ol_FeaturePopup from 'nyc/ol/FeaturePopup'
import _nyc_ol_FeatureTip from 'nyc/ol/FeatureTip'
import _nyc_ol_Filters from 'nyc/ol/Filters'
import _nyc_ol_LocalStorage from 'nyc/ol/LocalStorage'
import _nyc_ol_LocationMgr from 'nyc/ol/LocationMgr'
import _nyc_ol_Locator from 'nyc/ol/Locator'
import _nyc_ol_MapLocator from 'nyc/ol/MapLocator'
import _nyc_ol_MultiFeaturePopup from 'nyc/ol/MultiFeaturePopup'
import _nyc_ol_Popup from 'nyc/ol/Popup'
import _nyc_ol_Zoom from 'nyc/ol/Zoom'
import _nyc_ol_Geolocate from 'nyc/ol/Geolocate'
import _nyc_ol_Search from 'nyc/ol/Search'

import _nyc_ol_MapMgr from 'nyc/ol/MapMgr'
import _nyc_ol_FrameworkMap from 'nyc/ol/FrameworkMap'
import _nyc_ol_FinderApp from 'nyc/ol/FinderApp'

window.nyc.ol = _nyc_ol
window.nyc.ol.Basemap = _nyc_ol_Basemap
window.nyc.ol.FeaturePopup = _nyc_ol_FeaturePopup
window.nyc.ol.FeatureTip = _nyc_ol_FeatureTip
window.nyc.ol.Filters = _nyc_ol_Filters
window.nyc.ol.LocalStorage = _nyc_ol_LocalStorage
window.nyc.ol.LocationMgr = _nyc_ol_LocationMgr
window.nyc.ol.Locator = _nyc_ol_Locator
window.nyc.ol.MapLocator = _nyc_ol_MapLocator
window.nyc.ol.MultiFeaturePopup = _nyc_ol_MultiFeaturePopup
window.nyc.ol.Popup = _nyc_ol_Popup
window.nyc.ol.Zoom = _nyc_ol_Zoom
window.nyc.ol.Geolocate = _nyc_ol_Geolocate
window.nyc.ol.Search = _nyc_ol_Search

window.nyc.ol.MapMgr = _nyc_ol_MapMgr
window.nyc.ol.FrameworkMap = _nyc_ol_FrameworkMap
window.nyc.ol.FinderApp = _nyc_ol_FinderApp

import _nyc_ol_format_StandardCsv from 'nyc/ol/format/StandardCsv'
import _nyc_ol_format_CsvAddr from 'nyc/ol/format/CsvAddr'
import _nyc_ol_format_CsvPoint from 'nyc/ol/format/CsvPoint'
import _nyc_ol_format_CartoSql from 'nyc/ol/format/CartoSql'
import _nyc_ol_format_Decorate from 'nyc/ol/format/Decorate'
import _nyc_ol_format_SocrataJson from 'nyc/ol/format/SocrataJson'

window.nyc.ol.format = {}
window.nyc.ol.format.StandardCsv = _nyc_ol_format_StandardCsv
window.nyc.ol.format.CsvAddr = _nyc_ol_format_CsvAddr
window.nyc.ol.format.CsvPoint = _nyc_ol_format_CsvPoint
window.nyc.ol.format.CartoSql = _nyc_ol_format_CartoSql
window.nyc.ol.format.Decorate = _nyc_ol_format_Decorate
window.nyc.ol.format.SocrataJson = _nyc_ol_format_SocrataJson

import _nyc_ol_source_AutoLoad from 'nyc/ol/source/AutoLoad'
import _nyc_ol_source_FilterAndSort from 'nyc/ol/source/FilterAndSort'
import _nyc_ol_source_SocrataJson from 'nyc/ol/source/SocrataJson'

window.nyc.ol.source = {}
window.nyc.ol.source.AutoLoad = _nyc_ol_source_AutoLoad
window.nyc.ol.source.FilterAndSort = _nyc_ol_source_FilterAndSort
window.nyc.ol.source.SocrataJson = _nyc_ol_source_SocrataJson
