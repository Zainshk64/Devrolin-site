import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/Logos-SponsorShip/1.png";
import two from "public/images/Logos-SponsorShip/4.png";
import three from "public/images/Logos-SponsorShip/5.png";
import four from "public/images/Logos-SponsorShip/8.png";
import five from "public/images/Logos-SponsorShip/9.png";
import six from "public/images/Logos-SponsorShip/12.png";
import seven from "public/images/Logos-SponsorShip/14.png";



const HomeSponsor = () => {
  return (
    <div className="sponsor section pb-0">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="sponsor__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                roundLengths={true}
                centeredSlides={true}
                centeredSlidesBounds={false}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1400: {
                    slidesPerView: 6,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                }}
                className="sponsor__slider"
              >
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/openAi_logo_ek4tjh.png' width={130} height={130} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src=
                    'https://res.cloudinary.com/daljxhxzf/image/upload/v1760879770/react_x9eaze.png'
                    width={130} height={130}
                     alt="reactlogo" />
                  </div>
                </SwiperSlide>
                
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760879769/python_jmdsit.png'
                    height={150} width={150}
                     alt="pythonLogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883280/nextjs_sfch5z.png'
                    height={150} width={150} alt="nextjslogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883292/flutter_pvfpsk.png'
                    height={150} width={150} alt="flutterlogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883534/web3_trvl1w.png'
                    width={150} height={150} alt="web3logo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885358/figma_ujh0hq.png' 
                    width={150} height={150}
                    alt="figmaLogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/gemini_ml3rsa.png' 
                    width={150} height={150} alt="gemini" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/openAi_logo_ek4tjh.png' width={130} height={130} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src=
                    'https://res.cloudinary.com/daljxhxzf/image/upload/v1760879770/react_x9eaze.png'
                    width={130} height={130}
                     alt="reactlogo" />
                  </div>
                </SwiperSlide>
                
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760879769/python_jmdsit.png'
                    height={150} width={150}
                     alt="pythonLogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883280/nextjs_sfch5z.png'
                    height={150} width={150} alt="nextjslogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883292/flutter_pvfpsk.png'
                    height={150} width={150} alt="flutterlogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760883534/web3_trvl1w.png'
                    width={150} height={150} alt="web3logo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885358/figma_ujh0hq.png' 
                    width={150} height={150}
                    alt="figmaLogo" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src='https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/gemini_ml3rsa.png' 
                    width={150} height={150} alt="gemini" />
                  </div>
                </SwiperSlide>
                {/* <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={two} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={three} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={four} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={five} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={six} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={three} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={four} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={five} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={six} alt="Image" />
                  </div>
                </SwiperSlide> */}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default HomeSponsor;
