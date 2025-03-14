module.exports = {
  getImageUrl(size) {
    'use strict';

    const pieces = size.split('x');

    return 'https://fakeimg.pl/' + pieces[0] + 'x' + pieces[1] + '/384f66/ecf0f1/?text=Spaceholder&font=lobster';
  }
};