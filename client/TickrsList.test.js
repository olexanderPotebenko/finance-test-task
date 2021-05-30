
let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('TickersList', () => {
  test('The TickersList should be rendered without errors', () => {
    act(() => {
      render(<TickersList />, container);
    });
  });
});
