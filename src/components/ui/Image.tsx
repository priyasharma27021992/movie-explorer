import NextImage from 'next/image';
import type { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
    className?: string;
}

const Image = ({
    className,
    width = 300,
    height = 300,
    fill,
    ...restProps
}: CustomImageProps) => {
    if (fill)
        return (
            <NextImage
                className={className}
                fill
                sizes={
                    restProps.sizes ??
                    '(max-width: 600px) 160px, (max-width:1200px) 200px, 240px'
                }
                {...restProps}
            />
        );
    return (
        <NextImage
            className={className}
            width={width}
            height={height}
            sizes={
                restProps.sizes ??
                '(max-width: 600px) 160px, (max-width:1200px) 200px, 240px'
            }
            {...restProps}
        />
    );
};

export { Image };
