import * as React from "react";

interface WaveSpinnerProps {
    size?: number;
    color?: string;
    loading?: boolean;
    sizeUnit?: string;
}

const HomeLoader: React.FC<WaveSpinnerProps> = ({
    size = 30,
    color = "#fff",
    loading = true,
    sizeUnit = "px"
}) => {
    const countBars = 10;

    const getBars = () => {
        const bars = [];
        for (let i = 0; i < countBars; i++) {
            bars.push(
                <div
                    key={i}
                    className="absolute bg-current"
                    style={{
                        top: `${size / 10}${sizeUnit}`,
                        left: `${i * (size / 5 + (size / 15 - size / 100))}${sizeUnit}`,
                        width: `${size / 5}${sizeUnit}`,
                        height: `${size / 10}${sizeUnit}`,
                        marginTop: `${size - size / 10}${sizeUnit}`,
                        backgroundColor: color,
                        animation: 'wave 1.25s ease-in-out infinite',
                        animationDelay: `${i * 0.15}s`,
                    }}
                />
            );
        }
        return bars;
    };

    if (!loading) return null;

    return (
        <div
            className="relative flex justify-center items-center overflow-hidden"
            style={{
                width: `${size * 2.5}${sizeUnit}`,
                height: `${size}${sizeUnit}`
            }}
        >
            {getBars()}
        </div>
    );
};

export default React.memo(HomeLoader);