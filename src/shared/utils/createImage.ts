/**
 * Creates an Image object from a source URL
 * @param src - Image source URL or imported image
 * @returns Promise that resolves to an HTMLImageElement
 */
export const createImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

