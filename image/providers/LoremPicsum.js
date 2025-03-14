module.exports = {
  getImageUrl(size) {
    'use strict';

    const pieces = size.split('x');

    return 'https://picsum.photos/' + pieces[0] + '/' + pieces[1] + '/?random';
  }
};