export namespace browserUtils {
    let _isFirefox: boolean = null;

    let _isIE: boolean = null;

    let mobileModeChangeHandler: (newValue: boolean) => void;

    export function isIE(): boolean {
        if (_isIE === null) {
             const ua = navigator.userAgent;
            return ua.includes('MSIE') || ua.includes('Trident')
        }
        return _isIE;
    }

    export function isEdge(): boolean {
        const ua = window.navigator.userAgent;
        return !isIE() && ua.includes('Edge/')
    }

    export function isFirefox(): boolean {
        if (_isFirefox === null) {
            const ua = navigator.userAgent;
            _isFirefox = ua.toLowerCase().includes('firefox');
        }
        return _isFirefox;
    }

    let _detectedIsMobileMode: boolean = false;
    let _isMobileMode: boolean = undefined;
    let detectIsMobileMode = () => {
        const oldValue = isMobileMode();

        _detectedIsMobileMode = window.matchMedia('only screen and (max-width: 840px)').matches 
                                        || window.matchMedia('only screen and (max-height: 420px)').matches;

        const newValue = isMobileMode();

        if (newValue !== oldValue && mobileModeChangeHandler) {
            mobileModeChangeHandler(newValue);
        }
    } 
    
    detectIsMobileMode();
    window.addEventListener('resize', () => detectIsMobileMode());
    
    export function isMobileMode(): boolean {
        if (_isMobileMode !== undefined) {
            return _isMobileMode;
        }
        else {
            return _detectedIsMobileMode;
        }
    }
    
    export function setIsMobileMode(value: boolean | undefined) {
        const oldValue = isMobileMode();

        _isMobileMode = value;

        const newValue = isMobileMode();

        if (newValue !== oldValue && mobileModeChangeHandler) {
            mobileModeChangeHandler(newValue);
        }
    }    

    export function onMobileModeChanged(callback: (newValue: boolean) => void) {
        mobileModeChangeHandler = callback;
    }
}