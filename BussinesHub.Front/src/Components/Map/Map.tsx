import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, useMapEvents } from 'react-leaflet';
import { Layers } from './Layers';
import { Coordinate } from '../../Models/Coordinate';

interface IProps {
	onMarkerSet: (latitude: number, longitude: number) => void;
	initalMarker: Coordinate;
}

export const Map: React.FC<IProps> = ({ onMarkerSet, initalMarker }) => {
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>(
		initalMarker ? [initalMarker.latitude, initalMarker.longitude] : [0, 0],
	);

	const Markers = () => {
		useMapEvents({
			click(e) {
				onMarkerSet(e.latlng.lat, e.latlng.lng);
				setSelectedPosition([e.latlng.lat, e.latlng.lng]);
			},
		});

		return selectedPosition ? <Marker key={selectedPosition[0]} position={selectedPosition} interactive={false} /> : null;
	};

	useEffect(() => {
		setSelectedPosition([initalMarker.latitude, initalMarker.longitude]);
	}, [initalMarker]);

	return (
		<>
			<MapContainer center={[44.5, 16]} zoom={7} scrollWheelZoom={true} style={{ height: '90%', width: '90%' }}>
				<Layers />
				<Markers />
			</MapContainer>
		</>
	);
};

export default Map;
