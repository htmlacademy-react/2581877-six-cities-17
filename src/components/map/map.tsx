import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { MarkerUrl } from '../../const';
import useMap from '../../hooks/use-map';
import cn from 'classnames';
import 'leaflet/dist/leaflet.css';
import { OfferFull, OfferPreview } from '../../types';
import { Location } from '../../types';

type MapProps = {
  startPosition: Location;
  offersList: OfferPreview[];
  className: string;
  activeOffer?: OfferPreview | null;
  currentOffer?: OfferFull | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const activeCustomIcon = new Icon({
  iconUrl: MarkerUrl.Active,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map({ startPosition, offersList, activeOffer = null, currentOffer = null, className }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPosition);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offersList.forEach((offerPreview) => {
        const hoverMarker = new Marker({
          lat: offerPreview.location.latitude,
          lng: offerPreview.location.longitude,
        });
        hoverMarker
          .setIcon(
            activeOffer !== null && offerPreview.id === activeOffer.id
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (currentOffer !== null) {
        const currentMarker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });
        currentMarker
          .setIcon(activeCustomIcon)
          .addTo(markerLayer);
      }

      map.setView({
        lat: startPosition.latitude,
        lng: startPosition.longitude,
      }, startPosition.zoom);

      return () => {
        map.removeLayer(markerLayer);

      };
    }
  }, [map, offersList, activeOffer, startPosition, currentOffer]);

  return <section className={cn('map', className)} ref={mapRef}></section>;
}

export default Map;
