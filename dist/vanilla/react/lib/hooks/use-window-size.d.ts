interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}
export declare function useWindowSize(): {
    windowSize: WindowSize;
    isMobile: boolean;
    isDesktop: boolean;
};
export {};
