$(function(){
    $('.set-bg').each(function(){
        let bg = $(this).data('setbg');
        $(this).css(
            'background-image', 'url(' + bg + ')'
        )
    });

    $('.toggle').click(function(){
        $('.nav').slideToggle(400);
    });

    $('.img-sec').owlCarousel({
        loop: true,
        autoplay: true,
        items: 3,
        margin: 40,
        nav: false,
        dots: false,
        responsive: {
            768: {
                items: 2,
                margin: 20,
            },
            500: {
                items: 1,
                margin: 0,
            },
            0: {
                items: 1,
                margin: 0,
            },
            1024: {
                items: 3,
            },
        }
    });


    // $('#submitButton').click(function(e){
    //     e.preventDefault();
    //     $('#testform').submit()
    // })
})