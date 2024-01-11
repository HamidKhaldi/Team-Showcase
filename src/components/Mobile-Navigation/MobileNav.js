import $ from "jquery";

export default {
    name: 'MobileNav',
    data() {
        return {
            mobileView: false,
            menuClass: ''
        }
    },
    methods:{
        checkWindow(){
            if(window.innerWidth <= 992 ){
                this.mobileView = true;
            } else{
                this.mobileView = false;
            }
        },
        openMenu(){
            this.menuClass = 'open-menu';
            //console.log('open');
        }, 
        closeMenu(){
            this.menuClass = 'close-menu';
            //console.log('close');			
        },
        windowHeight(){
            return $('#clHeader').height() + $('#cl_Wrapper').height();
        }
    },
    mounted(){
        this.checkWindow();
        window.addEventListener('resize', this.checkWindow);
    }
}

