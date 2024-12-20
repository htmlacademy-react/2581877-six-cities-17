import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { MapStartPosition } from '../types';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, startPosition: MapStartPosition): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, startPosition);
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;

      //NOTE - задать вопрос: почему в данном случае не нужно убивать экземпляр карты. Слой маркеров в компоненте map удаляется
      //return () => { instance.remove();}
    }
  }, [mapRef, startPosition]);

  return map;
}

export default useMap;
