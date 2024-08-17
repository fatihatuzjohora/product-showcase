export const getRandomImageUrl = (width = 300, height = 200) => {
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
  };
  