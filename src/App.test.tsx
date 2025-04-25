import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import { store } from "./Store";
import { vi, beforeAll, test, expect } from "vitest"; // Import Vitest utilities

// Mock canvas and nomnoml dependencies
vi.mock('canvas', () => ({
  createCanvas: () => ({
    getContext: () => ({
      font: '',
      measureText: () => ({ width: 0 }),
      fillText: vi.fn(),
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    }),
  }),
}));

vi.mock('nomnoml', () => ({
  render: vi.fn().mockReturnValue('<svg>mocked</svg>'),
}));

// Mock happy-dom window
const setupHappyDom = () => {
  const { Window } = require('happy-dom');
  const window = new Window({
    url: "https://localhost:8080",
    width: 1024,
    height: 768,
  });
  
  global.window = window;
  global.document = window.document;
  
  // Mock any missing browser APIs
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

beforeAll(() => {
  setupHappyDom();
});

test("renders about page text", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Hello, this is JDL-Studio/i);
  expect(linkElement).toBeDefined();
});

test("renders default snapshot", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
