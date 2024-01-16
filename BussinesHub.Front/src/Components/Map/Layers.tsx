import React from 'react';
import { LayersControl, TileLayer } from 'react-leaflet';

interface Layers {
	children?: React.ReactNode;
}

export function Layers(props: Layers) {
	return (
		<LayersControl>
			<LayersControl.BaseLayer checked name="OpenStreetMap">
				<TileLayer
					attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</LayersControl.BaseLayer>
			{/* <LayersControl.BaseLayer name="Stamen black & white">
				<TileLayer
					// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
				/>
			</LayersControl.BaseLayer>
			<LayersControl.BaseLayer name="Stamen watercolor">
				<TileLayer
					// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
				/>
			</LayersControl.BaseLayer>
			<LayersControl.BaseLayer name="Stamen terrain">
				<TileLayer
					// attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
				/>
			</LayersControl.BaseLayer> */}
			{props.children &&
				React.Children.map(props.children, (child) => child && React.cloneElement(child as React.DetailedReactHTMLElement<any, HTMLElement>))}
		</LayersControl>
	);
}
