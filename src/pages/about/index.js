/* eslint-disable */
import './about.scss';
import imgUrl from '@/assets/images/cat.jpeg';
import svgUrl from '@/assets/images/female.svg';

console.log('about 页面加载完成');

const img = document.createElement('img');
img.style.width = '200px';
img.src = imgUrl;
document.body.appendChild(img);

const svg = document.createElement('img');
svg.style.width = '200px';
svg.src = svgUrl;
document.body.appendChild(svg);
