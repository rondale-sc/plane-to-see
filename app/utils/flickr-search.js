import fetch from 'fetch';

const apiKey = '4fab113b29485404aa5d6550de5d006d';
const apiUrl = 'https://api.flickr.com/services/rest/';

function toQuerystring(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

export function search(text, opts) {
  const params = {
    method: 'flickr.photos.search',
    extras: 'description',
    format: 'json',
    api_key: apiKey,
    text: text,
    license: '4,5,6,7',
    content_type: 1,
    nojsoncallback: 1,
    per_page: 10
  };

  return fetch(apiUrl + '?' + toQuerystring(params), opts).then(function(response) {
    return response.json();
  }).then(function(response){
    if (response.stat === 'fail') {
      throw Error(response.err.msg);
    }

    return response.photos.photo.sort(function(a, b) {
      return b.id - a.id;
    }).map(function(photo) {
      return {
        id: photo.id,
        title: photo.title,
        flickrUrl: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id + '/',
        imgUrl: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_c.jpg',
        description: photo.description._content.trim()
      };
    });
  });
}
