// // theme.ts

// export const COLORS = {
//     white: "#FFFFFF",
//     black: "#000000",
//     grey: "#808080",
//     lightGrey: "#D3D3D3",
//     primary: "#1DA1F2",   // example blue
//     secondary: "#657786",
//     azure: "#007FFF"
// } as const;

// export const SIZES = {
//     xs: "4px",
//     sm: "6px",
//     md: "10px",
//     lg: "12px",
//     xl: "18px",
//     xxl: "35px",
//     postWidth: "60%",
//     postedImageWidth: "350px",
//     commentInputHeight: "40px",
// } as const;

// // Type for COLORS and SIZES
// export type ThemeColors = typeof COLORS;
// export type ThemeSizes = typeof SIZES;

// // Utility to inject theme as CSS variables
// export function setCSSVariables(): void {
//     const root = document.documentElement;

//     Object.entries(COLORS).forEach(([key, value]) => {
//         root.style.setProperty(`--color-${key}`, value);
//     });

//     Object.entries(SIZES).forEach(([key, value]) => {
//         root.style.setProperty(`--size-${key}`, value);
//     });
// }


// theme.ts

export const COLORS = {
    white: "#FFFFFF",
    black: "#000000",
    grey: "#808080",
    lightGrey: "#D3D3D3",


    // Brand colors
    primary: "#1DA1F2",   // Twitter blue
    primaryLight: "#A5D8FA",
    primaryDark: "#0D8BD9",

    secondary: "#657786",
    secondaryLight: "#8899A6",
    secondaryDark: "#4A5568",

    // Status colors
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",

    // Extra colors
    azure: "#007FFF",
    background: "#F9FAFB",
    backgroundDark: "#1A1A1A",
    text: "#111827",
    textLight: "#6B7280",

    button: "#14B8A6",
    buttonHover: "#0D9488",
    buttonLight: "#99F6E4",

    buttonText: "#0D9488"
} as const;

export const SIZES = {
    xs: "4px",
    sm: "6px",
    md: "10px",
    lg: "12px",
    xl: "18px",
    xxl: "35px",
    postWidth: "60%",
    postedImageWidth: "350px",
    commentInputHeight: "40px",

    // Typography
    fontXs: "12px",
    fontSm: "14px",
    fontMd: "16px",
    fontLg: "20px",
    fontXl: "24px",
    font2xl: "32px",

    // Border radius
    radiusSm: "4px",
    radiusMd: "8px",
    radiusLg: "12px",
    radiusXl: "20px",

    // Z-index
    zTooltip: "1000",
    zDropdown: "1100",
    zModal: "1200",
    zToast: "1300"
} as const;

// Type for COLORS and SIZES
export type ThemeColors = typeof COLORS;
export type ThemeSizes = typeof SIZES;

// Utility to inject theme as CSS variables
export function setCSSVariables(): void {
    const root = document.documentElement;

    Object.entries(COLORS).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(SIZES).forEach(([key, value]) => {
        root.style.setProperty(`--size-${key}`, value);
    });
}

