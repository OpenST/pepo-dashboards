import React, { lazy } from 'react';
import CdnDataSource from './datasource';
import { applyTheme } from './theme';
import Table from './table';
import Pic from './pic';
import Video from './video';

const lazyViz = fn => {
    return lazy(() =>
        fn().then(res => {
            if (res.themes) {
                applyTheme(res.themes);
            }
            return res;
        })
    );
};

const fixWrapper = LazyComponent => props => {
    if (props.dataSources.primary && !props.dataSources.primary.requestParams) {
        props.dataSources.primary.requestParams = { count: 100 };
    }

    return <LazyComponent {...props} />;
};

const PRESET = {
    layouts: {
        grid: lazyViz(() => import('@splunk/dashboard-layouts/GridLayoutViewer')),
        absolute: lazyViz(() => import('@splunk/dashboard-layouts/AbsoluteLayout')),
    },
    dataSources: {
        'ds.cdn': CdnDataSource,
        'ds.search': CdnDataSource,
    },
    visualizations: {
        'viz.table': Table,
        'viz.pie': lazyViz(() => import('@splunk/dashboard-visualizations/Pie')), // Pie,
        'viz.punchcard': lazyViz(() => import('@splunk/dashboard-visualizations/Punchcard')), // Punchcard,
        'viz.area': lazyViz(() => import('@splunk/dashboard-visualizations/Area')), // Area,
        'viz.bar': fixWrapper(lazyViz(() => import('@splunk/dashboard-visualizations/Bar'))), // Bar,
        'viz.bubble': lazyViz(() => import('@splunk/dashboard-visualizations/Bubble')), // Bubble,
        'viz.column': lazyViz(() => import('@splunk/dashboard-visualizations/Column')), // Column,
        'viz.fillergauge': lazyViz(() => import('@splunk/dashboard-visualizations/FillerGauge')), // FillerGauge,
        'viz.line': lazyViz(() => import('@splunk/dashboard-visualizations/Line')), // Line,
        'viz.markergauge': lazyViz(() => import('@splunk/dashboard-visualizations/MarkerGauge')), // MarkerGauge,
        'viz.scatter': lazyViz(() => import('@splunk/dashboard-visualizations/Scatter')), // Scatter,
        'viz.radialgauge': lazyViz(() => import('@splunk/dashboard-visualizations/RadialGauge')), // RadialGauge,
        'viz.singlevalue': lazyViz(() => import('@splunk/dashboard-visualizations/SingleValue')),
        'viz.singlevalueicon': lazyViz(() => import('@splunk/dashboard-visualizations/SingleValueIcon')), // SingleValueIcon,
        'viz.singlevalueradial': lazyViz(() => import('@splunk/dashboard-visualizations/SingleValueRadial')), // SingleValueRadial,
        'viz.markdown': lazyViz(() => import('@splunk/dashboard-visualizations/Markdown')), // Markdown,
        'viz.img': lazyViz(() => import('@splunk/dashboard-visualizations/Image')), // Image,
        'viz.ellipse': lazyViz(() => import('@splunk/dashboard-visualizations/Ellipse')), // Ellipse,
        'viz.rectangle': lazyViz(() => import('@splunk/dashboard-visualizations/Rectangle')), // Rectangle,
        'viz.text': lazyViz(() => import('@splunk/dashboard-visualizations/Text')), // Text,
        'viz.geojson.us': lazyViz(() => import('@splunk/dashboard-visualizations/Choropleth')), // Choropleth,
        'viz.geojson.world': lazyViz(() => import('@splunk/dashboard-visualizations/Choropleth')), // Choropleth,
        'abslayout.line': lazyViz(() => import('@splunk/dashboard-layouts/visualizations/ConnectedLine')),

        'viz.pic': Pic,
        'viz.video': Video,
    },
};

export default PRESET;
