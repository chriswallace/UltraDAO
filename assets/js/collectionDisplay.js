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

    test = hitApi("/isles.json", function(test, collection){

        collection.data.forEach(obj => {
            //console.log(obj.data.name);
            htmlString =  `<div class="grid-item">`;
            htmlString += `<img src="/assets/images/curated-1-hero.jpg" data-src="${obj.data.image}" data-srcset="${obj.data.image} 2x, ${obj.data.image} 1x" class="lazy" alt="">`;
            htmlString += `<h3>${obj.data.name}</h3>`;
            htmlString += `</div>`;

            document.getElementById('collection-display').innerHTML += htmlString;
        });

    });

    
})();