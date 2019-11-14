if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}



$( document ).ready(function() {

    // if (window.location.hash) {
    //     var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    //     subPage(hash);
    // }
    //
    //
    // function subPage(page) {
    //
    //     const error404 = fetch('/pages/error404.html');
    //     const container = $('.container');
    //
    //     fetch('/pages/' + page + '.html')
    //         .then(resp => {
    //             return resp.ok ? resp.text() : error404.text();
    //         }).then( content  => {
    //             container.html( content );
    //         })
    //         .catch( err => {
    //             console.log('thumadree');
    //             console.log(err);
    //         });
    // }
    //


});
