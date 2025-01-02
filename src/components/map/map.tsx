import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { Offer, MapStartPosition } from '../../types';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../../const';
import useMap from '../../hooks/use-map';
import cn from 'classnames';
import 'leaflet/dist/leaflet.css';
import { Circle } from 'leaflet';

type MapProps = {
  startPosition: MapStartPosition;
  offers: Offer[];
  className: string;
  activeOffer: Offer | null;
  circleRadius?: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map({ startPosition, offers, activeOffer, className, circleRadius = 0 }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPosition);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker(offer.location);
        marker
          .setIcon(
            activeOffer !== null && offer.id === activeOffer.id
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });


      const circle = new Circle(startPosition.center, circleRadius);
      circle.addTo(map);

      map.setView(startPosition.center, startPosition.zoom);

      return () => {
        map.removeLayer(markerLayer);
        map.removeLayer(circle);
      };
    }
  }, [map, offers, activeOffer, circleRadius, startPosition]);

  return <section className={cn('map', className)} ref={mapRef}></section>;
}

export default Map;
