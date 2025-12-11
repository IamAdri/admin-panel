import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    /*Blue*/
--color-blue-700:oklch(50% 0.134 242.749);
--color-blue-600:oklch(58.8% 0.158 241.966);
--color-blue-50:oklch(97% 0.014 254.604);
--color-blue-400:oklch(70.7% 0.165 254.624);
/*Grey*/
--color-grey-800:oklch(27.8% 0.033 256.848);
--color-grey-50:oklch(98.5% 0.002 247.839);
--color-grey-600:oklch(44.6% 0.03 256.802);
--color-grey-400:oklch(70.7% 0.022 261.325);
--color-grey-200:oklch(92.8% 0.006 264.531);
--color-grey-300:oklch(87.2% 0.01 258.338);
--color-grey-700:oklch(37.3% 0.034 259.733);

}
*, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body{
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

}

button{
    cursor: pointer;
}`;

export default GlobalStyles;
