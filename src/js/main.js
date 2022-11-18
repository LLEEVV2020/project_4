import Swiper from 'swiper'
import 'swiper/'
import 'swiper/css';
import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';




const swiper = new Swiper('.header-swiper',{
  direction: 'vertical',
  loop: true,

});
