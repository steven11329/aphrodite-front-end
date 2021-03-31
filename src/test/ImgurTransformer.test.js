import ImgurTransformer from '../utils/ImgurTransformer';

describe('Test transform()', () => {
  test('https://imgur.com/LeMZ6XV', () => {
    expect(ImgurTransformer.transform('https://imgur.com/LeMZ6XV')).toBe(
      'https://i.imgur.com/LeMZ6XV.jpg'
    );
    expect(
      ImgurTransformer.transform('https://imgur.com/LeMZ6XV', {
        thumbnail: true,
      })
    ).toBe('https://i.imgur.com/LeMZ6XVt.jpg');
  });

  test('https://i.imgur.com/dybqhtb.jpg', () => {
    expect(ImgurTransformer.transform('https://i.imgur.com/dybqhtb.jpg')).toBe(
      'https://i.imgur.com/dybqhtb.jpg'
    );
    expect(
      ImgurTransformer.transform('https://i.imgur.com/dybqhtb.jpg', {
        thumbnail: true,
      })
    ).toBe('https://i.imgur.com/dybqhtbt.jpg');
  });

  test('https://i.imgur.com/pqFqUFF.gif', () => {
    expect(ImgurTransformer.transform('https://i.imgur.com/pqFqUFF.gif')).toBe(
      'https://i.imgur.com/pqFqUFF.gif'
    );
  });

  test('https://i.imgur.com/wQegldW.mp4', () => {
    expect(ImgurTransformer.transform('https://i.imgur.com/wQegldW.mp4')).toBe(
      'https://i.imgur.com/wQegldW.jpg'
    );
  });

  test('https://upload.cc/i1/2021/03/20/q21E9P.gif', () => {
    expect(
      ImgurTransformer.transform('https://upload.cc/i1/2021/03/20/q21E9P.gif')
    ).toBeNull();
  });
});
