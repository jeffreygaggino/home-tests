

/**
   Cover Video is a video-component that acts like a background-image
 **/
const CoverVideo = {
    name: 'cover-video',
    props: {
        screen_width: { required: true, type: Number },
        video_src: {required: true, type: Object},
    },
    data(){
        return{
            video: {
                video: '',
                img: ''
            }
        }
    },
    created(){
        // set video and poster depending on the screen size
        if(this.screen_width >= 768){
            this.video.video = this.video_src.desktop.src;
            this.video.img = this.video_src.desktop.poster;
        }
        else{
            this.video.video = this.video_src.mobile.src;
            this.video.img = this.video_src.mobile.poster;
        }
    },
    watch: {
        screen_width: function() {
            if(this.screen_width >= 768){
                this.video.video = this.video_src.desktop.src;
                this.video.img = this.video_src.desktop.poster;
            }
            else{
                this.video.video = this.video_src.mobile.src;
                this.video.img = this.video_src.mobile.poster;
            }
        }
    },
    mounted(){
        // // intersect observe the video to play
        // observe_show_video = new IntersectionObserver(entries => {
        //     entries.forEach(entry => {
        //         if (entry.intersectionRatio > 0) {
        //             document.querySelector("#product-video-prime").play();
        //         }
        //     });
        // });
        // observe_show_video.observe(document.querySelector("#product-video-prime"));
    },
    template: /*html*/
    `
        <div class="cover-video" >
                <video :poster="video.img" autoplay preload="none" playsinline muted loop>
                    <source :src="video.video" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
        </div>
    `
};





const home_app = new Vue({
    name: 'Home App',
    el: '#home',
    delimiters: ['${', '}'],
    components: {
        "cover-video": CoverVideo,
    },
    data: {
       screen_width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    },
    mounted(){
        var debounce_screen_width = this.debounce(this.on_resize, 500)
        window.addEventListener("resize", debounce_screen_width);

      
       
    },
    methods: {
        on_resize: function on_resize(){
            this.screen_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            console.log('resize')
        },
        debounce: function debounce(func, wait, immediate){
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
    },
    created() {
       
    }
})

gsap.registerPlugin(ScrollTrigger)


scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
    '.container', {
        scrollTop(value) {
            return arguments.length ?
            scroller.scrollTo(value, 0, 0) :
            scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                left: 0, top: 0, 
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
)




ScrollTrigger.addEventListener('refresh', () => scroller.update())


ScrollTrigger.refresh()

