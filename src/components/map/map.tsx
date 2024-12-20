import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import { Offer, MapStartPosition } from '../../types';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  startPosition: MapStartPosition;
  offers: Offer[];
  activeOffer: Offer | null;
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

function Map({startPosition, offers, activeOffer} : MapProps): JSX.Element {
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

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer]);

  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;
