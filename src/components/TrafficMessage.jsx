import { Marker, Popup } from 'react-leaflet';

const TrafficMessage = ( {message }) => {
    if (message.geometry.type === 'Point') {
        return (
            <Marker position={[message.geometry.coordinates[1], message.geometry.coordinates[0]]}>
                    <Popup>
                        {message.properties.announcements[0].title} <br/> 
                        {message.properties.announcements[0].comment} <br/> 
                        {formatDateTime(message.properties.dataUpdatedTime)}
                    </Popup>
            </Marker>
        )
    } else if (message.geometry.type === 'MultiLineString') {
        return (
            <Marker position={[message.geometry.coordinates[0][0][1], message.geometry.coordinates[0][0][0]]}>
                    <Popup>
                      {message.properties.announcements[0].title} <br/> 
                      {message.properties.announcements[0].comment} <br/> 
                      {formatDateTime(message.properties.dataUpdatedTime)}
                    </Popup>
            </Marker>
        )
    } else if (message.geometry.type === 'LineString') {
        return (
            <Marker position={[message.geometry.coordinates[0][1], message.geometry.coordinates[0][0]]}>
                    <Popup>
                      {message.properties.announcements[0].title} <br/> 
                      {message.properties.announcements[0].comment} <br/> 
                      {formatDateTime(message.properties.dataUpdatedTime)}
                    </Popup>
            </Marker>
        )
    }
}

const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('fi-FI');
    const formattedTime = date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  }

export default TrafficMessage