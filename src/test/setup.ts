import '@testing-library/jest-dom';

// Mock scrollTo in jsdom
window.scrollTo = () => {};
