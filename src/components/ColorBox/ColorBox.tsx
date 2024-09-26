import { useEffect } from 'react';
import $ from 'jquery';

const ColorBox = () => {
  useEffect(() => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    let currentColorIndex = 0;

    const changeBorderColor = () => {
      $('.color-box').css('border-color', colors[currentColorIndex]);
      $('.inner-box-1').css('border-color', colors[(currentColorIndex + 1) % colors.length]);
      $('.inner-box-2').css('border-color', colors[(currentColorIndex + 2) % colors.length]);

      currentColorIndex = (currentColorIndex + 1) % colors.length;
    };

    const animateBox = () => {
      const $box = $('.color-box');
      const boxWidth = $box.outerWidth();
      const boxHeight = $box.outerHeight();
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();

      if (!windowWidth || !windowHeight) return;
      if (!boxWidth || !boxHeight) return;

      const maxLeft = windowWidth - boxWidth;
      const maxTop = windowHeight - boxHeight;

      $box.animate({
        left: maxLeft,
        top: maxTop
      }, 2000, function () {
        $(this).fadeOut(1000, function () {
          $(this).css({ left: '0%', top: maxTop, backgroundColor: 'blue' }).fadeIn(1000);
        });
      });
    };

    const intervalId = setInterval(changeBorderColor, 1000);

    setTimeout(animateBox, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed w-full h-full">
      <div className="color-box absolute border-8 border-red-500 w-48 h-48 flex justify-center items-center left-0 top-0">
        <div className="inner-box-1 w-32 h-32 border-8 border-green-500 flex justify-center items-center">
          <div className="inner-box-2 w-16 h-16 border-8 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;