function hitApi(url, callback) {
    var req = new XMLHttpRequest();
  
    req.addEventListener('load', onLoad);
    req.addEventListener('error', onFail);
    req.addEventListener('abort', onFail);
  
    req.open('GET', url);
    req.send();
  
    function onLoad(event) {
      if (req.status >= 400) {
        onFail(event);
      } else {
        var json = JSON.parse(this.responseText);
        callback(null, json);
      }
    }
  
    function onFail(event) {
      callback(new Error('...'));
    }
  }

document.addEventListener("DOMContentLoaded", function() {
var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.srcset = lazyImage.dataset.srcset;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
        }
    });
    });

    lazyImages.forEach(function(lazyImage) {
    lazyImageObserver.observe(lazyImage);
    });
} else {
    // Possibly fall back to event handlers here
}
});

CollectionDisplay = (function() {

  var container = document.getElementById('collection-display');

  console.log(container);

  if( container ){

    test = hitApi("/isles.json", function(test, collection){

        collection.data.forEach(obj => {

            htmlString =  `<div class="grid-item">`;
            htmlString += `<img src="/assets/images/curated-1-hero.jpg" data-src="https://media-cdn.deca.art/ethereum/0xA708AbaBBF9cB9707fF352CF954767b3B5E6a216/${obj.tokenId}/original.png?tx=w_420,c_limit" data-srcset="https://media-cdn.deca.art/ethereum/0xA708AbaBBF9cB9707fF352CF954767b3B5E6a216/${obj.tokenId}/original.png?tx=w_840,c_limit 2x, https://media-cdn.deca.art/ethereum/0xA708AbaBBF9cB9707fF352CF954767b3B5E6a216/${obj.tokenId}/original.png?tx=w_420,c_limit 1x" class="lazy" alt="">`;
            htmlString += `<h3>#${obj.data.name}</h3>`;
            htmlString += `</div>`;
            container.innerHTML += htmlString;
        });

    });

  }

})();