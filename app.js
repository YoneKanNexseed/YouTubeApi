const YOUR_API_KEY = 'XXXXX';
const cardTemplate = $('#card-template').html();

const Card = ({ videoId, src, title, description }) => `
  <div class="col-sm-6">
    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
      <div class="card">
        <img src="${src}" class="card-img-top">
        <div class="card-body">
          <h5 id="title" class="card-title">${title}</h5>
          <p id="description" class="card-text">${description}</p>
        </div>
      </div>
    </a>
  </div>
`;

$('#search-btn').on('click', () => {
  const searchWord = $('#search-word').val();

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: {
      part: 'snippet',
      q: searchWord,
      key: YOUR_API_KEY,
      maxResults: 50,
      type: 'video'
    }
  }).done(response => {
    $('.result').empty();

    response.items.forEach(video => {

      const videoId = video.id.videoId;
      const thumbnail = video.snippet.thumbnails.high.url;
      const title = video.snippet.title;
      const description = video.snippet.description;

      $('.result').append(Card({ videoId: videoId, src: thumbnail, title: title, description: description }));
    });

  }).fail(error => {
    console.log(error);
  })

});

