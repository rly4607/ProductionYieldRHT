var React = require('react')
var ReactGMaps = require('react-gmaps')
var {Gmaps, Marker} = ReactGMaps

var hotels = require('../data/hotels.json')

var HotelMap = React.createClass({
  render: function() {
    return (
      <div className="map col-sm-12">
        <Gmaps width={'100%'}
               height={'480px'}
               lat={'41.9021988'}
               lng={'-87.6285782'}
               zoom={11}
               loadingMessage={'Hotels soon...'}
               params={{v: '3.exp', key: 'AIzaSyB3p_xQIXsFMDGLYNEiVkgW5fsVSUOd01c'}}>
          {hotels.map(function(hotel) {
            return <Marker lat={hotel.lat} lng={hotel.long} />
          })}
        </Gmaps>
      </div>
    )
  }
})

module.exports = HotelMap
