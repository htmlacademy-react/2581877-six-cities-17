import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../../const';
import useMap from '../../hooks/use-map';
import cn from 'classnames';
import 'leaflet/dist/leaflet.css';
import { OfferPreview } from '../../types';
import { Location } from '../../types';

type MapProps = {
  startPosition: Location;
  offersList: OfferPreview[];
  className: string;
  activeOffer: OfferPreview | null;
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

function Map({ startPosition, offersList, activeOffer, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPosition);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offersList.forEach((offerPreview) => {
        const marker = new Marker({
          lat: offerPreview.location.latitude,
          lng: offerPreview.location.longitude,
        });
        marker
          .setIcon(
            activeOffer !== null && offerPreview.id === activeOffer.id
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      map.setView({
        lat: startPosition.latitude,
        lng: startPosition.longitude,
      }, startPosition.zoom);

      return () => {
        map.removeLayer(markerLayer);

      };
    }
  }, [map, offersList, activeOffer, startPosition]);

  return <section className={cn('map', className)} ref={mapRef}></section>;
}

export default Map;
