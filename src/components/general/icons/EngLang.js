import { SvgXml } from 'react-native-svg';

export const EngLang = ({ color, bgColor, size }) => {
    const svgFile = `
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1682_683)">
                <path d="M22.75 0C24.5426 0 26 1.45742 26 3.25V17.875C26 19.6676 24.5426 21.125 22.75 21.125H17.875V25.1875C17.875 25.4973 17.7023 25.7766 17.4281 25.9137C17.1539 26.0508 16.8238 26.0203 16.575 25.8375L10.2934 21.125H3.25C1.45742 21.125 0 19.6676 0 17.875V3.25C0 1.45742 1.45742 0 3.25 0H22.75Z" fill="${bgColor}"/>
                <path d="M11.9207 12.7292V13.875H8.12573V12.7292H11.9207ZM8.60561 6.74531V13.875H7.13658V6.74531H8.60561ZM11.4261 9.64909V10.7656H8.12573V9.64909H11.4261ZM11.9158 6.74531V7.89605H8.12573V6.74531H11.9158ZM18.5803 6.74531V13.875H17.1113L14.2467 9.09576V13.875H12.7777V6.74531H14.2467L17.1162 11.5295V6.74531H18.5803Z" fill="${color}"/>
            </g>
            <defs>
                <clipPath id="clip0_1682_683">
                    <rect width="26" height="26" fill="white"/>
                </clipPath>
            </defs>
        </svg>
        `;

    return <SvgXml xml={svgFile.toString()} width={size} height={size} />
};
