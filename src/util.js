function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
}

export default isTouchDevice;